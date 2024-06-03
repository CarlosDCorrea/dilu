import { useState, useEffect } from "react";
import { View, Pressable, StyleSheet } from 'react-native';

import { Link, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { ClashGroteskBold, ClashGrotesk } from 'components/text/StyledText';


type category = {
  id: string,
  name: string,
  subCategory: string | undefined
};


export default function CategorySelect() {
  const [categories, setCategories] = useState<category[]>([
    {
      id: '1',
      name: 'cat1',
      subCategory: undefined
    },
    {
      id: '2',
      name: 'cat1',
      subCategory: undefined
    },
    {
      id: '3',
      name: 'cat1',
      subCategory: undefined
    },
    {
      id: '4',
      name: 'cat1',
      subCategory: undefined
    },
    {
      id: '5',
      name: 'cat1',
      subCategory: undefined
    },
  ]);
  const [categorySelectedId, setCategorySelectedId] = useState<string | undefined>();
  const { category } = useLocalSearchParams<{category: string}>();

  useEffect(() => {
    setCategorySelectedId(category);
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <ClashGroteskBold style={{ fontSize: 30, color: '#8b4513' }}>Seleccionar una categoria</ClashGroteskBold>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
        {categories.map((category) => (
          <Pressable onPress={(_) => {
            if (categorySelectedId === category.id) {
              setCategorySelectedId(undefined);
            } else {
              setCategorySelectedId(category.id);
            }
          }}>
            <View
              key={category.id}
              style={{
                backgroundColor: categorySelectedId === category.id ? '#ff8c00': 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                height: 100,
                marginHorizontal: 10,
                marginTop: 10,
                borderWidth: 0.5,
                borderRadius: 10
              }}>
              <AntDesign name="home" size={30} color={categorySelectedId === category.id ? "#fffaf0": "black"} />
              <ClashGrotesk style={{ fontSize: 20, color: categorySelectedId === category.id ? "#fffaf0": "black" }}>{category.name}</ClashGrotesk>
            </View>
          </Pressable>
        ))}

      </View>
      <Link
        style={{ alignSelf: 'center', marginTop: 30 }}
        href={{
          pathname: '/expenses/create',
          params: categorySelectedId ? { category: categorySelectedId } : undefined
        }}>
        {categorySelectedId === undefined ? (
          <Ionicons name="arrow-back-sharp" size={30} color="#ff4500" />
        ) : (
          <AntDesign name="check" size={30} color="#ff4500" />
        )}
      </Link>
      <StatusBar style="light" />
    </View>
  );
}

const syles = StyleSheet.create({
  categorySelectedContainer: {
    backgroundColor: '#ff8c00'
  }
})