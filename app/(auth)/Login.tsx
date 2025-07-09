import {Alert, Button, Text, View} from "react-native";
import {Link, Redirect, router} from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import * as Sentry from '@sentry/react-native'
import {signIn} from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
const Login = () => {

    const [form, setForm] = useState({email:'',password:''})
    const [isSubmitting, setSubmitting] = useState(false);
    const {fetchAuthUser} = useAuthStore()
    const submit = async (event:Event) => {
        event.preventDefault();
        if(!form.email || !form.password) {
          return  Alert.alert("Please enter valid email address and password");
        }
        setSubmitting(true);
        try{
        // call appwrite sign in fun
            await signIn({email:form.email, password:form.password})
            await fetchAuthUser();
            Alert.alert('Success','User signed in successfully');
           router.push("/(tabs)/home");
        }catch (error) {
            Alert.alert('Error',error.message);
            Sentry.captureEvent(error);

        }finally {
            setSubmitting(false);
            setForm({email:'',password:''});
        }
    }


    return (
        <View className="flex-1 justify-center items-center p-5 mt-5 gap-10">
            <Text className="text-2xl font-bold mb-4">Login</Text>
            <CustomInput
                placeholder="Enter your email"
                value={form.email}
                onChangeText={(text)=>setForm((prev)=>({...prev, email: text}))}
                label="Email"
                keyboardType="email-address"
            />

            <CustomInput
                placeholder="Enter your password"
                value={form.password}
                onChangeText={(text)=>setForm((prev)=>({...prev, password: text}))}
                label="Password"
                secureTextEntry={true}
            />

            <CustomButton
                title="Login"
                onPress={submit}
                isLoading={isSubmitting}
            />

            <View className="flex-row justify-center gap-5 mt-5">
                <Text className="base-regular text-gray-100">
                    Don't have an account
                </Text>
                <Link href={"/SignUp"} className="base-bold text-primary">
                    SignUp
                </Link>
            </View>


        </View>
    );
};

export default Login;
