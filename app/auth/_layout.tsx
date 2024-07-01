import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";


export default function AuthLayout(){
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_bottom'
            }}>
          <Stack.Screen name="login" options={{animation: 'slide_from_right'}} />
          <Stack.Screen name="sign-up" options={{animation: 'slide_from_left'}}/>
        </Stack>
    )
}