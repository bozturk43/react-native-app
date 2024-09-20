import React from 'react';
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainNavigation = () => {
    const { user } = useAuth();
    return (
        <NavigationContainer>
            {user ?
                <Tab.Navigator initialRouteName='Dashboard' screenOptions={{
                    tabBarStyle:{backgroundColor:'#d44e00'},
                    tabBarInactiveTintColor:"#fff",
                    tabBarActiveTintColor:"#FFA9D6"
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