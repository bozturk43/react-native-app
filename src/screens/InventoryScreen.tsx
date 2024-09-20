import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

const InventoryScreen = () => {
  const { user } = useAuth();

  return (
    <View>
      <Text>Inventory Screen</Text>
      <Text>Dolap Malzemeleri</Text>
      <Text>{user?.username}</Text>
    </View>
  );
};

export default InventoryScreen;