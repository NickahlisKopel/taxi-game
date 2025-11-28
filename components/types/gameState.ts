import { Destination } from './destination';

export interface GameState {
  hasCustomer: boolean;
  customerPickupLocation: Destination | null;
  customerDropoffLocation: Destination | null;
  score: number;
  completedRides: number;
}

export const initialGameState: GameState = {
  hasCustomer: false,
  customerPickupLocation: null,
  customerDropoffLocation: null,
  score: 0,
  completedRides: 0,
};
