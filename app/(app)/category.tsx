import { useState, useEffect } from "react";
import { View, Pressable, StyleSheet } from 'react-native';

import { Link, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { AntDesign, Ionicons } from '@expo/vector-icons';

import { ClashGroteskBold, ClashGrotesk } from 'components/text/StyledText';
import { serverUrl } from 'constants/server'


type category = {
  category_id: string,
  name: string,
  icon: keyof typeof AntDesign.glyphMap
};


function listCategories(setCategories: any): void {
  let queryParams = {

  }

  fetch(`${serverUrl}/category/list`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
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
    .then(data => {
      setCategories(data);
    })
    .catch(error => {
      console.log(error);
    });
}

export default function CategorySelect() {
  const [categories, setCategories] = useState<category[]>();
  const [categorySelectedId, setCategorySelectedId] = useState<string | undefined>();
  const { categorySelectedIdParam } = useLocalSearchParams<{ categorySelectedIdParam: string }>();

  useEffect(() => {
    console.log('being called');
    listCategories(setCategories);
    setCategorySelectedId(categorySelectedIdParam);
    if (categories) {
      console.log(categories.length);
    }
    console.log(`categorySelected ${categorySelectedId}`)
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <ClashGroteskBold style={{ fontSize: 30, color: '#8b4513' }}>Seleccionar una categoria</ClashGroteskBold>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
        {categories && categories.map((category) => (
          <Pressable onPress={(_) => {
            if (categorySelectedId === category.category_id) {
              setCategorySelectedId(undefined);
            } else {
              setCategorySelectedId(category.category_id);
            }
          }}>
            <View
              key={category.category_id}
              style={{
                backgroundColor: categorySelectedId === category.category_id ? '#ff8c00' : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                height: 100,
                marginHorizontal: 10,
                marginTop: 10,
                borderWidth: 0.5,
                borderRadius: 10
              }}>
              <AntDesign name={category.icon} size={30} color={categorySelectedId === category.category_id ? "#fffaf0" : "black"} />
              <ClashGrotesk style={{ fontSize: 20, color: categorySelectedId === category.category_id ? "#fffaf0" : "black" }}>{category.name}</ClashGrotesk>
            </View>
          </Pressable>
        ))}

      </View>
      <Link
        style={{ alignSelf: 'center', marginTop: 30 }}
        href={{
          pathname: '/expenses/create',
          params: categorySelectedId ? { categorySelectedIdParam: categorySelectedId } : undefined
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