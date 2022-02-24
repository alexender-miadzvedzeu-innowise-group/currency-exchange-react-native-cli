import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { IRootReducer } from '../core/reducers';
import { Preloader } from '../core/components/Preloader';
import { COLOR_SCHEME } from '../core/constans/colorScheme';
import { EXCHANGE_RATES_PAGE_TEXTS } from '../core/constans/texts';
import { renderDinoText } from '../core/helpers/renderDinoText';

export const ExchangeRates: React.FunctionComponent = () => {
  
  const { rates, isLoading } = useSelector((state:IRootReducer) => state.currency);
  const { userChoseCurrency, currentCurrency } = useSelector((state:IRootReducer) => state.country);
  
  const baseCurrency = userChoseCurrency || currentCurrency;
  
  return (
    <View style={styles.wrapper}>
      <Text style={styles.topArticle}>{renderDinoText(EXCHANGE_RATES_PAGE_TEXTS.topArticle, { currency: baseCurrency })}</Text>
      {!isLoading ? (
        <View>
          {rates ? (
            <FlatList
              data={rates}
              keyExtractor={(rate) => rate.to}
              renderItem={({ item }) => 
                <Text
                  style={styles.rateText}
                >
                  {`1 ${item.from} = ${item.rateAmount} ${item.to}`}
                </Text>}
            >
            </FlatList>
          ) : null}
        </View>
      ): <Preloader/>}    
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: COLOR_SCHEME.background
  },
  topArticle: {
    marginVertical: 15,
    width: "80%",
    textAlign: 'center'
  },
  rateText: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: COLOR_SCHEME.colorLight,
    color: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
    borderRadius: 3,
  }
})

