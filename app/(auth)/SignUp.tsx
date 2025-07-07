import {Alert, Button, Text, View} from "react-native";
import {Link, Redirect, router} from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import {createUser} from "@/lib/appwrite";

const SignUp = () => {
    const isAuthenticated = false; // Replace this later with actual auth logic

    const [form, setForm] = useState({name:'',email:'',password:''})
    const [isSubmitting, setSubmitting] = useState(false);
    const submit = async (event:Event) => {
        event.preventDefault();
        if(!form.name||!form.email || !form.password) {
            return  Alert.alert("Please enter valid username , email address and password");
        }
        setSubmitting(true);
        try{
            // call appwrite sign up
            await createUser({name:form.name, email:form.email, password:form.password})

            Alert.alert('Success','User registered successfully');
            router.replace("/(tabs)");
            setSubmitting(false);
            setForm({name:'',email:'',password:''})

        }catch (error) {
            Alert.alert(error.message);
            setSubmitting(false);
            setForm({name:'',email:'',password:''})

        }

    }

    if (isAuthenticated) return <Redirect href="/(tabs)" />;

    return (
        <View className="flex-1 justify-center items-center p-5 mt-5 gap-10">
            <Text className="text-2xl font-bold mb-4">Sign Up</Text>
            <CustomInput
                placeholder="Enter your email"
                value={form.name}
                onChangeText={(text)=>setForm((prev)=>({...prev, name: text}))}
                label="Username"
                keyboardType={"default"}
            />
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
                title="Sign Up"
                onPress={submit}
                isLoading={isSubmitting}
            />

            <View className="flex-row justify-center gap-5 mt-5">
                <Text className="base-regular text-gray-100">
                    Already have an account?
                </Text>
                <Link href={"/Login"} className="base-bold text-primary">
                    Login
                </Link>
            </View>


        </View>
    );
};

export default SignUp;
