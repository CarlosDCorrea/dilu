import { StyleSheet, Pressable } from 'react-native';

import EditScreenInfo from '../../../components/EditScreenInfo';
import { Text, View } from '../../../components/Themed';

import { ClashGroteskBold, ClashGrotesk, ClashGroteskLight } from '../../../components/text/StyledText';

import { FlashList } from "@shopify/flash-list";


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
]


export default function HomeScreen() {
  // TODO: Take a look at the flash list and expo-dev-client in the future
  return (
    <View style={styles.container}>
      <ClashGroteskBold style={{ fontSize: 25 }}>Marzo 14</ClashGroteskBold>
      <ClashGrotesk style={{ fontSize: 20, marginTop: 10 }}>Saldo:  <ClashGroteskLight>$50.000</ClashGroteskLight></ClashGrotesk>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <View style={styles.flashListContainer}>
        <FlashList
          data={records}
          renderItem={({ item }) =>
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
              <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                <ClashGroteskBold style={{ fontSize: 40 }}>{item.day}</ClashGroteskBold>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                <ClashGroteskLight style={{flex: 3, fontSize: 20}}>{item.description}</ClashGroteskLight>
                <ClashGrotesk style={{flex: 0.5, fontSize: 15 }}>{item.value}</ClashGrotesk>
              </View>
            </View>
          }
          estimatedItemSize={40}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
