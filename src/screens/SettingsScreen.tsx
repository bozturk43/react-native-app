import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

const SettingScreen = () => {
  const { user } = useAuth();

  return (
    <View>
      <Text>Settings Screen</Text>
      <Text>{user?.username}</Text>
    </View>
  );
};

export default SettingScreen;