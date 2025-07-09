import {Button, FlatList, Image, Pressable, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {images, offers} from "@/constants";
import {Fragment} from "react";
import cn from 'clsx'

import CartButton from "@/components/CartButton";
import * as Sentry from "@sentry/react-native";
import useAuthStore from "@/store/auth.store";
export default function Home(){
    const {user}= useAuthStore();
    return (
        <SafeAreaView className="flex-1">
           <FlatList
               data={offers}
               renderItem={({item, index})=> {
                   const isEven = index % 2 === 0;
                   return (
                       <View>
                           <Pressable className={cn("offer-card",isEven?'flex-row-reverse':'flex-row')} style={{backgroundColor:item.color}}
                           android_ripple={{color:"#ffffff22"}}>
                               {({pressed})=>(
                                   <Fragment>
                                       <View className={"h-full w-1/2"}>
                                        <Image source={item.image} className={"size-full"} resizeMode={"contain"}/>
                                       </View>
                                       <View className={cn("flex-1 h-full flex flex-col justify-center items-start gap-4",isEven?'pl-10':'pr-10')}>
                                         <Text className="h1-bold text-white leading-tightly">
                                             {item.title}
                                         </Text>
                                           <Text>
                                               <Image source={images.arrowRight} className="size-10" resizeMode={"contain"} tintColor="#ffffff"/>
                                           </Text>
                                       </View>
                                   </Fragment>
                               )}
                           </Pressable>
                       </View>
                   )
               }}
               contentContainerClassName={"pb-28 px-5"}
               ListHeaderComponent={()=>(
                   <View className="flex-between flex-row w-full my-5 px-5">
                   <View className="flex-start">
                   <Text className={"small-bold text-primary"}>Deliver To</Text>
            <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                <Text className=" paragraph-bold ">India</Text>
                <Image source={images.arrowDown} className="size-3" resizeMode={"contain"}/>
            </TouchableOpacity>

               </View>
           <CartButton/>
               </View>
                   )}

           />
        </SafeAreaView>
    )
}