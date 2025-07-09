import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { images } from "@/constants";
import { Feather } from "@expo/vector-icons";
import {appwriteConfig} from "@/lib/appwrite";

const CartItem = ({ item }: { item: CartItemType }) => {
    const { increaseQty, decreaseQty, removeItem } = useCartStore();
    const imageUrl = `${item.url}?project=${appwriteConfig.projectID}`;
    console.log(imageUrl)

    return (
        <View className="flex-row justify-between items-center bg-white p-4 mb-4 rounded-2xl shadow">
            {/* Left side: Image + Details */}
            <View className="flex-row items-center flex-1">
                <Image
                    source={{ uri:imageUrl }}
                    style={{width:50, height:50}}
                    resizeMode="cover"
                />

                <View className="ml-4 flex-1">
                    <Text className="text-base font-semibold text-gray-900">
                        {item.name}
                    </Text>
                    <Text className="text-sm font-medium text-amber-600 mt-1">
                        ${item.price.toFixed(2)}
                    </Text>

                    {/* Quantity Controls */}
                    <View className="flex-row items-center justify-start mt-3 space-x-4 gap-10">
                        <TouchableOpacity
                            onPress={() => decreaseQty(item.id, item.customizations!)}
                            className="w-8 h-8 bg-amber-50 rounded-full items-center justify-center"
                        >
                            <Feather name="minus" size={20} color="#FF9C01" />
                        </TouchableOpacity>

                        <Text className="text-lg font-bold text-gray-800">
                            {item.quantity}
                        </Text>

                        <TouchableOpacity
                            onPress={() => increaseQty(item.id, item.customizations!)}
                            className="w-8 h-8 bg-amber-50 rounded-full items-center justify-center"
                        >
                            <Feather name="plus" size={20} color="#FF9C01" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Remove Button */}
            <TouchableOpacity
                onPress={() => removeItem(item.id, item.customizations!)}
                className="p-2 ml-4"
            >
                <Feather name="trash-2" size={20} color="#E53E3E" />
            </TouchableOpacity>
        </View>
    );
};

export default CartItem;
