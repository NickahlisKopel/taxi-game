import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CityMapProps {
  cameraOffset: { x: number; y: number };
}

// Modern minimal color palette
const COLORS = {
  background: '#e8f5e9',      // Light green background
  road: '#424242',            // Dark gray road
  roadLine: '#fdd835',        // Yellow road lines
  sidewalk: '#bdbdbd',        // Light gray sidewalk

  // Buildings - flat minimal colors
  store: '#ff6b6b',           // Coral red stores
  house: '#4ecdc4',           // Turquoise houses
  apartment: '#95e1d3',       // Mint apartments
  office: '#a8dadc',          // Light blue office

  // Traffic
  carRed: '#e63946',
  carBlue: '#457b9d',
  carYellow: '#ffd60a',

  // Shadows
  shadow: 'rgba(0, 0, 0, 0.15)',
};

const CityMap: React.FC<CityMapProps> = ({ cameraOffset }) => {
  // Road positions for intersections
  const horizontalRoads = [250, 550, 850];
  const verticalRoads = [300, 600, 900];

  return (
    <View style={styles.container}>
      {/* Background */}
      <View
        style={[
          styles.background,
          {
            left: -cameraOffset.x,
            top: -cameraOffset.y,
            backgroundColor: COLORS.background,
          },
        ]}
      />

      {/* Horizontal Roads with lane markings */}
      {horizontalRoads.map((y, index) => (
        <View key={`h-road-${index}`}>
          {/* Road base */}
          <View
            style={[
              styles.roadHorizontal,
              {
                left: -cameraOffset.x,
                top: y - cameraOffset.y,
              },
            ]}
          />
          {/* Center lane marking */}
          <View
            style={[
              styles.laneLine,
              {
                left: -cameraOffset.x,
                top: y + 37 - cameraOffset.y,
                width: 2000,
                height: 2,
              },
            ]}
          />
        </View>
      ))}

      {/* Vertical Roads with lane markings */}
      {verticalRoads.map((x, index) => (
        <View key={`v-road-${index}`}>
          {/* Road base */}
          <View
            style={[
              styles.roadVertical,
              {
                left: x - cameraOffset.x,
                top: -cameraOffset.y,
              },
            ]}
          />
          {/* Center lane marking */}
          <View
            style={[
              styles.laneLine,
              {
                left: x + 37 - cameraOffset.x,
                top: -cameraOffset.y,
                width: 2,
                height: 2000,
              },
            ]}
          />
        </View>
      ))}

      {/* Traffic Cars at Intersections */}
      {/* Intersection 1 - Cars waiting */}
      <View style={[styles.carHorizontal, { left: 220 - cameraOffset.x, top: 258 - cameraOffset.y, backgroundColor: COLORS.carRed }]} />
      <View style={[styles.carHorizontal, { left: 420 - cameraOffset.x, top: 278 - cameraOffset.y, backgroundColor: COLORS.carBlue }]} />

      {/* Intersection 2 - Vertical traffic */}
      <View style={[styles.carVertical, { left: 608 - cameraOffset.x, top: 450 - cameraOffset.y, backgroundColor: COLORS.carYellow }]} />
      <View style={[styles.carVertical, { left: 588 - cameraOffset.x, top: 350 - cameraOffset.y, backgroundColor: COLORS.carRed }]} />

      {/* Intersection 3 */}
      <View style={[styles.carHorizontal, { left: 750 - cameraOffset.x, top: 558 - cameraOffset.y, backgroundColor: COLORS.carBlue }]} />

      {/* Buildings with shadows - Modern layout */}

      {/* Top left block - Houses */}
      <View style={[styles.buildingShadow, { left: 50 - cameraOffset.x, top: 60 - cameraOffset.y }]} />
      <View style={[styles.building, { left: 50 - cameraOffset.x, top: 60 - cameraOffset.y, backgroundColor: COLORS.house }]} />

      <View style={[styles.buildingShadow, { left: 160 - cameraOffset.x, top: 60 - cameraOffset.y }]} />
      <View style={[styles.building, { left: 160 - cameraOffset.x, top: 60 - cameraOffset.y, backgroundColor: COLORS.house }]} />

      {/* Top middle - Store */}
      <View style={[styles.buildingShadow, { left: 400 - cameraOffset.x, top: 60 - cameraOffset.y }]} />
      <View style={[styles.building, { left: 400 - cameraOffset.x, top: 60 - cameraOffset.y, backgroundColor: COLORS.store }]} />

      {/* Top right - Apartment */}
      <View style={[styles.buildingLargeShadow, { left: 700 - cameraOffset.x, top: 40 - cameraOffset.y }]} />
      <View style={[styles.buildingLarge, { left: 700 - cameraOffset.x, top: 40 - cameraOffset.y, backgroundColor: COLORS.apartment }]} />

      {/* Middle left - Store */}
      <View style={[styles.buildingShadow, { left: 50 - cameraOffset.x, top: 360 - cameraOffset.y }]} />
      <View style={[styles.building, { left: 50 - cameraOffset.x, top: 360 - cameraOffset.y, backgroundColor: COLORS.store }]} />

      {/* Middle center - Office */}
      <View style={[styles.buildingLargeShadow, { left: 420 - cameraOffset.x, top: 340 - cameraOffset.y }]} />
      <View style={[styles.buildingLarge, { left: 420 - cameraOffset.x, top: 340 - cameraOffset.y, backgroundColor: COLORS.office }]} />

      {/* Middle right - Houses */}
      <View style={[styles.buildingShadow, { left: 720 - cameraOffset.x, top: 360 - cameraOffset.y }]} />
      <View style={[styles.building, { left: 720 - cameraOffset.x, top: 360 - cameraOffset.y, backgroundColor: COLORS.house }]} />

      <View style={[styles.buildingShadow, { left: 830 - cameraOffset.x, top: 360 - cameraOffset.y }]} />
      <View style={[styles.building, { left: 830 - cameraOffset.x, top: 360 - cameraOffset.y, backgroundColor: COLORS.house }]} />

      {/* Bottom left - Apartment */}
      <View style={[styles.buildingLargeShadow, { left: 50 - cameraOffset.x, top: 660 - cameraOffset.y }]} />
      <View style={[styles.buildingLarge, { left: 50 - cameraOffset.x, top: 660 - cameraOffset.y, backgroundColor: COLORS.apartment }]} />

      {/* Bottom middle - Store */}
      <View style={[styles.buildingShadow, { left: 400 - cameraOffset.x, top: 680 - cameraOffset.y }]} />
      <View style={[styles.building, { left: 400 - cameraOffset.x, top: 680 - cameraOffset.y, backgroundColor: COLORS.store }]} />

      {/* Bottom right - Houses */}
      <View style={[styles.buildingShadow, { left: 720 - cameraOffset.x, top: 680 - cameraOffset.y }]} />
      <View style={[styles.building, { left: 720 - cameraOffset.x, top: 680 - cameraOffset.y, backgroundColor: COLORS.house }]} />

      <View style={[styles.buildingShadow, { left: 1000 - cameraOffset.x, top: 60 - cameraOffset.y }]} />
      <View style={[styles.building, { left: 1000 - cameraOffset.x, top: 60 - cameraOffset.y, backgroundColor: COLORS.house }]} />
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
    width: 2500,
    height: 2500,
  },
  roadHorizontal: {
    position: 'absolute',
    width: 2500,
    height: 76,
    backgroundColor: COLORS.road,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderColor: COLORS.sidewalk,
  },
  roadVertical: {
    position: 'absolute',
    width: 76,
    height: 2500,
    backgroundColor: COLORS.road,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderColor: COLORS.sidewalk,
  },
  laneLine: {
    position: 'absolute',
    backgroundColor: COLORS.roadLine,
  },

  // Building styles with flat design
  building: {
    position: 'absolute',
    width: 90,
    height: 70,
    borderRadius: 4,
  },
  buildingShadow: {
    position: 'absolute',
    width: 90,
    height: 70,
    backgroundColor: COLORS.shadow,
    borderRadius: 4,
    transform: [{ translateX: 4 }, { translateY: 4 }],
  },
  buildingLarge: {
    position: 'absolute',
    width: 110,
    height: 130,
    borderRadius: 6,
  },
  buildingLargeShadow: {
    position: 'absolute',
    width: 110,
    height: 130,
    backgroundColor: COLORS.shadow,
    borderRadius: 6,
    transform: [{ translateX: 5 }, { translateY: 5 }],
  },

  // Traffic car styles
  carHorizontal: {
    position: 'absolute',
    width: 35,
    height: 20,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  carVertical: {
    position: 'absolute',
    width: 20,
    height: 35,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default CityMap;
