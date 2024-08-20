import { Stack } from "expo-router";


export default function ExpensesLayout(){
    return (
        <Stack>
          <Stack.Screen name="create" options={{ headerShown: false}} />
          <Stack.Screen name="update/[id]" options={{ headerShown: false}} />
          <Stack.Screen name="delete/[id]" options={{ headerShown: false}} />
        </Stack>
    )
}