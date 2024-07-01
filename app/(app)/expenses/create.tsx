import { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams, Link } from "expo-router";
import { randomUUID, CryptoEncoding } from "expo-crypto";

import { DateTimePickerAndroid, DateTimePickerEvent, AndroidNativeProps } from '@react-native-community/datetimepicker';

import { View } from 'components/Themed';
import { ClashGrotesk, ClashGroteskBold } from "components/text/StyledText";

import { dateFormatter, pesoFormatter } from "utilities/formatters";

import { serverUrl } from "constants/server";


type category = {
  category_id: string,
  name: string,
  icon: string
};

type form = {
  value: string;
  category: category | undefined;
  date: Date;
};

function canCreateExpense(form: form): boolean {
  if (form.category) {
    return form.value !== '' && form.category.category_id !== '';
  }
  return false;
}

function getCategory(id: string, form: form, setForm: any) {
  fetch(`${serverUrl}/category/get/${id}`, {
    method: 'GET',
    headers: {
      Aceept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token 6b6e12cf2e3732506a0811ecd2703b958025d190'
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return response.text().then(text => { throw new Error(text) })
    })
    .then(category => {
      setForm({
        ...form,
        category: category
      })
    })
    .catch(error => {
      console.error(error);
    });
}

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
  const { categorySelectedIdParam } = useLocalSearchParams<{ categorySelectedIdParam: string }>();
  const [form, setForm] = useState<form>({
    value: '',
    category: undefined,
    date: new Date(Date.now())
  });

  useEffect(() => {
    console.log('in effect');
    if (categorySelectedIdParam) {
      console.log(1)
      getCategory(categorySelectedIdParam, form, setForm);
    }

    setForm({
      ...form,
      category: undefined
    })
  }, [categorySelectedIdParam]);

  function createExpense() {
    fetch(`${serverUrl}/expense/create`, {
      method: 'POST',
      headers: {
        Aceept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token 6b6e12cf2e3732506a0811ecd2703b958025d190'
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
          params: categorySelectedIdParam ? { categorySelectedIdParam: categorySelectedIdParam } : undefined
        }} asChild>
          <Pressable>
            <TextInput
              style={styles.formTextInput}
              placeholder="Categoría"
              placeholderTextColor='black'
              value={form.category ? form.category.name : ''}
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
          style={[styles.createExpenseButton, canCreateExpense(form) ? styles.createExpenseActiveButton : styles.createExpenseInactiveButton]}
          onPress={() => {
            createExpense();
            //router.replace('/')
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
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 10
  },
  createExpenseActiveButton: {
    backgroundColor: '#ff4500'
  },
  createExpenseInactiveButton: {
    backgroundColor: '#FF9D79'
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
    paddingStart: 10,
    color: 'black'
  }
});
