import React, { useEffect, useRef } from "react";
import { Animated, View, NativeSyntheticEvent, StyleSheet } from 'react-native';

const AnimatedShowGate: React.FunctionComponent = ({ children }): JSX.Element => {

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
      }
    ).start()
  }, [fadeAnim])

  const styles = StyleSheet.create({
    wrapper: {
      width: '80%'
    }
  })

  return (
    <Animated.View
    style={{
      ...styles.wrapper,
      opacity: fadeAnim
    }}
    >
      {children}
    </Animated.View>
  )


}

export default AnimatedShowGate;