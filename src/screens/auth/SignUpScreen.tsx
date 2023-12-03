import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const SignUpScreen = ({navigation}:{navigation:any}) => {
  return (
    <View>
      <Text>Sign Up Screen</Text>
      <Button title="Geri Dön" onPress={()=>navigation.goBack()} />
    </View>
  );
};

export default SignUpScreen;