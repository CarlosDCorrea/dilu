import React from 'react';
import { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams, Link } from "expo-router";

import { DateTimePickerAndroid, DateTimePickerEvent, AndroidNativeProps } from '@react-native-community/datetimepicker';
import Toast from 'react-native-root-toast';

import { View } from '@/components/Themed';
import { Montserrat, MontserratBold } from "@/components/text/StyledText";

import Colors from "@/constants/Colors";

import { dateFormatter, pesoFormatter } from "@/utilities/formatters";

import { form } from "@/types/expenses";
import { category } from "@/types/category";

import { get } from "@/api/category";
import { create } from "@/api/expense";


// REQUESTS
function createExpense(form: form) {
  create(form)
    .then(_ => router.back())
    .catch(error => console.log(error));
}

function getCategory(
  form: form,
  setForm: React.Dispatch<React.SetStateAction<form>>,
  setCategorySelected: React.Dispatch<React.SetStateAction<category | null>>,
  categoryId?: string,): void {
  if (categoryId) {
    get(categoryId)
      .then(category => {
        setForm({
          ...form,
          category: category.category_id
        })
        setCategorySelected(category);
      })
      .catch(error => console.log(error));
  } else {
    setForm({
      ...form,
      category: null
    });
  }
}

const initialFormState = {
  value: '',
  description: '',
  category: null,
  created: new Date(Date.now())
};

function canCreateExpense(form: form): boolean {
  return form.value !== '';
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

function resetForm(setForm: React.Dispatch<React.SetStateAction<form>>): void {
  setForm(initialFormState);
}

function onChangeDateClosure(form: form, setForm: React.Dispatch<React.SetStateAction<form>>) {
  function onChangeDate(_: DateTimePickerEvent, selectedDate: Date | undefined) {
    setForm({
      ...form,
      ['created']: selectedDate ? selectedDate : new Date(Date.now())
    });
  };

  function showMode(currentMode: AndroidNativeProps['mode']) {
    DateTimePickerAndroid.open({
      value: form.created,
      onChange: onChangeDate,
      mode: currentMode
    });
  };

  return showMode;
}

export default function ModalScreen() {
  const { categorySelectedId } = useLocalSearchParams<{ categorySelectedId: string }>();
  const [categorySelected, setCategorySelected] = useState<category | null>(null);
  const [form, setForm] = useState<form>(initialFormState);

  useEffect(() => {
    getCategory(form, setForm, setCategorySelected, categorySelectedId);
  }, [categorySelectedId]);

  let showDatePicker = onChangeDateClosure(form, setForm);

  return (
    <View style={styles.container}>
      <MontserratBold style={{ fontSize: 30, alignSelf: 'center', color: Colors['secundary'] }}>Registrar Gasto</MontserratBold>
      <View style={styles.middleContainer}>
        <TextInput
          style={styles.formTextInput}
          placeholder="Valor"
          keyboardType="numeric"
          placeholderTextColor='black'
          value={form.value ? pesoFormatter().format(parseInt(form.value)).toString().split(',')[0] : ""}
          onChangeText={text => onChangeForm(setForm, form, text, 'value')}></TextInput>
        <TextInput
          style={styles.formTextInput}
          placeholder="Breve Descripción"
          placeholderTextColor='gray'
          value={form.description}
          onChangeText={text => onChangeForm(setForm, form, text, 'description')}></TextInput>
        <Link href={{
          pathname: '/category',
          params: categorySelectedId ? { categorySelectedIdParam: categorySelectedId } : undefined
        }} asChild>
          <Pressable>
            <TextInput
              style={styles.formTextInput}
              placeholder="Categoría"
              placeholderTextColor='black'
              value={form.category ? categorySelected?.name : ''}
              editable={false}
              onChangeText={text => onChangeForm(setForm, form, text, 'category')}></TextInput>
          </Pressable>
        </Link>
        {/* put instead a calendar icon and the date selected above or below */}
        <Pressable onPress={_ => showDatePicker('date')}>
          <TextInput
            style={styles.formTextInput}
            placeholder={`Fecha: ${dateFormatter().format(form.created)}`}
            placeholderTextColor='black'
            editable={false}>
          </TextInput>
        </Pressable>
      </View>
      <View style={{ backgroundColor: 'transparent' }}>
        <Pressable
          style={[styles.createExpenseButton, canCreateExpense(form) ? styles.createExpenseActiveButton : styles.createExpenseInactiveButton]}
          onPress={() => {
            createExpense(form);
            //router.replace('/')
          }}>
          <Montserrat style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Crear</Montserrat>
        </Pressable>
        <Pressable
          style={styles.dismissButton}
          onPress={() => {
            router.back();
          }}
        >
          <Montserrat style={{ textAlign: 'center', fontSize: 20, color: 'black' }}>Volver</Montserrat>
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
    paddingVertical: 10,
    backgroundColor: Colors['secundary']
  },
  createExpenseActiveButton: {
    opacity: 1
  },
  createExpenseInactiveButton: {
    opacity: 0.5
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
