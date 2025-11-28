export interface Destination {
  id: string;
  type: 'store' | 'house' | 'apartment';
  position: { x: number; y: number };
  name: string;
  pickupZone: { x: number; y: number; width: number; height: number };
}

// City destinations - stores and houses where customers can be
// Updated positions to match modern city layout
export const DESTINATIONS: Destination[] = [
  // Stores
  {
    id: 'store-1',
    type: 'store',
    position: { x: 445, y: 95 },
    name: 'Main Street Market',
    pickupZone: { x: 400, y: 140, width: 90, height: 90 },
  },
  {
    id: 'store-2',
    type: 'store',
    position: { x: 95, y: 395 },
    name: 'West Side Store',
    pickupZone: { x: 50, y: 440, width: 90, height: 90 },
  },
  {
    id: 'store-3',
    type: 'store',
    position: { x: 445, y: 715 },
    name: 'Downtown Shop',
    pickupZone: { x: 400, y: 760, width: 90, height: 90 },
  },

  // Houses
  {
    id: 'house-1',
    type: 'house',
    position: { x: 95, y: 95 },
    name: 'Pine Street Home',
    pickupZone: { x: 50, y: 140, width: 90, height: 90 },
  },
  {
    id: 'house-2',
    type: 'house',
    position: { x: 205, y: 95 },
    name: 'Oak Avenue House',
    pickupZone: { x: 160, y: 140, width: 90, height: 90 },
  },
  {
    id: 'house-3',
    type: 'house',
    position: { x: 1045, y: 95 },
    name: 'Elm Street Residence',
    pickupZone: { x: 1000, y: 140, width: 90, height: 90 },
  },
  {
    id: 'house-4',
    type: 'house',
    position: { x: 765, y: 395 },
    name: 'Maple Drive Home',
    pickupZone: { x: 720, y: 440, width: 90, height: 90 },
  },
  {
    id: 'house-5',
    type: 'house',
    position: { x: 875, y: 395 },
    name: 'Cedar Lane House',
    pickupZone: { x: 830, y: 440, width: 90, height: 90 },
  },
  {
    id: 'house-6',
    type: 'house',
    position: { x: 765, y: 715 },
    name: 'Birch Court Home',
    pickupZone: { x: 720, y: 760, width: 90, height: 90 },
  },

  // Apartments
  {
    id: 'apartment-1',
    type: 'apartment',
    position: { x: 755, y: 105 },
    name: 'Sunset Apartments',
    pickupZone: { x: 700, y: 180, width: 110, height: 90 },
  },
  {
    id: 'apartment-2',
    type: 'apartment',
    position: { x: 105, y: 725 },
    name: 'River View Complex',
    pickupZone: { x: 50, y: 800, width: 110, height: 90 },
  },

  // Office
  {
    id: 'office-1',
    type: 'apartment',
    position: { x: 475, y: 405 },
    name: 'City Center Office',
    pickupZone: { x: 420, y: 480, width: 110, height: 90 },
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
