import {Redirect, Tabs} from 'expo-router';
import useAuthStore from "@/store/auth.store";

export default function TabsLayout() {
    const {isAuthenticated}= useAuthStore();

    if(!isAuthenticated) {
        return  <Redirect to="/Login" />;
    }
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name="cart" options={{ title: "Cart" }} />
            <Tabs.Screen name="profile" options={{ title: "Profile" }} />
            <Tabs.Screen name="search" options={{ title: "Search" }} />
        </Tabs>
    );
}
