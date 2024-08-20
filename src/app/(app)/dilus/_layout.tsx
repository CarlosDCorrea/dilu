import { Stack } from "expo-router";


export default function DilusLayout(){
    return (
        <Stack>
          <Stack.Screen name="create" options={{ title: 'Dilus'}} />
        </Stack>
    )
}