import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CityMapProps {
  cameraOffset: { x: number; y: number };
}

// Simple sprite colors - can be replaced with actual images later
const SPRITES = {
  road: '#555',
  sidewalk: '#888',
  grass: '#4a7c59',
  store: '#e74c3c',
  house: '#3498db',
  apartment: '#9b59b6',
};

const CityMap: React.FC<CityMapProps> = ({ cameraOffset }) => {
  return (
    <View style={styles.container}>
      {/* Background - grass */}
      <View
        style={[
          styles.background,
          {
            left: -cameraOffset.x,
            top: -cameraOffset.y,
            backgroundColor: SPRITES.grass,
          },
        ]}
      />

      {/* Horizontal Road 1 */}
      <View
        style={[
          styles.roadHorizontal,
          {
            left: -cameraOffset.x,
            top: 150 - cameraOffset.y,
          },
        ]}
      />

      {/* Horizontal Road 2 */}
      <View
        style={[
          styles.roadHorizontal,
          {
            left: -cameraOffset.x,
            top: 450 - cameraOffset.y,
          },
        ]}
      />

      {/* Horizontal Road 3 */}
      <View
        style={[
          styles.roadHorizontal,
          {
            left: -cameraOffset.x,
            top: 750 - cameraOffset.y,
          },
        ]}
      />

      {/* Vertical Road 1 */}
      <View
        style={[
          styles.roadVertical,
          {
            left: 200 - cameraOffset.x,
            top: -cameraOffset.y,
          },
        ]}
      />

      {/* Vertical Road 2 */}
      <View
        style={[
          styles.roadVertical,
          {
            left: 500 - cameraOffset.x,
            top: -cameraOffset.y,
          },
        ]}
      />

      {/* Vertical Road 3 */}
      <View
        style={[
          styles.roadVertical,
          {
            left: 800 - cameraOffset.x,
            top: -cameraOffset.y,
          },
        ]}
      />

      {/* Buildings - Stores (red) */}
      <View
        style={[
          styles.building,
          {
            left: 50 - cameraOffset.x,
            top: 50 - cameraOffset.y,
            backgroundColor: SPRITES.store,
          },
        ]}
      />
      <View
        style={[
          styles.building,
          {
            left: 300 - cameraOffset.x,
            top: 250 - cameraOffset.y,
            backgroundColor: SPRITES.store,
          },
        ]}
      />
      <View
        style={[
          styles.building,
          {
            left: 600 - cameraOffset.x,
            top: 550 - cameraOffset.y,
            backgroundColor: SPRITES.store,
          },
        ]}
      />

      {/* Buildings - Houses (blue) */}
      <View
        style={[
          styles.building,
          {
            left: 300 - cameraOffset.x,
            top: 50 - cameraOffset.y,
            backgroundColor: SPRITES.house,
          },
        ]}
      />
      <View
        style={[
          styles.building,
          {
            left: 600 - cameraOffset.x,
            top: 50 - cameraOffset.y,
            backgroundColor: SPRITES.house,
          },
        ]}
      />
      <View
        style={[
          styles.building,
          {
            left: 850 - cameraOffset.x,
            top: 250 - cameraOffset.y,
            backgroundColor: SPRITES.house,
          },
        ]}
      />
      <View
        style={[
          styles.building,
          {
            left: 50 - cameraOffset.x,
            top: 550 - cameraOffset.y,
            backgroundColor: SPRITES.house,
          },
        ]}
      />
      <View
        style={[
          styles.building,
          {
            left: 300 - cameraOffset.x,
            top: 550 - cameraOffset.y,
            backgroundColor: SPRITES.house,
          },
        ]}
      />

      {/* Buildings - Apartments (purple) */}
      <View
        style={[
          styles.buildingLarge,
          {
            left: 850 - cameraOffset.x,
            top: 550 - cameraOffset.y,
            backgroundColor: SPRITES.apartment,
          },
        ]}
      />
      <View
        style={[
          styles.buildingLarge,
          {
            left: 50 - cameraOffset.x,
            top: 250 - cameraOffset.y,
            backgroundColor: SPRITES.apartment,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  background: {
    position: 'absolute',
    width: 2000,
    height: 2000,
  },
  roadHorizontal: {
    position: 'absolute',
    width: 2000,
    height: 80,
    backgroundColor: SPRITES.road,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderColor: SPRITES.sidewalk,
  },
  roadVertical: {
    position: 'absolute',
    width: 80,
    height: 2000,
    backgroundColor: SPRITES.road,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderColor: SPRITES.sidewalk,
  },
  building: {
    position: 'absolute',
    width: 80,
    height: 60,
    borderWidth: 2,
    borderColor: '#000',
  },
  buildingLarge: {
    position: 'absolute',
    width: 100,
    height: 120,
    borderWidth: 2,
    borderColor: '#000',
  },
});

export default CityMap;
