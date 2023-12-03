import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

const DashboardScreen = () => {
  const { user,logout } = useAuth();

  return (
    <View>
      <Text>Dashboard Screen</Text>
      <Text>{user?.token}</Text>
      <Button title="Çıkış Yap" onPress={()=>logout()} />
    </View>
  );
};

export default DashboardScreen;