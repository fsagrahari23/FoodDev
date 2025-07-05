import {Text, View} from "react-native";
import {Redirect, Slot} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Layout (){

    return (
        <SafeAreaView>
            <Text>Auth Layout</Text>
                <Slot/>
        </SafeAreaView>
    )
}