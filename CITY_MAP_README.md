# City Map & Destination System

## Overview

This taxi game now features a city-wide map with stores, houses, and roads, along with a complete customer pickup and dropoff system.

## Features

### 1. City Map (`components/entities/CityMap.tsx`)

The city map includes:
- **Roads**: Horizontal and vertical roads forming a grid
- **Stores** (red buildings): Customer pickup/dropoff locations
- **Houses** (blue buildings): Residential customer locations
- **Apartments** (purple buildings): Multi-unit residential locations
- **Background**: Grass areas

#### Sprite System

The current implementation uses colored rectangles as "sprites" that can easily be replaced with actual sprite images:

```typescript
const SPRITES = {
  road: '#555',
  sidewalk: '#888',
  grass: '#4a7c59',
  store: '#e74c3c',
  house: '#3498db',
  apartment: '#9b59b6',
};
```

**To add actual sprite images:**
1. Place sprite images in `/assets/images/`
2. Import them in `CityMap.tsx`
3. Replace the `backgroundColor` style with `<Image source={require('...')} />`

### 2. Destination Management System (`components/types/destination.ts`)

Reusable functions for managing destinations:

- `getRandomDestination()`: Get a random destination
- `getRandomDestinationExcluding(id)`: Get a random destination excluding a specific one
- `isInPickupZone(position, destination)`: Check if position is in pickup zone
- `getDestinationById(id)`: Find destination by ID
- `getDistance(pos1, pos2)`: Calculate distance between two points

**Destination Structure:**
```typescript
interface Destination {
  id: string;
  type: 'store' | 'house' | 'apartment';
  position: { x: number; y: number };
  name: string;
  pickupZone: { x: number; y: number; width: number; height: number };
}
```

### 3. Customer Pickup System

#### Customer Entity (`components/entities/Customer.tsx`)

- Visual representation with hand raised (🙋) when waiting
- Yellow circular indicator shows customer is waiting
- Positioned at destination location

#### Dropoff Zone (`components/entities/DropoffZone.tsx`)

- Green dashed rectangle appears when customer is in taxi
- Shows "STOP HERE" label
- Indicates where taxi must stop to complete dropoff

### 4. Game Flow

#### Step 1: Customer Waiting
1. Customer spawns at random destination with hand raised
2. HUD shows customer location and "Drive to customer to pick up" instruction

#### Step 2: Pickup
1. Drive taxi to customer location (within 50 units)
2. Customer automatically enters taxi when taxi gets close
3. Customer visual disappears
4. HUD updates to show destination

#### Step 3: Transport
1. Drive customer to dropoff destination
2. Green dropoff zone appears at destination
3. HUD shows "Stop completely in green zone" instruction

#### Step 4: Dropoff
1. Drive into green dropoff zone
2. **Stop completely** (velocity < 0.5)
3. Customer exits, score increases by 100
4. New customer spawns after 1 second

### 5. HUD System (`components/HUD.tsx`)

Displays:
- **Score**: Points earned from completed rides
- **Rides**: Number of completed customer dropoffs
- **Status**: Current objective (waiting for customer, customer in taxi, looking for customer)
- **Destination**: Name of current pickup/dropoff location
- **Instructions**: What to do next

## Game State

The game state tracks:
```typescript
interface GameState {
  hasCustomer: boolean;              // Is customer in taxi?
  customerPickupLocation: Destination | null;   // Where to pick up
  customerDropoffLocation: Destination | null;  // Where to drop off
  score: number;                     // Current score
  completedRides: number;            // Total rides completed
}
```

## Systems

### Physics System (`components/types/physics.ts`)
Handles taxi movement and controls

### Customer System (`components/types/customerSystem.ts`)
Handles:
- Customer spawning
- Pickup detection (within 50 units of customer)
- Dropoff detection (in green zone + stopped)
- Score updates
- New customer generation

## How to Extend

### Add New Destinations

Edit `components/types/destination.ts`:

```typescript
{
  id: 'store-4',
  type: 'store',
  position: { x: 400, y: 400 },
  name: 'New Store',
  pickupZone: { x: 400, y: 470, width: 80, height: 80 },
}
```

### Change Pickup/Dropoff Rules

Edit `components/types/customerSystem.ts`:
- `PICKUP_DISTANCE`: Distance to trigger pickup (default: 50)
- `STOP_VELOCITY_THRESHOLD`: Max velocity to be "stopped" (default: 0.5)

### Customize Sprites

Replace colored rectangles in `CityMap.tsx` with actual images or more complex components.

## Testing

Run the game with:
```bash
npm start
```

Then:
1. Drive to customer with hand raised
2. Pick up customer (automatic when close)
3. Drive to green dropoff zone
4. Stop completely in the zone
5. Customer exits, score increases
6. New customer appears

Enjoy your taxi game!
