import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from './context/AuthContext';
import LoginScreen from './screens/auth/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import SignUpScreen from './screens/auth/SignUpScreen';
const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    const { user } = useAuth();
    return (
        <NavigationContainer>
            {user ?
                <Stack.Navigator initialRouteName='Dashboard'>
                    <Stack.Screen
                        name="Dashboard"
                        component={DashboardScreen}
                        options={{
                            title: 'My home',
                            headerStyle: {
                                backgroundColor: '#f4511e',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }} />
                </Stack.Navigator>
                :
                <Stack.Navigator initialRouteName='Login'>
                    <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                </Stack.Navigator>
            }
        </NavigationContainer>
    )

};

export default MainNavigation;