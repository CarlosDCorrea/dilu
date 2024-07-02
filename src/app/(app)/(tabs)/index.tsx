import { StyleSheet, Pressable } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { View } from '@/components/Themed';

import { MontserratBold, Montserrat, MontserratLight } from '@/components/text/StyledText';


type record = {
  day: number;
  value: number;
  description: string;
}

const records: record[] = [
  {
    day: 1,
    value: 5000,
    description: "something"
  },
  {
    day: 1,
    value: 5000,
    description: "something"
  },
  {
    day: 1,
    value: 5000,
    description: "something"
  },
  {
    day: 1,
    value: 5000,
    description: "something"
  },
  {
    day: 1,
    value: 5000,
    description: "something"
  },
  {
    day: 1,
    value: 5000,
    description: "something"
  },
  {
    day: 1,
    value: 5000,
    description: "something"
  },
  {
    day: 1,
    value: 5000,
    description: "something"
  },
  {
    day: 1,
    value: 5000,
    description: "something"
  },
  {
    day: 1,
    value: 5000,
    description: "something"
  },
  {
    day: 1,
    value: 5000,
    description: "something"
  },
  {
    day: 1,
    value: 5000,
    description: "something"
  },
  {
    day: 1,
    value: 5000,
    description: "something"
  },
  {
    day: 1,
    value: 5000,
    description: "something"
  },
  {
    day: 1,
    value: 5000,
    description: "something"
  },
]

export default function HomeScreen() {
  // TODO: Take a look at the flash list and expo-dev-client in the future
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <MontserratBold style={{ fontSize: 25 }}>Marzo 14</MontserratBold>
        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
          <Montserrat style={{ fontSize: 20, alignSelf: 'center' }}>Gastos:  <MontserratLight>$50.000</MontserratLight></Montserrat>
          <Link href="/expenses/create">
            <MaterialIcons style={{ marginLeft: 10, alignSelf: 'center' }} name="add-circle" size={24} color="#fb8500" />
          </Link>
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
      <FlashList
        data={records}
        renderItem={({ item }) =>
          <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
              <MontserratBold style={{ fontSize: 40 }}>{item.day}</MontserratBold>
            </View>
            <View style={{ flex: 0.8, flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
              <MontserratLight style={{ flex: 0.8, fontSize: 20 }}>{item.description}</MontserratLight>
              <Montserrat style={{ flex: 0.2, fontSize: 15 }}>{item.value}</Montserrat>
            </View>
          </View>
        }
        estimatedItemSize={20}
      />
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
