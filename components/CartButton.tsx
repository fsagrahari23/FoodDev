import {Image, Text, TouchableOpacity, View} from "react-native";
import {images} from "@/constants";


const CartButton = ()=>{
    const totolItem =  10;
    return (
        <TouchableOpacity className="cart-btn"  onPress={()=>{}}>
            <Image source={images.bag} className={"size-5"} resizeMode="cover" />
            {
                totolItem > 0 && (
                    <View className="cart-badge">
                        <Text className="small-bold text-white">{totolItem}</Text>
                    </View>
                )
            }
        </TouchableOpacity>


    )
}

export default  CartButton;