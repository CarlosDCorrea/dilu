import React from "react";
import { useState, useCallback } from "react";
import { StyleSheet } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Link, useFocusEffect } from "expo-router";

import { View } from '@/components/Themed';
import { MontserratBold, MontserratLight } from '@/components/text/StyledText';

import ListExpensesPage from "@/components/expenses/list";

import { getMonth, pesoFormatter } from "@/utilities/formatters";
import { getMonthRange } from "@/utilities/dateRanges";

import { getTotal } from "@/api/expense";


function getTotalExpensesValue(
  setTotalExpenses: React.Dispatch<React.SetStateAction<number>>): void {
    const [firstDateMonth, endDateMonth] = getMonthRange(new Date(Date.now())); 

    getTotal(firstDateMonth.toISOString().split('T')[0], endDateMonth.toISOString().split('T')[0])
    .then(data => setTotalExpenses(data.total))
    .catch(error => error);
}


export default function HomeScreen() {
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      getTotalExpensesValue(setTotalExpenses);
    }, [])
  );

  const today: Date = new Date(Date.now());
  const month: string = getMonth('long').format(today);

  console.log(totalExpenses);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <MontserratBold style={{ fontSize: 25 }}>{month[0].toUpperCase() + month.slice(1)}</MontserratBold>
        <View style={{ flexDirection: 'row', paddingTop: 10, alignItems: 'center' }}>
          <MontserratLight style={{ fontSize: 20, alignSelf: 'center', marginRight: 5 }}>{pesoFormatter().format(totalExpenses)}</MontserratLight>
          <Link href="/expenses/create">
            <MaterialIcons style={{ alignSelf: 'center' }} name="add-circle" size={24} color="#fb8500" />
          </Link>
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
      <ListExpensesPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flashListContainer: {
    marginTop: 10,
    backgroundColor: 'red',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
  loginButton: {
    width: '50%',
    backgroundColor: '#fb8500',
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 10
  }
});
