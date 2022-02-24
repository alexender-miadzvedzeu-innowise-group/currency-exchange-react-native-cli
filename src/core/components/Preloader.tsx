
import React from 'react';
import { View, ActivityIndicator,StyleSheet } from 'react-native';

export const Preloader:React.FunctionComponent = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#c5c5c7"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
  }
});