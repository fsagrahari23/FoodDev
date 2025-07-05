import { Tabs } from 'expo-router';

export default function TabsLayout() {
    const isAuthenticated = false;

    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name="cart" options={{ title: "Cart" }} />
            <Tabs.Screen name="profile" options={{ title: "Profile" }} />
            <Tabs.Screen name="search" options={{ title: "Search" }} />
        </Tabs>
    );
}
