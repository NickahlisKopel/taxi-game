import Matter from 'matter-js';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

import { InputState } from '@/app/types/input';
import Physics from '@/app/types/physics';
import Joystick from '@/components/JoyStick';
import Taxi from '@/components/entities/Taxi';

export default function App() {
  const engine = useRef(Matter.Engine.create({ enableSleeping: false })).current;
  const world = engine.world;

  const taxi = Matter.Bodies.rectangle(200, 200, 50, 30, {
    frictionAir: 0.2,
    label: 'taxi',
  });

  Matter.World.add(world, [taxi]);

  const [input, setInput] = useState<InputState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  return (
    <View style={styles.container}>
      <GameEngine
        systems={[Physics(input)]}
        entities={{
          physics: { engine, world },
          taxi: { body: taxi, renderer: Taxi },
        }}
      />
      <Joystick onInput={setInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
});
