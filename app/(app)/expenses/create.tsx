import { useState } from "react";
import { Platform, StyleSheet, TextInput, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams, Link } from "expo-router";
import { randomUUID, CryptoEncoding } from "expo-crypto";

import { DateTimePickerAndroid, DateTimePickerEvent, AndroidNativeProps } from '@react-native-community/datetimepicker';

import { View } from 'components/Themed';
import { ClashGrotesk, ClashGroteskBold } from "components/text/StyledText";

import { dateFormatter, pesoFormatter } from "utilities/formatters";


type category = {
  id: string | undefined,
  name: string,
  subCategory: string | undefined
};

type form = {
  value: string;
  category: category;
  date: Date;
};

function onChangeForm(action: any, form: any, text: string, field: string) {
  if (field === 'value') {
    text = text.replace(/[^0-9]/g, "");
  }

  action({
    ...form,
    [field]: text
  });
}

export default function ModalScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const [form, setForm] = useState<form>({
    value: '',
    category: {
      id: undefined,
      name: '',
      subCategory: undefined
    },
    date: new Date(Date.now())
  });

  console.log(`rendering ModalScreen and this is the categorySelected at the moment ${category}`)

  function createExpense() {
    fetch('https://localhost:8000/expense/create', {
      method: 'POST',
      headers: {
        Aceept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(response => response.json())
      .then(json => {
        console.log(json.message);
        router.back();
      })
      .catch(error => {
        console.error(error);
      });
  }

  const onChangeDate = (_: DateTimePickerEvent, selectedDate: Date | undefined) => {
    setForm({
      ...form,
      ['date']: selectedDate ? selectedDate : new Date(Date.now())
    });
  };

  const showMode = (currentMode: AndroidNativeProps['mode']) => {
    DateTimePickerAndroid.open({
      value: form.date,
      onChange: onChangeDate,
      mode: currentMode
    });
  };

  const showDatePicker = () => {
    showMode('date')
  }

  return (
    <View style={styles.container}>
      <ClashGroteskBold style={{ fontSize: 30, alignSelf: 'center', color: '#8b4513' }}>Registrar Gasto</ClashGroteskBold>
      <View style={styles.middleContainer}>
        <TextInput
          style={styles.formTextInput}
          placeholder="Valor"
          keyboardType="numeric"
          placeholderTextColor='black'
          value={form.value ? pesoFormatter().format(parseInt(form.value)).toString().split(',')[0] : ""}
          onChangeText={text => onChangeForm(setForm, form, text, 'value')}></TextInput>
        <Link href={{
          pathname: '/category',
          params: category ? { category: category } : undefined
        }} asChild>
          <Pressable>
            <TextInput
              style={styles.formTextInput}
              placeholder="Categoría"
              placeholderTextColor='black'
              value={form.category.name}
              editable={false}
              onChangeText={text => onChangeForm(setForm, form, text, 'category')}></TextInput>
          </Pressable>
        </Link>
        <Pressable onPress={_ => showDatePicker()}>
          <TextInput
            style={styles.formTextInput}
            placeholder={`Fecha: ${dateFormatter().format(form.date)}`}
            placeholderTextColor='black'
            editable={false}></TextInput>
        </Pressable>
      </View>
      <View style={{ backgroundColor: 'transparent' }}>
        <Pressable
          style={styles.createExpenseButton}
          onPress={() => {
            createExpense();
            router.replace('/')
          }}>
          <ClashGrotesk style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Crear</ClashGrotesk>
        </Pressable>
        <Pressable
          style={styles.dismissButton}
          onPress={() => {
            router.back();
          }}
        >
          <ClashGrotesk style={{ textAlign: 'center', fontSize: 20, color: 'black' }}>Dismiss</ClashGrotesk>
        </Pressable>
      </View>
      <StatusBar style={Platform.OS == 'ios' ? 'light' : 'dark'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fffaf0'
  },
  middleContainer: {
    padding: 20,
    paddingTop: 40,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'red'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  createExpenseButton: {
    width: '50%',
    backgroundColor: '#ff4500',
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 10
  },
  dismissButton: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 10
  },
  formTextInput: {
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 20,
    paddingVertical: 11,
    paddingStart: 10
  }
});
