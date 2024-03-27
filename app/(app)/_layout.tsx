import { Text } from "react-native";
import { Redirect, Stack, router } from "expo-router";

import { useSession } from "../../context/ctx"


export default function AppLayout(){
    const {session, isLoading} = useSession();

    console.log('AppLayout');
    if (isLoading){
        // TODO: put here the SplashScreen
        return <Text>Loading...</Text>
    }

    console.log(`session App Layout ${session}`);

    if (!session){
        return <Redirect href="/auth/login"/>
    }

    return (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        </Stack>
    )
}