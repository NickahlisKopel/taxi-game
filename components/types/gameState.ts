import { Destination } from './destination';

export type CareerStatus = 'employee' | 'freelancer' | 'owner';

export interface GameState {
  // Customer state
  hasCustomer: boolean;
  customerPickupLocation: Destination | null;
  customerDropoffLocation: Destination | null;

  // Progression & money
  money: number;
  completedRides: number;
  careerStatus: CareerStatus;
  ownsVehicle: boolean;

  // Resources
  fuel: number;              // 0-100%
  carCondition: number;      // 0-100%

  // Stats
  totalEarnings: number;
  totalSpent: number;

  // Deprecated (kept for compatibility)
  score: number;
}

export const initialGameState: GameState = {
  hasCustomer: false,
  customerPickupLocation: null,
  customerDropoffLocation: null,

  // Start as employee with no money
  money: 0,
  completedRides: 0,
  careerStatus: 'employee',
  ownsVehicle: false,

  // Resources start full
  fuel: 100,
  carCondition: 100,

  // Stats
  totalEarnings: 0,
  totalSpent: 0,

  score: 0,
};

// Progression costs and thresholds
export const PROGRESSION_COSTS = {
  // Career advancement
  BUY_CAR: 5000,              // Buy your own car to become freelancer
  START_COMPANY: 15000,       // Start your own taxi company

  // Resources
  FUEL_PER_LITER: 3,          // $3 per 1% fuel
  REPAIR_PER_PERCENT: 5,      // $5 per 1% condition
  FULL_TANK: 300,             // $300 for full tank (100%)
  FULL_REPAIR: 500,           // $500 for full repair (100%)
};

// Payment based on career status
export const PAYMENT_RATES = {
  employee: 50,               // $50 per ride (working for someone)
  freelancer: 150,            // $150 per ride (own car, keep most money)
  owner: 200,                 // $200 per ride (company owner, premium rates)
};

// Resource consumption rates
export const CONSUMPTION_RATES = {
  FUEL_PER_DISTANCE: 0.01,    // 1% fuel per 100 units traveled
  WEAR_PER_DISTANCE: 0.005,   // 0.5% wear per 100 units traveled
  WEAR_PER_COLLISION: 5,      // 5% damage per collision
};
