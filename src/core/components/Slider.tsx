import React, { ReactElement } from "react";
import { View, StyleSheet, FlatList, Dimensions, Text, TouchableOpacity } from "react-native";

interface IProps {
  slides: { component: ReactElement, id: string, description: string }[]
}

const onStopPropagation = (e: { stopPropagation: () => void; }) => {
  e.stopPropagation();
}

const Slider = (props: IProps) => {
  return (
    <>
      <View 
        onTouchStart={onStopPropagation}
        style={styles.wrapper}>
        <FlatList
          style={styles.caruselWrapper}
          data={props.slides}
          renderItem={({ item }) => {
            return (
              <View style={styles.slideWrapper}>
                <View style={styles.slide}>
                  {item.component}
                </View>
                <Text style={styles.description}>{item.description && item.description}</Text>
              </View>

            )}
          }
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  )
}

export default Slider;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: "center",
    alignItems: "center",
  },
  caruselWrapper: {
    width: '100%',
  },
  slideWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slide: {
    position: 'relative',
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    borderRadius: 15,
    transform: [
      {scale: 0.8}
    ]
  },
  description: {
    width: Dimensions.get('window').width,
    marginBottom: 40,
    textAlign: 'center',
  }
})