import { Body } from 'matter-js';
import React from 'react';
import { View } from 'react-native';

interface TaxiProps {
  body: Body;
}

const Taxi: React.FC<TaxiProps> = ({ body }) => {
  const width = 50;
  const height = 30;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        backgroundColor: 'yellow',
        transform: [{ rotate: `${body.angle}rad` }],
      }}
    />
  );
};

export default Taxi;
