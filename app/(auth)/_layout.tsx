import {Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, View} from "react-native";
import {Redirect, Slot} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "@/constants";
import {useState} from "react";
import useAuthStore from "@/store/auth.store";


export default function Layout (){
    const {isAuthenticated} =useAuthStore() // Replace this later with actual auth logic
    if (isAuthenticated) return <Redirect href="/(tabs)/home" />;
    return (
       <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'}>
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps='handled'>
                <View className="w-full relative" style={{height:Dimensions.get('screen').height / 2.25}}>
                  <ImageBackground source={images.loginGraphic} className="size-full roduned-b" resizeMode="stretch" />
                    <Image source={images.logo} className="self-center size-48 absolute -bottom-10" resizeMode="stretch" />
                </View>

                <Slot/>
            </ScrollView>
       </KeyboardAvoidingView>
    )
}