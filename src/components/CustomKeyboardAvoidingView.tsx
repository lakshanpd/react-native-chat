import React, { useEffect, useState } from "react";
import { View, Animated, Keyboard, Platform, StyleSheet, Dimensions } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"; 

const CustomKeyboardAvoidingView = ({ children }) => {
  const [keyboardHeight] = useState(new Animated.Value(0));
  const tabBarHeight = useBottomTabBarHeight(); 

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (event) => {
      Animated.timing(keyboardHeight, {
        toValue: event.endCoordinates.height - tabBarHeight, 
        duration: 200,
        useNativeDriver: false,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [tabBarHeight]);

  return (
    <Animated.View style={[styles.container, { marginBottom: keyboardHeight }]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomKeyboardAvoidingView;