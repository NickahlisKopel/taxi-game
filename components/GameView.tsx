import Matter from 'matter-js';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

import Taxi from '@/components/entities/Taxi';
import Joystick from '@/components/JoyStick';
import { InputState } from '@/components/types/input';
import Physics from '@/components/types/physics';

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
  const wallThickness = 50;

const walls = {
  top: Matter.Bodies.rectangle(screenWidth / 2, -wallThickness / 2, screenWidth, wallThickness, { isStatic: true }),
  bottom: Matter.Bodies.rectangle(screenWidth / 2, screenHeight + wallThickness / 2, screenWidth, wallThickness, { isStatic: true }),
  left: Matter.Bodies.rectangle(-wallThickness / 2, screenHeight / 2, wallThickness, screenHeight, { isStatic: true }),
  right: Matter.Bodies.rectangle(screenWidth + wallThickness / 2, screenHeight / 2, wallThickness, screenHeight, { isStatic: true }),
};


  const [cameraOffset, setCameraOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    Matter.World.add(world, [taxiRef.current]);
    Matter.World.add(world, Object.values(walls));


    const interval = setInterval(() => {
      const { x, y } = taxiRef.current.position;
      setCameraOffset({
        x: x - screenWidth / 2,
        y: y - screenHeight / 2,
      });
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <GameEngine
        systems={[Physics(input)]}
        entities={{
          physics: { engine, world },
          taxi: {
            body: taxiRef.current,
            cameraOffset,
            renderer: (props: any) => <Taxi {...props} cameraOffset={cameraOffset} />,
          },
        }}
      />
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
