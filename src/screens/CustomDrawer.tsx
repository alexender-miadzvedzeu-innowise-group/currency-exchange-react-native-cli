import React from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { COLOR_SCHEME } from "../core/constans/colorScheme";

export const CutomDrawer = (props: any) => {
  return (
    <View style={styles.wrapper}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={styles.drawerScrollView}
        >
          <View style={styles.itemListWrapper}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
      <View style={styles.bottomBlock}>
        <Text style={styles.bottomBlockText}>Created with love by:</Text>
        <Text style={styles.bottomBlockTextAuthor}>Alexender Sexualovich</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLOR_SCHEME.background
  },
  textInImageBackground: {
    padding: 30,
    top: 0
  },
  imageBackground: {
    padding: 20,
    borderWidth: 0,
    height: '107%',
  },
  drawerScrollView: {
    flex: 1,
    width: Dimensions.get('screen').width * 0.7,
    paddingVertical: 0,
    marginVertical: 0,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  itemListWrapper: { 
    // flex: 1, 
    width: '100%',
  },
  bottomBlock: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    paddingBottom: 130,
    paddingTop: 25,
    borderTopWidth: 1,
    borderTopColor: COLOR_SCHEME.colorLight
  },
  bottomBlockText: {
    color: COLOR_SCHEME.textColor,
  },
  bottomBlockTextAuthor: {
    color: COLOR_SCHEME.textColor,
    marginTop: 20,
    textTransform: 'uppercase'
  }
})