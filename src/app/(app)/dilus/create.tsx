import React from 'react';
import { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams, Link } from "expo-router";

import { DateTimePickerAndroid, DateTimePickerEvent, AndroidNativeProps } from '@react-native-community/datetimepicker';
import Toast from 'react-native-root-toast';

import { View } from '@/components/Themed';
import { Montserrat, MontserratBold } from "@/components/text/StyledText";

import { dateFormatter, pesoFormatter } from "@/utilities/formatters";

import { diluForm } from "@/types/dilu";
import { create } from "@/api/dilu";


// REQUESTS
function createDilu(form: diluForm) {
  create(form)
    .then(_ => router.back())
    .catch(error => console.log(error));
}

function getUser(){
  
}

function canCreateDilu(form: diluForm): boolean {
  return true;
} 

const initialFormState: diluForm = {
  name: '',
  participants: [],
  isValid: canCreateDilu 
};

function onChangeForm(action: any, form: any, text: string, field: string) {
  action({
    ...form,
    [field]: text
  });
}

function resetForm(setForm: React.Dispatch<React.SetStateAction<diluForm>>): void {
  setForm(initialFormState);
}

function CreateDiluPage() {
  const [form, setForm] = useState<diluForm>(initialFormState);


  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <MontserratBold style={{ fontSize: 30, alignSelf: 'center', color: '#8b4513' }}>Crear Dilu</MontserratBold>
      <View style={styles.middleContainer}>
        <TextInput
          style={styles.formTextInput}
          placeholder="Nombre"
          placeholderTextColor='black'
          value={form.name}
          onChangeText={text => onChangeForm(setForm, form, text, 'value')}></TextInput>
        
      </View>
      <View style={{ backgroundColor: 'transparent' }}>
        <Pressable
          style={[styles.createExpenseButton, canCreateDilu(form) ? styles.createExpenseActiveButton : styles.createExpenseInactiveButton]}
          onPress={() => {
            createDilu(form);
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
          <Montserrat style={{ textAlign: 'center', fontSize: 20, color: 'black' }}>Dismiss</Montserrat>
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

export default CreateDiluPage