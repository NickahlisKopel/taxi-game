import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GameState } from '@/components/types/gameState';

interface HUDProps {
  gameState: GameState;
}

const HUD: React.FC<HUDProps> = ({ gameState }) => {
  const getFuelColor = () => {
    if (gameState.fuel > 50) return '#4caf50';
    if (gameState.fuel > 20) return '#ff9800';
    return '#f44336';
  };

  const getConditionColor = () => {
    if (gameState.carCondition > 70) return '#4caf50';
    if (gameState.carCondition > 40) return '#ff9800';
    return '#f44336';
  };

  const getCareerLabel = () => {
    if (gameState.careerStatus === 'employee') return 'Employee Driver';
    if (gameState.careerStatus === 'freelancer') return 'Freelance Driver';
    return 'Company Owner';
  };

  return (
    <View style={styles.container}>
      {/* Top Row - Resources */}
      <View style={styles.resourceRow}>
        <View style={styles.resourceBox}>
          <Text style={styles.resourceLabel}>💰 Money</Text>
          <Text style={styles.moneyValue}>${gameState.money}</Text>
        </View>

        <View style={styles.resourceBox}>
          <Text style={styles.resourceLabel}>⛽ Fuel</Text>
          <View style={styles.barContainer}>
            <View
              style={[
                styles.barFill,
                { width: `${gameState.fuel}%`, backgroundColor: getFuelColor() },
              ]}
            />
          </View>
          <Text style={styles.barText}>{Math.round(gameState.fuel)}%</Text>
        </View>

        <View style={styles.resourceBox}>
          <Text style={styles.resourceLabel}>🔧 Condition</Text>
          <View style={styles.barContainer}>
            <View
              style={[
                styles.barFill,
                { width: `${gameState.carCondition}%`, backgroundColor: getConditionColor() },
              ]}
            />
          </View>
          <Text style={styles.barText}>{Math.round(gameState.carCondition)}%</Text>
        </View>
      </View>

      {/* Speedometer */}
      <View style={[
        styles.speedometerContainer,
        gameState.isSpeeding && styles.speedometerSpeeding
      ]}>
        <Text style={styles.speedLabel}>
          {gameState.isSpeeding ? '⚠️ ' : ''}SPEED
        </Text>
        <Text style={[
          styles.speedValue,
          gameState.isSpeeding && styles.speedValueSpeeding
        ]}>
          {Math.round(gameState.currentSpeed)}
        </Text>
        <Text style={styles.speedLimit}>
          Limit: {gameState.speedLimit}
        </Text>
      </View>

      {/* Career Status */}
      <View style={styles.careerContainer}>
        <Text style={styles.careerText}>{getCareerLabel()}</Text>
        <Text style={styles.ridesText}>Rides: {gameState.completedRides}</Text>
      </View>

      {/* Current Objective */}
      <View style={styles.statusContainer}>
        {gameState.fuel <= 0 ? (
          <View style={[styles.statusBox, styles.warningBox]}>
            <Text style={styles.warningText}>⚠️ OUT OF FUEL</Text>
            <Text style={styles.instructionText}>Visit the garage to refuel!</Text>
          </View>
        ) : gameState.hasCustomer ? (
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
    top: 10,
    left: 10,
    right: 10,
    zIndex: 100,
  },
  resourceRow: {
    flexDirection: 'row',
    marginBottom: 5,
    gap: 5,
  },
  resourceBox: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: 8,
    borderRadius: 6,
  },
  resourceLabel: {
    color: '#fff',
    fontSize: 11,
    marginBottom: 4,
  },
  moneyValue: {
    color: '#4caf50',
    fontSize: 18,
    fontWeight: 'bold',
  },
  barContainer: {
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 2,
  },
  barFill: {
    height: '100%',
    borderRadius: 8,
  },
  barText: {
    color: '#fff',
    fontSize: 11,
    textAlign: 'center',
  },
  careerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: 8,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  careerText: {
    color: '#2196f3',
    fontSize: 14,
    fontWeight: 'bold',
  },
  ridesText: {
    color: '#fff',
    fontSize: 14,
  },
  speedometerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  speedometerSpeeding: {
    backgroundColor: 'rgba(244, 67, 54, 0.3)',
    borderColor: '#f44336',
  },
  speedLabel: {
    color: '#fff',
    fontSize: 10,
    marginBottom: 2,
  },
  speedValue: {
    color: '#4caf50',
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  speedValueSpeeding: {
    color: '#f44336',
  },
  speedLimit: {
    color: '#aaa',
    fontSize: 10,
    marginTop: 2,
  },
  statusContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 6,
  },
  statusBox: {
    alignItems: 'center',
  },
  warningBox: {
    backgroundColor: 'rgba(244, 67, 54, 0.3)',
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  warningText: {
    color: '#f44336',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  destinationText: {
    color: '#ffeb3b',
    fontSize: 13,
    marginBottom: 2,
  },
  instructionText: {
    color: '#aaa',
    fontSize: 11,
    fontStyle: 'italic',
  },
});

export default HUD;
