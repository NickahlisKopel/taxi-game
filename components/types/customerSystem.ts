import Matter from 'matter-js';
import { System } from '@/components/types/system';
import {
  getRandomDestination,
  getRandomDestinationExcluding,
  isInPickupZone,
  getDistance,
} from '@/components/types/destination';
import {
  GameState,
  PAYMENT_RATES,
  CONSUMPTION_RATES,
  SPEED_LIMITS,
  SPEEDING_PENALTIES,
} from '@/components/types/gameState';

const PICKUP_DISTANCE = 50; // Distance to trigger pickup
const STOP_VELOCITY_THRESHOLD = 0.5; // Max velocity to be considered "stopped"

interface CustomerSystemEntities {
  physics: { engine: Matter.Engine };
  taxi: { body: Matter.Body };
  gameState: GameState;
}

let lastPosition = { x: 0, y: 0 };

const CustomerSystem = (): System => {
  return (entities: any, { time }: any) => {
    const { taxi, gameState } = entities as CustomerSystemEntities;
    const taxiBody = taxi.body;
    const state = gameState;

    // Calculate distance traveled this frame for resource consumption
    const currentPosition = { x: taxiBody.position.x, y: taxiBody.position.y };
    const distanceTraveled = getDistance(lastPosition, currentPosition);
    lastPosition = currentPosition;

    // Calculate current speed (velocity magnitude)
    const velocityMagnitude = Math.sqrt(
      taxiBody.velocity.x ** 2 + taxiBody.velocity.y ** 2
    );
    state.currentSpeed = velocityMagnitude * 60; // Convert to units per second

    // Determine speed limit based on location
    // Check if near residential areas (houses)
    const nearResidential = currentPosition.y < 250 || currentPosition.y > 850;
    if (nearResidential) {
      state.speedLimit = SPEED_LIMITS.RESIDENTIAL;
    } else if (currentPosition.x > 900 || currentPosition.x < 300) {
      state.speedLimit = SPEED_LIMITS.COMMERCIAL;
    } else {
      state.speedLimit = SPEED_LIMITS.MAIN_ROAD;
    }

    // Check if speeding
    const speedOverLimit = state.currentSpeed - state.speedLimit;
    state.isSpeeding = speedOverLimit > SPEEDING_PENALTIES.TICKET_THRESHOLD;

    // Apply speeding penalties
    if (state.isSpeeding) {
      // Chance of getting a ticket
      if (Math.random() < SPEEDING_PENALTIES.TICKET_CHANCE) {
        state.money -= SPEEDING_PENALTIES.TICKET_COST;
        state.totalSpent += SPEEDING_PENALTIES.TICKET_COST;
        state.totalTickets++;
        console.log(`⚠️ SPEEDING TICKET! -$${SPEEDING_PENALTIES.TICKET_COST}. Total tickets: ${state.totalTickets}`);
      }
    }

    // Consume fuel and wear down car when moving
    if (distanceTraveled > 0.1) {
      // Only consume when actually moving
      state.fuel -= distanceTraveled * CONSUMPTION_RATES.FUEL_PER_DISTANCE;

      // Extra wear when speeding
      const wearRate = state.isSpeeding
        ? CONSUMPTION_RATES.WEAR_PER_DISTANCE + SPEEDING_PENALTIES.EXTRA_WEAR_RATE
        : CONSUMPTION_RATES.WEAR_PER_DISTANCE;
      state.carCondition -= distanceTraveled * wearRate;

      // Clamp values
      state.fuel = Math.max(0, state.fuel);
      state.carCondition = Math.max(0, state.carCondition);
    }

    // Check if out of fuel - can't operate
    if (state.fuel <= 0) {
      // Stop the car
      Matter.Body.setVelocity(taxiBody, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(taxiBody, 0);
      return entities; // Can't do anything without fuel
    }

    // Initialize customer if none exists
    if (!state.customerPickupLocation && !state.hasCustomer) {
      const pickupLocation = getRandomDestination();
      const dropoffLocation = getRandomDestinationExcluding(pickupLocation.id);

      state.customerPickupLocation = pickupLocation;
      state.customerDropoffLocation = dropoffLocation;
    }

    // Check for customer pickup
    if (
      !state.hasCustomer &&
      state.customerPickupLocation
    ) {
      const distance = getDistance(
        taxiBody.position,
        state.customerPickupLocation.position
      );

      if (distance < PICKUP_DISTANCE) {
        // Pickup customer
        state.hasCustomer = true;
        console.log('Customer picked up! Taking them to:', state.customerDropoffLocation?.name);
      }
    }

    // Check for customer dropoff
    if (
      state.hasCustomer &&
      state.customerDropoffLocation
    ) {
      // Check if taxi is in dropoff zone
      const inDropoffZone = isInPickupZone(
        taxiBody.position,
        state.customerDropoffLocation
      );

      if (inDropoffZone) {
        // Check if taxi has stopped completely
        const velocity = Math.sqrt(
          taxiBody.velocity.x ** 2 + taxiBody.velocity.y ** 2
        );

        if (velocity < STOP_VELOCITY_THRESHOLD) {
          // Calculate payment based on career status
          const payment = PAYMENT_RATES[state.careerStatus];

          // Successfully dropped off customer
          state.hasCustomer = false;
          state.completedRides++;
          state.money += payment;
          state.totalEarnings += payment;
          state.score += payment; // Keep for compatibility

          console.log(
            `Customer dropped off! Earned $${payment} as ${state.careerStatus}. Total: $${state.money}`
          );

          // Check for career progression milestones
          if (!state.ownsVehicle && state.money >= 5000) {
            console.log('💡 You can now buy your own car! Visit the garage.');
          } else if (state.ownsVehicle && state.careerStatus === 'freelancer' && state.money >= 15000) {
            console.log('💡 You can now start your own taxi company! Visit the garage.');
          }

          // Spawn new customer after a brief delay
          setTimeout(() => {
            const pickupLocation = getRandomDestination();
            const dropoffLocation = getRandomDestinationExcluding(
              pickupLocation.id
            );
            state.customerPickupLocation = pickupLocation;
            state.customerDropoffLocation = dropoffLocation;
            console.log('New customer waiting at:', pickupLocation.name);
          }, 1000);

          // Clear current destinations during delay
          state.customerPickupLocation = null;
          state.customerDropoffLocation = null;
        }
      }
    }

    return entities;
  };
};

export default CustomerSystem;
