import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GameState } from '@/components/types/gameState';

interface HUDProps {
  gameState: GameState;
}

const HUD: React.FC<HUDProps> = ({ gameState }) => {
  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Score:</Text>
        <Text style={styles.scoreValue}>{gameState.score}</Text>
      </View>

      <View style={styles.ridesContainer}>
        <Text style={styles.ridesLabel}>Rides:</Text>
        <Text style={styles.ridesValue}>{gameState.completedRides}</Text>
      </View>

      <View style={styles.statusContainer}>
        {gameState.hasCustomer ? (
          <View style={styles.statusBox}>
            <Text style={styles.statusText}>📍 Customer in Taxi</Text>
            <Text style={styles.destinationText}>
              Destination: {gameState.customerDropoffLocation?.name}
            </Text>
            <Text style={styles.instructionText}>
              Stop completely in green zone
            </Text>
          </View>
        ) : gameState.customerPickupLocation ? (
          <View style={styles.statusBox}>
            <Text style={styles.statusText}>🙋 Customer Waiting</Text>
            <Text style={styles.destinationText}>
              Location: {gameState.customerPickupLocation?.name}
            </Text>
            <Text style={styles.instructionText}>
              Drive to customer to pick up
            </Text>
          </View>
        ) : (
          <View style={styles.statusBox}>
            <Text style={styles.statusText}>⏳ Looking for customer...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 100,
  },
  scoreContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  scoreLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  scoreValue: {
    color: '#4caf50',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ridesContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ridesLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  ridesValue: {
    color: '#2196f3',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 12,
    borderRadius: 8,
  },
  statusBox: {
    alignItems: 'center',
  },
  statusText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  destinationText: {
    color: '#ffeb3b',
    fontSize: 14,
    marginBottom: 3,
  },
  instructionText: {
    color: '#aaa',
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default HUD;
