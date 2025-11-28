import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Destination } from '@/components/types/destination';

interface CustomerProps {
  destination: Destination;
  cameraOffset: { x: number; y: number };
  isWaiting: boolean; // true if waiting for pickup, false if in taxi
}

const Customer: React.FC<CustomerProps> = ({
  destination,
  cameraOffset,
  isWaiting,
}) => {
  if (!isWaiting) return null;

  const x = destination.position.x - cameraOffset.x;
  const y = destination.position.y - cameraOffset.y;

  return (
    <View
      style={[
        styles.container,
        {
          left: x,
          top: y,
        },
      ]}
    >
      {/* Hand up indicator */}
      <View style={styles.handContainer}>
        <Text style={styles.handEmoji}>🙋</Text>
      </View>

      {/* Customer body */}
      <View style={styles.customerBody} />

      {/* Waiting indicator circle */}
      <View style={styles.waitingIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
  },
  handContainer: {
    marginBottom: -10,
    zIndex: 10,
  },
  handEmoji: {
    fontSize: 30,
    textAlign: 'center',
  },
  customerBody: {
    width: 20,
    height: 30,
    backgroundColor: '#ff9800',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000',
  },
  waitingIndicator: {
    position: 'absolute',
    bottom: -5,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffeb3b',
    backgroundColor: 'transparent',
  },
});

export default Customer;
