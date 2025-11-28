export interface Destination {
  id: string;
  type: 'store' | 'house' | 'apartment';
  position: { x: number; y: number };
  name: string;
  pickupZone: { x: number; y: number; width: number; height: number };
}

// City destinations - stores and houses where customers can be
export const DESTINATIONS: Destination[] = [
  // Stores
  {
    id: 'store-1',
    type: 'store',
    position: { x: 90, y: 80 },
    name: 'Corner Store',
    pickupZone: { x: 90, y: 150, width: 80, height: 80 },
  },
  {
    id: 'store-2',
    type: 'store',
    position: { x: 340, y: 280 },
    name: 'Main Street Market',
    pickupZone: { x: 340, y: 350, width: 80, height: 80 },
  },
  {
    id: 'store-3',
    type: 'store',
    position: { x: 640, y: 580 },
    name: 'Downtown Shop',
    pickupZone: { x: 640, y: 650, width: 80, height: 80 },
  },
  // Houses
  {
    id: 'house-1',
    type: 'house',
    position: { x: 340, y: 80 },
    name: 'Suburban Home',
    pickupZone: { x: 340, y: 150, width: 80, height: 80 },
  },
  {
    id: 'house-2',
    type: 'house',
    position: { x: 640, y: 80 },
    name: 'Oak Street House',
    pickupZone: { x: 640, y: 150, width: 80, height: 80 },
  },
  {
    id: 'house-3',
    type: 'house',
    position: { x: 890, y: 280 },
    name: 'East Side House',
    pickupZone: { x: 890, y: 350, width: 80, height: 80 },
  },
  {
    id: 'house-4',
    type: 'house',
    position: { x: 90, y: 580 },
    name: 'West End Residence',
    pickupZone: { x: 90, y: 650, width: 80, height: 80 },
  },
  {
    id: 'house-5',
    type: 'house',
    position: { x: 340, y: 580 },
    name: 'Maple Street Home',
    pickupZone: { x: 340, y: 650, width: 80, height: 80 },
  },
  // Apartments
  {
    id: 'apartment-1',
    type: 'apartment',
    position: { x: 100, y: 310 },
    name: 'City Apartments',
    pickupZone: { x: 100, y: 350, width: 100, height: 80 },
  },
  {
    id: 'apartment-2',
    type: 'apartment',
    position: { x: 900, y: 610 },
    name: 'Downtown Complex',
    pickupZone: { x: 900, y: 650, width: 100, height: 80 },
  },
];

/**
 * Get a random destination from the available destinations
 */
export const getRandomDestination = (): Destination => {
  const randomIndex = Math.floor(Math.random() * DESTINATIONS.length);
  return DESTINATIONS[randomIndex];
};

/**
 * Get a random destination different from the provided one
 */
export const getRandomDestinationExcluding = (
  excludeId: string
): Destination => {
  const availableDestinations: Destination[] = [];
  for (let i = 0; i < DESTINATIONS.length; i++) {
    if (DESTINATIONS[i].id !== excludeId) {
      availableDestinations.push(DESTINATIONS[i]);
    }
  }
  const randomIndex = Math.floor(Math.random() * availableDestinations.length);
  return availableDestinations[randomIndex];
};

/**
 * Check if a position is within a destination's pickup zone
 */
export const isInPickupZone = (
  position: { x: number; y: number },
  destination: Destination
): boolean => {
  const { pickupZone } = destination;
  return (
    position.x >= pickupZone.x &&
    position.x <= pickupZone.x + pickupZone.width &&
    position.y >= pickupZone.y &&
    position.y <= pickupZone.y + pickupZone.height
  );
};

/**
 * Get destination by ID
 */
export const getDestinationById = (id: string): Destination | undefined => {
  for (let i = 0; i < DESTINATIONS.length; i++) {
    if (DESTINATIONS[i].id === id) {
      return DESTINATIONS[i];
    }
  }
  return undefined;
};

/**
 * Calculate distance between two points
 */
export const getDistance = (
  pos1: { x: number; y: number },
  pos2: { x: number; y: number }
): number => {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  return Math.sqrt(dx * dx + dy * dy);
};
