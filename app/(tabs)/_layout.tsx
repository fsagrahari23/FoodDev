import {Redirect, Tabs} from 'expo-router';
import useAuthStore from "@/store/auth.store";
import {TabBarIconProps} from "@/type";
import {Image, Text, View} from "react-native";
import {images} from "@/constants";
import cn from "clsx";

const TabBarIcon = ({focused,icon,title}:TabBarIconProps)=>{
    return (
        <View className="tab-icon">
            <Image source={icon} className="size-7" resizeMode='contain' tintColor={focused?'#FE8C00':'#5D5F6D'}/>
            <Text className={cn('text-sm font-bold',focused?'text-primary':'text-gray-200')}>
                {title}
            </Text>
        </View>
    )
}

export default function TabsLayout() {
    const {isAuthenticated}= useAuthStore();

    if(!isAuthenticated) {
        return  <Redirect href="/Login" />;
    }
    return (
        <Tabs
            screenOptions={{
                headerShown: false ,
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopLeftRadius:50,
                    borderTopRightRadius:50,
                    borderBottomLeftRadius:50,
                    borderBottomRightRadius:50,

                    marginHorizontal:20,
                    height:80,
                    position:'absolute',
                    bottom: 40,
                    backgroundColor:'white',
                    shadowColor:'#lalalala',
                    shadowOffset:{width:0,height:2},
                    shadowOpacity:0.1,
                    shadowRadius:4,
                    elevation:5

                }
            }}
        >
            <Tabs.Screen name="home" options={{
                title: "Home",
                tabBarIcon:({focused})=><TabBarIcon icon={images.home} title={'Home'} focused={focused}/>}} />
            <Tabs.Screen name="cart" options={{
                title: "Cart",
                tabBarIcon:({focused})=><TabBarIcon icon={images.bag} title={'Cart'} focused={focused}/>
            }} />
            <Tabs.Screen name="profile" options={{
                title: "Profile",
                tabBarIcon:({focused})=><TabBarIcon icon={images.user} title={'Profile'} focused={focused}/>}} />

            <Tabs.Screen name="search" options={{
                title: "Search",
                tabBarIcon:({focused})=><TabBarIcon icon={images.search} title={'Search'} focused={focused}/>}} />
        </Tabs>
    );
}
