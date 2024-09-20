import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Button } from 'native-base';
import { logout } from '../services/user-service';

const SettingScreen = () => {
  const { user,logout } = useAuth();
  function LogOutUser() {
    logout();
  }

  return (
    <View>
      <Text>Settings Screen</Text>
      <Text>{user?.username}</Text>
      <Button bg="primary.600" w="60%" size="xs" onPress={() => LogOutUser()}>
            Giriş Yap
          </Button>
    </View>
  );
};

export default SettingScreen;