import Matter from 'matter-js';
import { System } from '@/components/types/system';
import {
  getRandomDestination,
  getRandomDestinationExcluding,
  isInPickupZone,
  getDistance,
} from '@/components/types/destination';
import { GameState } from '@/components/types/gameState';

const PICKUP_DISTANCE = 50; // Distance to trigger pickup
const STOP_VELOCITY_THRESHOLD = 0.5; // Max velocity to be considered "stopped"

interface CustomerSystemEntities {
  physics: { engine: Matter.Engine };
  taxi: { body: Matter.Body };
  gameState: GameState;
}

const CustomerSystem = (): System => {
  return (entities: any, { events }: any) => {
    const { taxi, gameState } = entities as CustomerSystemEntities;
    const taxiBody = taxi.body;
    const state = gameState;

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
          // Successfully dropped off customer
          state.hasCustomer = false;
          state.completedRides++;
          state.score += 100;

          console.log('Customer dropped off! Rides completed:', state.completedRides);

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
