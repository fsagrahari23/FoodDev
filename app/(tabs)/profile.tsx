import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
    Pressable,
    RefreshControl,
    Dimensions,
    Platform,
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import useAuthStore from "@/store/auth.store";
import CustomHeader from "@/components/CustomHeader";

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
    const { user, logout, updateProfile } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        addressHome: user?.addressHome || '',
        addressWork: user?.addressWork || '',
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^[+]?[1-9]?[0-9]{7,15}$/;
        return phoneRegex.test(phone);
    };

    const handleUpdateProfile = async () => {
        if (!editedData.name.trim()) {
            Alert.alert('Error', 'Name is required');
            return;
        }

        if (!validateEmail(editedData.email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        if (editedData.phone && !validatePhone(editedData.phone)) {
            Alert.alert('Error', 'Please enter a valid phone number');
            return;
        }

        setIsLoading(true);
        try {
            await updateProfile(editedData);
            setEditMode(false);
            if (Platform.OS === 'ios') {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
            Alert.alert('Success', 'Profile updated successfully!');
        } catch (error) {
            console.error('Profile update error:', error);
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permission denied', 'You need to grant permission to access your photos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            try {
                // Update avatar in store
                await updateProfile({ avatar: result.assets[0].uri });
                if (Platform.OS === 'ios') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to update avatar');
            }
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        setIsLoading(true);
                        try {
                            await logout();
                            if (Platform.OS === 'ios') {
                                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                            }
                            router.replace('/Login');
                        } catch (error) {
                            console.error('Logout error:', error);
                            Alert.alert('Error', 'Failed to logout. Please try again.');
                        } finally {
                            setIsLoading(false);
                        }
                    }
                }
            ]
        );
    };

    const onRefresh = async () => {
        setIsRefreshing(true);
        try {
            // Simulate refresh - replace with actual refresh logic
            await new Promise(resolve => setTimeout(resolve, 1000));
            // You can add logic to refresh user data here
        } finally {
            setIsRefreshing(false);
        }
    };

    const resetEditMode = () => {
        setEditedData({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            addressHome: user?.addressHome || '',
            addressWork: user?.addressWork || '',
        });
        setEditMode(false);
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 p-5 h-full">


            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                <CustomHeader title="Profile" />
                {/* Profile Header with Gradient */}
                <Animated.View entering={FadeInUp.delay(200)}>
                    <LinearGradient
                        colors={['#667eea', '#764ba2']}
                        style={{ paddingBottom: 40, paddingTop: 20 }}
                    >
                        <View className="items-center">
                            {/* Avatar with loading state */}
                            <View className="relative mb-4">
                                <Image
                                    source={{
                                        uri: user?.avatar || 'https://via.placeholder.com/150?text=Avatar'
                                    }}
                                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                                    onError={() => {
                                        console.log('Avatar failed to load');
                                    }}
                                />
                                <Pressable
                                    onPress={handleImagePicker}
                                    className="absolute bottom-0 right-0 bg-amber-500 p-2 rounded-full border-2 border-white shadow-md"
                                    android_ripple={{ color: '#fbbf24' }}
                                >
                                    <Feather name="camera" size={14} color="white" />
                                </Pressable>
                            </View>

                            <Text className="text-white text-xl font-bold mb-1">
                                {user?.name || 'User Name'}
                            </Text>
                            <Text className="text-white/80 text-sm">
                                {user?.email || 'user@example.com'}
                            </Text>
                        </View>
                    </LinearGradient>
                </Animated.View>

                <View className="px-6 -mt-6">
                    {/* Profile Information Card */}
                    <Animated.View entering={FadeInDown.delay(300)}>
                        <View className="bg-white rounded-xl shadow-md p-6 mb-6">
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-lg font-semibold text-gray-800">
                                    Profile Information
                                </Text>
                                <TouchableOpacity
                                    onPress={() => editMode ? resetEditMode() : setEditMode(true)}
                                    className="p-2"
                                >
                                    <Feather
                                        name={editMode ? "x" : "edit-2"}
                                        size={18}
                                        color="#667eea"
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Profile Fields */}
                            <View className="space-y-4">
                                <EditableInfoItem
                                    icon="person"
                                    label="Full Name"
                                    value={editMode ? editedData.name : user?.name || ''}
                                    editable={editMode}
                                    onChangeText={(text) => setEditedData({...editedData, name: text})}
                                    required
                                />

                                <EditableInfoItem
                                    icon="email"
                                    label="Email"
                                    value={editMode ? editedData.email : user?.email || ''}
                                    editable={editMode}
                                    onChangeText={(text) => setEditedData({...editedData, email: text})}
                                    keyboardType="email-address"
                                    required
                                />

                                <EditableInfoItem
                                    icon="phone"
                                    label="Phone Number"
                                    value={editMode ? editedData.phone : user?.phone || ''}
                                    editable={editMode}
                                    onChangeText={(text) => setEditedData({...editedData, phone: text})}
                                    keyboardType="phone-pad"
                                    placeholder="Enter phone number"
                                />

                                <EditableInfoItem
                                    icon="home"
                                    label="Home Address"
                                    value={editMode ? editedData.addressHome : user?.addressHome || ''}
                                    editable={editMode}
                                    onChangeText={(text) => setEditedData({...editedData, addressHome: text})}
                                    multiline
                                    placeholder="Enter home address"
                                />

                                <EditableInfoItem
                                    icon="work"
                                    label="Work Address"
                                    value={editMode ? editedData.addressWork : user?.addressWork || ''}
                                    editable={editMode}
                                    onChangeText={(text) => setEditedData({...editedData, addressWork: text})}
                                    multiline
                                    placeholder="Enter work address"
                                />
                            </View>
                        </View>
                    </Animated.View>

                    {/* Action Buttons */}
                    <Animated.View entering={FadeInDown.delay(400)}>
                        <View className="space-y-5 mb-20 ">
                            {editMode ? (
                                <View className="flex-row space-x-3 gap-5">
                                    <TouchableOpacity
                                        onPress={resetEditMode}
                                        className="flex-1 bg-gray-100 py-4 rounded-xl items-center"
                                        disabled={isLoading}
                                    >
                                        <Text className="text-gray-600 font-medium">Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={handleUpdateProfile}
                                        className="flex-1 bg-green-500 py-4 rounded-xl items-center flex-row justify-center space-x-2"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <ActivityIndicator color="white" size="small" />
                                        ) : (
                                            <>
                                                <Feather name="save" size={18} color="white" />
                                                <Text className="text-white font-medium">Save</Text>
                                            </>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <>
                                    <TouchableOpacity
                                        onPress={() => router.push('/Settings')}
                                        className="bg-blue-50 py-4 rounded-xl items-center flex-row justify-center space-x-2 mb-2"
                                    >
                                        <Feather name="settings" size={18} color="#3b82f6" />
                                        <Text className="text-blue-600 font-medium">Settings</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={handleLogout}
                                        className="bg-red-50 py-4 rounded-xl items-center flex-row justify-center space-x-2"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <ActivityIndicator color="#ef4444" size="small" />
                                        ) : (
                                            <>
                                                <Feather name="log-out" size={18} color="#ef4444" />
                                                <Text className="text-red-500 font-medium">Logout</Text>
                                            </>
                                        )}
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </Animated.View>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

