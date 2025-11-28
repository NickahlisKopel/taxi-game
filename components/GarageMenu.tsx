import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GameState, PROGRESSION_COSTS } from '@/components/types/gameState';

interface GarageMenuProps {
  gameState: GameState;
  onRefuel: (amount: number) => void;
  onRepair: (amount: number) => void;
  onBuyCar: () => void;
  onStartCompany: () => void;
  onClose: () => void;
}

const GarageMenu: React.FC<GarageMenuProps> = ({
  gameState,
  onRefuel,
  onRepair,
  onBuyCar,
  onStartCompany,
  onClose,
}) => {
  const fuelNeeded = 100 - gameState.fuel;
  const repairNeeded = 100 - gameState.carCondition;

  const fullTankCost = Math.ceil(fuelNeeded * PROGRESSION_COSTS.FUEL_PER_LITER);
  const fullRepairCost = Math.ceil(repairNeeded * PROGRESSION_COSTS.REPAIR_PER_PERCENT);

  const canAffordFuel = gameState.money >= fullTankCost;
  const canAffordRepair = gameState.money >= fullRepairCost;
  const canBuyCar = gameState.money >= PROGRESSION_COSTS.BUY_CAR && !gameState.ownsVehicle;
  const canStartCompany = gameState.money >= PROGRESSION_COSTS.START_COMPANY && gameState.ownsVehicle && gameState.careerStatus === 'freelancer';

  return (
    <View style={styles.overlay}>
      <View style={styles.menu}>
        <Text style={styles.title}>Joe's Garage</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>

          {/* Refuel */}
          <TouchableOpacity
            style={[
              styles.button,
              !canAffordFuel && styles.buttonDisabled,
              fuelNeeded < 1 && styles.buttonDisabled,
            ]}
            onPress={() => onRefuel(100)}
            disabled={!canAffordFuel || fuelNeeded < 1}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>
                Refuel Tank ({Math.round(gameState.fuel)}% → 100%)
              </Text>
              <Text style={styles.buttonPrice}>${fullTankCost}</Text>
            </View>
          </TouchableOpacity>

          {/* Repair */}
          <TouchableOpacity
            style={[
              styles.button,
              !canAffordRepair && styles.buttonDisabled,
              repairNeeded < 1 && styles.buttonDisabled,
            ]}
            onPress={() => onRepair(100)}
            disabled={!canAffordRepair || repairNeeded < 1}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>
                Repair Car ({Math.round(gameState.carCondition)}% → 100%)
              </Text>
              <Text style={styles.buttonPrice}>${fullRepairCost}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Career Progression */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Career Advancement</Text>

          {!gameState.ownsVehicle ? (
            <TouchableOpacity
              style={[styles.buttonCareer, !canBuyCar && styles.buttonDisabled]}
              onPress={onBuyCar}
              disabled={!canBuyCar}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.buttonTextCareer}>Buy Your Own Car</Text>
                <Text style={styles.buttonSubtext}>
                  Become a freelance driver and keep more money!
                </Text>
                <Text style={styles.buttonPrice}>${PROGRESSION_COSTS.BUY_CAR}</Text>
              </View>
            </TouchableOpacity>
          ) : gameState.careerStatus === 'freelancer' ? (
            <TouchableOpacity
              style={[styles.buttonCareer, !canStartCompany && styles.buttonDisabled]}
              onPress={onStartCompany}
              disabled={!canStartCompany}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.buttonTextCareer}>Start Taxi Company</Text>
                <Text style={styles.buttonSubtext}>
                  Be your own boss and charge premium rates!
                </Text>
                <Text style={styles.buttonPrice}>${PROGRESSION_COSTS.START_COMPANY}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.maxLevel}>
              <Text style={styles.maxLevelText}>You're the boss!</Text>
              <Text style={styles.maxLevelSubtext}>Max career level achieved</Text>
            </View>
          )}
        </View>

        {/* Current Status */}
        <View style={styles.statusBox}>
          <Text style={styles.statusText}>
            Status: {gameState.careerStatus === 'employee' ? 'Employee Driver' : gameState.careerStatus === 'freelancer' ? 'Freelance Driver' : 'Company Owner'}
          </Text>
          <Text style={styles.statusText}>
            Money: ${gameState.money}
          </Text>
        </View>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 500,
    maxHeight: '90%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f9a825',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4caf50',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  buttonCareer: {
    backgroundColor: '#2196f3',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: 'column',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextCareer: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonSubtext: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 8,
  },
  buttonPrice: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  statusBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  statusText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  maxLevel: {
    backgroundColor: '#4caf50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  maxLevelText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  maxLevelSubtext: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
  closeButton: {
    backgroundColor: '#666',
    borderRadius: 8,
    padding: 12,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GarageMenu;
