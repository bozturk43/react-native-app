import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from './context/AuthContext';
import LoginScreen from './screens/auth/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import SignUpScreen from './screens/auth/SignUpScreen';
import SettingScreen from './screens/SettingsScreen';
import InventoryScreen from './screens/InventoryScreen';
import { useFoodCategories } from './services/query-service';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainNavigation = () => {
    const { user } = useAuth();
    const { data: foodCategories, isLoading } = useFoodCategories(user);

    useEffect(() => {
        const fillStorageItem = async () => {
            if (foodCategories) {
                try {
                    // foodCategories'i string'e çevirip AsyncStorage'a kaydediyoruz
                    await AsyncStorage.setItem("foodCategories", JSON.stringify(foodCategories));
                    console.log('Food categories stored in AsyncStorage');
                } catch (error) {
                    console.error('Error saving food categories to AsyncStorage:', error);
                }
            }
        };

        fillStorageItem();
    }, [foodCategories]);

    return (
        <NavigationContainer>
            {user ?
                <Tab.Navigator initialRouteName='Dashboard' screenOptions={{
                    tabBarStyle: { backgroundColor: '#d44e00' },
                    tabBarInactiveTintColor: "#fff",
                    tabBarActiveTintColor: "#FFA9D6"
                }}>
                    <Tab.Screen
                        name="Dashboard"
                        component={DashboardScreen}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="home" color={color} size={size} />
                            ),
                        }} />
                    <Tab.Screen
                        name="Dolabım"
                        component={InventoryScreen}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Dolabım',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="bowl-mix" color={color} size={size} />
                            )

                        }} />
                    <Tab.Screen
                        name="Settings"
                        component={SettingScreen}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Profile',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="account" color={color} size={size} />
                            ),
                        }}
                    />
                </Tab.Navigator>
                :
                <Stack.Navigator initialRouteName='Login'>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            }
        </NavigationContainer>
    )

};

export default MainNavigation;