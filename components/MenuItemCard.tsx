import {Text, View, TouchableOpacity, Image, Platform} from "react-native";
import {MenuItem} from "@/type";
import {appwriteConfig} from "@/lib/appwrite";
import {useCartStore} from "@/store/cart.store";

const MenuItemCard = ({item:{$id,url,name,price}}:{item:MenuItem})=>{
    const imageurl = `${url}?project=${appwriteConfig.projectID}`;
    const {addItem} = useCartStore();

    return (
        <TouchableOpacity
            className='flex justify-center items-center bg-white rounded-md'
            style={Platform.OS==='android'?{elevation:10,shadowColor:'#878787',paddingTop:20,paddingBottom:10,paddingHorizontal:10, borderRadius:10}:{}}
            >
            <Image
                source={{ uri: imageurl }}
                className="-top-10"
                style={{ width: 150, height: 100}}
                resizeMode='contain'
            />
            <Text className="text-center base-bold text-dark-100 mb-2">{name}</Text>
            <Text className='body-regular text-gray-200 mb-4'>From ${price}</Text>
            <TouchableOpacity onPress={()=>addItem({id:$id,name,url:url,price})}>
                <Text className='paragraph-bold text-primary'>
                    Add to Cart +
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
export default MenuItemCard;