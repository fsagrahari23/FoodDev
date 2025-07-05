import {Button, Text, View} from "react-native";
import {Redirect, router} from "expo-router";


const Login = ()=>{
    const isAuthenticated = false;
    if(isAuthenticated) return <Redirect href="/(tabs)"/>
    return(
        <View>
            <Text>
                Login
            </Text>
            <Button title="Sign Up" onPress={()=>router.push("/SignUp")}/>
        </View>
    )
}
export default Login;