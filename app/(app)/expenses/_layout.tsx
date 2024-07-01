import { Text } from "react-native";
import { Redirect, Stack, router } from "expo-router";

import { useSession } from "context/ctx"


export default function ExpensesLayout(){
    return (
        <Stack>
          <Stack.Screen name="create" options={{ headerShown: false}} />
        </Stack>
    )
}