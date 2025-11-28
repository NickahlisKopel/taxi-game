import Matter from 'matter-js';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

import Taxi from '@/components/entities/Taxi';
import CityMap from '@/components/entities/CityMap';
import Customer from '@/components/entities/Customer';
import DropoffZone from '@/components/entities/DropoffZone';
import Joystick from '@/components/JoyStick';
import HUD from '@/components/HUD';
import { InputState } from '@/components/types/input';
import Physics from '@/components/types/physics';
import CustomerSystem from '@/components/types/customerSystem';
import { initialGameState } from '@/components/types/gameState';

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

  useEffect(() => {
    Matter.World.add(world, [taxiRef.current]);

    const interval = setInterval(() => {
      const { x, y } = taxiRef.current.position;
      setCameraOffset({
        x: x - screenWidth / 2,
        y: y - screenHeight / 2,
      });

      // Update game state display
      setGameState({ ...gameStateRef.current });
    }, 16);

    return () => clearInterval(interval);
  }, []);

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
});
