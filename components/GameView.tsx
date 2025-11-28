import Matter from 'matter-js';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

import Taxi from '@/components/entities/Taxi';
import CityMap from '@/components/entities/CityMap';
import Customer from '@/components/entities/Customer';
import DropoffZone from '@/components/entities/DropoffZone';
import Joystick from '@/components/JoyStick';
import HUD from '@/components/HUD';
import GarageMenu from '@/components/GarageMenu';
import { InputState } from '@/components/types/input';
import Physics from '@/components/types/physics';
import CustomerSystem from '@/components/types/customerSystem';
import { initialGameState, PROGRESSION_COSTS } from '@/components/types/gameState';
import { getDestinationById, isInPickupZone } from '@/components/types/destination';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const GameView = () => {
  const engine = useRef(Matter.Engine.create({ enableSleeping: false })).current;
  const world = engine.world;

  const [input, setInput] = useState<InputState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const taxiRef = useRef(
    Matter.Bodies.rectangle(200, 200, 50, 30, {
      frictionAir: 0.01,
      label: 'taxi',
    })
  );

  const gameStateRef = useRef(initialGameState);
  const [gameState, setGameState] = useState(initialGameState);
  const [cameraOffset, setCameraOffset] = useState({ x: 0, y: 0 });
  const [isAtGarage, setIsAtGarage] = useState(false);
  const [showGarageMenu, setShowGarageMenu] = useState(false);

  useEffect(() => {
    Matter.World.add(world, [taxiRef.current]);

    const interval = setInterval(() => {
      const { x, y } = taxiRef.current.position;
      setCameraOffset({
        x: x - screenWidth / 2,
        y: y - screenHeight / 2,
      });

      // Check if at garage
      const garage = getDestinationById('garage-1');
      if (garage) {
        const atGarage = isInPickupZone(taxiRef.current.position, garage);
        setIsAtGarage(atGarage);
      }

      // Update game state display
      setGameState({ ...gameStateRef.current });
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // Garage handlers
  const handleRefuel = (amount: number) => {
    const needed = amount - gameStateRef.current.fuel;
    const cost = Math.ceil(needed * PROGRESSION_COSTS.FUEL_PER_LITER);

    if (gameStateRef.current.money >= cost) {
      gameStateRef.current.fuel = amount;
      gameStateRef.current.money -= cost;
      gameStateRef.current.totalSpent += cost;
      console.log(`Refueled! Cost: $${cost}`);
    }
  };

  const handleRepair = (amount: number) => {
    const needed = amount - gameStateRef.current.carCondition;
    const cost = Math.ceil(needed * PROGRESSION_COSTS.REPAIR_PER_PERCENT);

    if (gameStateRef.current.money >= cost) {
      gameStateRef.current.carCondition = amount;
      gameStateRef.current.money -= cost;
      gameStateRef.current.totalSpent += cost;
      console.log(`Repaired! Cost: $${cost}`);
    }
  };

  const handleBuyCar = () => {
    if (gameStateRef.current.money >= PROGRESSION_COSTS.BUY_CAR) {
      gameStateRef.current.money -= PROGRESSION_COSTS.BUY_CAR;
      gameStateRef.current.totalSpent += PROGRESSION_COSTS.BUY_CAR;
      gameStateRef.current.ownsVehicle = true;
      gameStateRef.current.careerStatus = 'freelancer';
      console.log('Congratulations! You now own your own taxi!');
      setShowGarageMenu(false);
    }
  };

  const handleStartCompany = () => {
    if (gameStateRef.current.money >= PROGRESSION_COSTS.START_COMPANY) {
      gameStateRef.current.money -= PROGRESSION_COSTS.START_COMPANY;
      gameStateRef.current.totalSpent += PROGRESSION_COSTS.START_COMPANY;
      gameStateRef.current.careerStatus = 'owner';
      console.log('Congratulations! You now own a taxi company!');
      setShowGarageMenu(false);
    }
  };

  return (
    <View style={styles.container}>
      <GameEngine
        systems={[Physics(input), CustomerSystem()]}
        entities={{
          physics: { engine, world },
          taxi: {
            body: taxiRef.current,
            cameraOffset,
            renderer: (props: any) => <Taxi {...props} cameraOffset={cameraOffset} />,
          },
          gameState: gameStateRef.current,
          cityMap: {
            cameraOffset,
            renderer: () => <CityMap cameraOffset={cameraOffset} />,
          },
          customer: {
            cameraOffset,
            renderer: () =>
              gameState.customerPickupLocation ? (
                <Customer
                  destination={gameState.customerPickupLocation}
                  cameraOffset={cameraOffset}
                  isWaiting={!gameState.hasCustomer}
                />
              ) : null,
          },
          dropoffZone: {
            cameraOffset,
            renderer: () =>
              gameState.customerDropoffLocation ? (
                <DropoffZone
                  destination={gameState.customerDropoffLocation}
                  cameraOffset={cameraOffset}
                  isActive={gameState.hasCustomer}
                />
              ) : null,
          },
        }}
      />
      <HUD gameState={gameState} />

      {/* Garage prompt */}
      {isAtGarage && !showGarageMenu && (
        <TouchableOpacity
          style={styles.garagePrompt}
          onPress={() => setShowGarageMenu(true)}
        >
          <Text style={styles.garagePromptText}>Press to open garage menu</Text>
        </TouchableOpacity>
      )}

      {/* Garage menu */}
      {showGarageMenu && (
        <GarageMenu
          gameState={gameState}
          onRefuel={handleRefuel}
          onRepair={handleRepair}
          onBuyCar={handleBuyCar}
          onStartCompany={handleStartCompany}
          onClose={() => setShowGarageMenu(false)}
        />
      )}

      <Joystick onInput={setInput} />
    </View>
  );
};

export default GameView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  garagePrompt: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    backgroundColor: '#f9a825',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  garagePromptText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
