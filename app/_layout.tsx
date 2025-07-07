// app/_layout.tsx
import {SplashScreen, Stack} from "expo-router";
import './global.css'
import {useFonts} from "expo-font";
import {useEffect} from "react";
import * as Sentry from '@sentry/react-native';
import useAuthStore from "@/store/auth.store";

Sentry.init({
  dsn: 'https://49f7fa49bf8fec7cd2c3bd9e2ae7e9df@o4509622940598272.ingest.de.sentry.io/4509628785229904',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
    const {isLoading,fetchAuthUser}= useAuthStore();


    const [fontsLoaded,error] = useFonts({
        "Quicksand-Bold":require('../assets/fonts/Quicksand-Bold.ttf'),
        "Quicksand-Medium":require('../assets/fonts/Quicksand-Medium.ttf'),
        "Quicksand-Regular":require('../assets/fonts/Quicksand-Regular.ttf'),
        "Quicksand-SemiBold":require('../assets/fonts/Quicksand-SemiBold.ttf'),
        "Quicksand-Light":require('../assets/fonts/Quicksand-Light.ttf'),
    });
    useEffect(() => {
        fetchAuthUser();
    }, []);

    useEffect(()=>{
        if(error) throw error;
        if(fontsLoaded) SplashScreen.hideAsync();
    },[fontsLoaded,error]);
    if(!fontsLoaded||isLoading){
        return null;
    }
    return <Stack screenOptions={{headerShown:false}} />;
});