const EditableInfoItem = ({
                              icon,
                              label,
                              value,
                              editable,
                              onChangeText,
                              keyboardType = 'default',
                              multiline = false,
                              placeholder,
                              required = false
                          }: {
    icon: string;
    label: string;
    value: string;
    editable: boolean;
    onChangeText?: (text: string) => void;
    keyboardType?: 'default' | 'email-address' | 'phone-pad';
    multiline?: boolean;
    placeholder?: string;
    required?: boolean;
}) => (
    <View>
        <View className="flex-row items-center mb-2">
            <Text className="text-sm text-gray-600 font-medium">{label}</Text>
            {required && <Text className="text-red-500 ml-1">*</Text>}
        </View>

        <View className="flex-row items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
            <MaterialIcons name={icon as any} size={20} color="#667eea" />

            {editable ? (
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder || `Enter ${label.toLowerCase()}`}
                    className="flex-1 ml-3 text-gray-800"
                    keyboardType={keyboardType}
                    multiline={multiline}
                    numberOfLines={multiline ? 2 : 1}
                    style={{ minHeight: multiline ? 40 : 20 }}
                />
            ) : (
                <Text className="flex-1 ml-3 text-gray-800">
                    {value || `No ${label.toLowerCase()} provided`}
                </Text>
            )}
        </View>
    </View>
);

export default ProfileScreen;