import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Slot } from 'expo-router';

import { SafeAreaView } from "react-native-safe-area-context";

import { SessionProvider } from "@/context/ctx";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Montserrat: require('@/fonts/Montserrat-Regular.ttf'),
    MontserratExtraLight: require('@/fonts/Montserrat-ExtraLight.ttf'),
    MontserratLight: require('@/fonts/Montserrat-Medium.ttf'),
    MontserratBold: require('@/fonts/Montserrat-Bold.ttf'),
    MontserratSemibold: require('@/fonts/Montserrat-SemiBold.ttf'),
    MontserratSemiBoldItalic: require('@/fonts/Montserrat-SemiBoldItalic.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  console.log('RootLayout')

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{flex: 1}}>
        <SessionProvider>
          <Slot />
        </SessionProvider>
      </SafeAreaView>
    </ThemeProvider>
  );
}
