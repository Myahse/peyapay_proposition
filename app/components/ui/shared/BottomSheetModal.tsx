import React, { useRef, useEffect, useState } from 'react';
import { Modal, Animated, Dimensions, Pressable, View, PanResponder } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface BottomSheetModalProps {
  visible: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  onDismiss?: () => void;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({ visible, onRequestClose, children, onDismiss }) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [internalVisible, setInternalVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      setInternalVisible(true);
      Animated.timing(translateY, {
        toValue: 0,
        useNativeDriver: true,
        duration: 250,
        easing: undefined,
      }).start(() => setIsSheetOpen(true));
    } else if (internalVisible) {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setIsSheetOpen(false);
        setInternalVisible(false);
        if (onDismiss) onDismiss();
      });
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(Math.max(0, gestureState.dy));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          closeModalWithAnimation();
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            useNativeDriver: true,
            duration: 250,
            easing: undefined,
          }).start();
        }
      },
    })
  ).current;

  const closeModalWithAnimation = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onRequestClose());
  };

  return (
    <Modal visible={internalVisible} transparent animationType="none">
      <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 0 }} onPress={closeModalWithAnimation}>
        <Animated.View
          style={{
            width: '100%',
            transform: [{ translateY }],
          }}
        >
          <View className="bg-white rounded-t-3xl">
            {/* Drag indicator */}
            <View className="w-full items-center pt-3 pb-2" {...panResponder.panHandlers}>
              <View className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </View>
            {isSheetOpen ? children : null}
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default BottomSheetModal; 