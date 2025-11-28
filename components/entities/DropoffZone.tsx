import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Destination } from '@/components/types/destination';

interface DropoffZoneProps {
  destination: Destination;
  cameraOffset: { x: number; y: number };
  isActive: boolean; // Only show when customer is in taxi
}

const DropoffZone: React.FC<DropoffZoneProps> = ({
  destination,
  cameraOffset,
  isActive,
}) => {
  if (!isActive) return null;

  const { pickupZone } = destination;
  const x = pickupZone.x - cameraOffset.x;
  const y = pickupZone.y - cameraOffset.y;

  return (
    <View
      style={[
        styles.container,
        {
          left: x,
          top: y,
          width: pickupZone.width,
          height: pickupZone.height,
        },
      ]}
    >
      <View style={styles.innerZone}>
        <Text style={styles.label}>STOP HERE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(76, 175, 80, 0.4)',
    borderWidth: 3,
    borderColor: '#4caf50',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerZone: {
    padding: 5,
  },
  label: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DropoffZone;
