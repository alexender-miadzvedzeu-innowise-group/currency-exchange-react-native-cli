import React, { useEffect, useState } from "react";
import { TextInput, FlatList, StyleSheet, View, TouchableOpacity, Text, Dimensions } from "react-native";
import { COLOR_SCHEME } from "../constans/colorScheme";
import { hideTextOverflow } from "../helpers/hideTextOverflow";

interface IProps {
  data: [{
    [currency: string]: string
  }],
  onButtonPress: Function
}

export const List: React.FunctionComponent<IProps> = ({ data, onButtonPress }):JSX.Element => {

  const [ inputValue, setInputValue ] = useState<string>('');
  const [ filtredCurrencies, setfFltredCurrencies ] = useState<{[key: string]: string}[] | null>(null);

  const onButtonPressHandle = (currency: string, callback: Function) => () => callback(currency)

  const onInputChange = (text: string) => {
    setInputValue(text);
    if (text.length) {
      const filtred = data.filter(el => {
        const length = text.length;
        return el.currency.substring(0, length) === text.toUpperCase();
      });
      return setfFltredCurrencies(filtred)
    }
    return setfFltredCurrencies(null)
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.popUp}>
        <TextInput
          value={inputValue}
          style={styles.input}
          onChangeText={onInputChange}
          placeholder="Search"
        />
        <View style={styles.area}>
          <FlatList 
            style={styles.list}
            data={filtredCurrencies ? filtredCurrencies : data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.currency}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity 
                  style={styles.buttonWrapper}
                  onPress={onButtonPressHandle(item.currency, onButtonPress)}
                >
                  <Text style={styles.currencyName}>{item.currency}</Text>
                  <Text style={styles.currencyDesc}>{hideTextOverflow(item.country, 25)}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Dimensions.get('window').height - 65,
    backgroundColor: COLOR_SCHEME.modalBackground,
    flex: 1,
    alignItems: 'center'
  },
  popUp: {
    width: '80%',
    maxWidth: 200,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  input: {
    width: '80%',
    height: 40,
    borderBottomColor: COLOR_SCHEME.primary,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    marginBottom: 3
  },
  area: {
    width: "80%"
  },
  list: {
    maxHeight: 350,
    width: "100%"
  },
  buttonWrapper: {
    marginVertical: 3,
    paddingVertical: 5,
    paddingHorizontal: 7,
    backgroundColor: COLOR_SCHEME.primary,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  currencyName: {
    color: '#fff'
  },
  currencyDesc: {
    fontSize: 10,
  }
})