import { Text } from "react-native";
import { Redirect, Stack, router } from "expo-router";

import { useSession } from "@/context/ctx"


export default function AppLayout(){
    const {session, isLoading} = useSession();

    if (isLoading){
        // TODO: put here the SplashScreen
        return <Text>Loading...</Text>
    }

    if (!session){
        return <Redirect href="/auth/login"/>
    }

    return (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
          <Stack.Screen name="expenses" options={{ headerShown: false }} />
          <Stack.Screen name="category"
            options={{
                headerShown: false,
                presentation: 'modal',
                animation: 'fade_from_bottom'
            }} />
        </Stack>
    )
}