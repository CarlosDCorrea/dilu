import React from "react";
import { useState, useCallback } from "react";
import { StyleSheet, Dimensions, ScrollView } from 'react-native';

import { useFocusEffect } from "expo-router";

import { LineChart } from "react-native-chart-kit";

import { View } from '@/components/Themed';
import { Montserrat } from "@/components/text/StyledText";

import { getDailyGraph } from "@/api/expense";

import { getMonthRange } from "@/utilities/dateRanges";


function getXAxisValue(endDate: Date, setXAxis: React.Dispatch<React.SetStateAction<number[]>>): void {
  let xAxis: number[] = [];

  for (let i = 1; i < endDate.getDate() + 1; i++) {
    xAxis.push(i);
  }

  setXAxis(xAxis);
}

function getYAxis(
  startDate: Date,
  endDate: Date,
  setYAxis: React.Dispatch<React.SetStateAction<number[]>>,
  xAxis: number[]): void {
  let yAxis: number[] = [];

  getDailyGraph(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
    .then(results => {
      for (let i = 0; i < xAxis.length; i++) {
        // for some reason getting the date of '2024-07-03' is returning 2, after some chatGPT i am assuming it is because
        // of the UTC and local time when using strings for creating date objects
        let result: { value: number, created: string } | undefined = results.find(result => new Date(result.created).getUTCDate() === xAxis[i]);
        let day: number = result ? result.value : 0
        yAxis.push(day);
      }

      setYAxis(yAxis);
    });
}


export default function Graphs() {
  const [xAxis, setXAxis] = useState<number[]>([]);
  const [yAxis, setYAxis] = useState<number[]>([]);
  const [startDateMonth, endDateMonth] = getMonthRange(new Date(Date.now()));

  useFocusEffect(
    useCallback(() => {
      getXAxisValue(endDateMonth, setXAxis);
      getYAxis(startDateMonth, endDateMonth, setYAxis, xAxis);
    }, [])
  )

  return (
    <View style={styles.container}>
      <View>
        <Montserrat style={styles.title}>Gastos</Montserrat>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator>
          {(xAxis.length && yAxis.length) ? (<LineChart
            data={{
              labels: xAxis.map(day => {
                if (day % 5) {
                  return ''
                }

                return day.toString()
              }),
              datasets: [
                {
                  data: yAxis
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={300}
            yAxisLabel="$"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              paddingHorizontal: 10,
              borderRadius: 16
            }}
          />): <View></View>}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
