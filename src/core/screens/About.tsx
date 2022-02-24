import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ABOUT_PAGE_TEXTS, CONVERTER_PAGE_TEXTS, EXCHANGE_RATES_PAGE_TEXTS, HOME_PAGE_TEXTS, SETTINGS_PAGE_TEXTS } from '../constans/texts';
import Slider from '../components/Slider';
import { Home } from './Home';
import { ExchangeRates } from './ExchangeRates';
import { Settings } from './Settings';
import { generateID } from '../helpers/generateID';
import { Converter } from './Converter';

export const About: React.FunctionComponent = () => {

  return (
    <View style={styles.wrapper}>
      <Text style={styles.topArticle}>{ABOUT_PAGE_TEXTS.topArticle}</Text>
      
      <Slider
        slides={[
          {
            component: <Home/>,
            id: generateID(),
            description: HOME_PAGE_TEXTS.slideDescription,
          },
          {
            component: <ExchangeRates/>,
            id: generateID(),
            description: EXCHANGE_RATES_PAGE_TEXTS.slideDescription
          },
          {
            component: <Converter/>,
            id: generateID(),
            description: CONVERTER_PAGE_TEXTS.slideDescription
          },
          {
            component: <Settings/>,
            id: generateID(),
            description: SETTINGS_PAGE_TEXTS.slideDescription
          }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { 
    flex: 1, 
    alignItems: 'center',
  },
  topArticle: {
    marginVertical: 15,
    width: "80%",
    textAlign: 'center'
  },
});