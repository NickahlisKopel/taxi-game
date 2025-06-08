import { InputState } from '@/components/types/input';
import React, { useRef } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';

interface JoystickProps {
  onInput: (input: InputState) => void;
}

const Joystick: React.FC<JoystickProps> = ({ onInput }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const maxDistance = 50;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        let dx = gesture.dx;
        let dy = gesture.dy;

        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > maxDistance) {
          const scale = maxDistance / distance;
          dx *= scale;
          dy *= scale;
        }

        position.setValue({ x: dx, y: dy });

        const input: InputState = {
            forward: dy < -10,
            backward: dy > 10,
            left: dx < -10,
            right: dx > 10,
          };
          

        onInput(input);
      },
      onPanResponderRelease: () => {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
        onInput({ forward: false, backward: false, left: false, right: false });
      },
    })
  ).current;

  return (
    <View style={styles.joystickContainer} {...panResponder.panHandlers}>
      <Animated.View
        style={[
          styles.joystickHandle,
          {
            transform: [
              { translateX: position.x },
              { translateY: position.y },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  joystickContainer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3338',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joystickHandle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#facc15',
  },
});

export default Joystick;
