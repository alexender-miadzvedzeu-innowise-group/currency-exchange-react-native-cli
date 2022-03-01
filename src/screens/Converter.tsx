import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { List } from '../core/components/List';
import { COLOR_SCHEME } from '../core/constans/colorScheme';
import { CONVERTER_PAGE_TEXTS } from '../core/constans/texts';
import { convertCurrency } from '../services/currency';

export const Converter: React.FunctionComponent = () => {

  const [ from, setFrom ] = useState<null | string>(null)
  const [ to, setTo ] = useState<null | string>(null);
  const [ openedCurrencyType, setOpenedCurrencyType ] = useState<null | string>(null)
  const [ showList, setShowList ] = useState<boolean>(false);
  const [ inputValue, setInputValue ] = useState<string>('')
  const [ resultInputValue, setresultInputValue ] = useState<string>('')
  const { currencies } = useSelector(state => state.currency);

  const chooseCurrency = (type: string) => () => {
    setShowList(!showList)
    setOpenedCurrencyType(type);
  }

  const onPressResetButton = () => {
    setFrom(null);
    setTo(null);
    setInputValue('');
    setresultInputValue('');
  }

  const onTextInputChange = async (text: string) => {
    setInputValue(text);
    if (from && to) {
      const rate = await convertCurrency(from, to, text);
      if (rate) {
        setresultInputValue(rate);
      }
    }
    if (text.length === 0) {
      setresultInputValue('');
    }
  }

  const listCallback = (text: string) => {
    switch (openedCurrencyType) {
      case 'From':
        setFrom(text);
        setOpenedCurrencyType(null);
        setShowList(!showList)
        break;
      case 'To': 
        setTo(text);
        setOpenedCurrencyType(null);
        setShowList(!showList)
        break;
    }
    setInputValue('')
    setresultInputValue('')
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.topArticle}>{CONVERTER_PAGE_TEXTS.topArticle}</Text>      
      <View style={styles.converterContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={!from ? styles.button : styles.buttonFilled} onPress={chooseCurrency('From')}>
            <View>
              <Text style={styles.buttonText}>{!from ? 'From' : from}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={!to ? styles.button : styles.buttonFilled} onPress={chooseCurrency('To')}>
            <View>
              <Text style={styles.buttonText}>{!to ? 'To' : to}</Text>
            </View>
          </TouchableOpacity>
        </View>  
        <View style={styles.inputContainer}>
          <TextInput editable={Boolean(from && to)} value={inputValue} onChangeText={onTextInputChange} style={styles.input} keyboardType="numeric"/>
          <TextInput editable={false} value={resultInputValue} style={styles.input}/>
        </View>  
        <TouchableOpacity style={styles.clearButton} onPress={onPressResetButton}>
          <View>
            <Text style={styles.buttonText}>Reset</Text>
          </View>
        </TouchableOpacity>
      </View>
      {showList && <List data={currencies} onButtonPress={listCallback} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { 
    flex: 1, 
    alignItems: 'center',
    backgroundColor: COLOR_SCHEME.background
  },
  topArticle: {
    marginVertical: 15,
    width: "80%",
    textAlign: 'center',
    color: COLOR_SCHEME.textColor
  },
  converterContainer: {
    width: '80%',
    height: 130,
    borderRadius: 15,
    padding: 10,
    backgroundColor: COLOR_SCHEME.colorLight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: "10%",
    height: 30,
    backgroundColor: COLOR_SCHEME.colorMiddle,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonFilled: {
    marginHorizontal: "10%",
    height: 30,
    backgroundColor: COLOR_SCHEME.colorDark,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    borderBottomColor: COLOR_SCHEME.colorMiddle,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    marginHorizontal: "10%",
    height: 40,
    flex: 1,
    marginTop: 5
  },
  clearButton: {
    marginTop: "10%",
    marginHorizontal: 'auto',
    width: 100,
    height: 30,
    backgroundColor: COLOR_SCHEME.warn,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: COLOR_SCHEME.textColor
  }
})