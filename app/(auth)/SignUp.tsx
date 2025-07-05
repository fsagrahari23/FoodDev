import {Button, Text, View} from "react-native";
import {router} from "expo-router";


const SignUp = ()=>{
    return(
        <View>
            <Text>
                Sign Up
            </Text>
            <Button title="Sign In" onPress={()=>router.push("/Login")}/>
        </View>
    )
}

export default SignUp;