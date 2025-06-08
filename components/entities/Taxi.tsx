import { Body } from 'matter-js';
import React from 'react';
import { View } from 'react-native';

interface TaxiProps {
  body: Body;
  cameraOffset: { x: number; y: number };
}

const Taxi: React.FC<TaxiProps> = ({ body, cameraOffset }) => {
  const width = 50;
  const height = 30;
  const x = body.position.x - width / 2 - cameraOffset.x;
  const y = body.position.y - height / 2 - cameraOffset.y;

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        backgroundColor: 'yellow',
        borderWidth: 2,
        borderColor: 'red',
        transform: [{ rotate: `${body.angle}rad` }],
      }}
    />
  );
};

export default Taxi;
