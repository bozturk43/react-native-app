import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import SignUpForm from '../../components/SignUp/SignUpForm';

const SignUpScreen = ({navigation}:{navigation:any}) => {
  return (
    <View>
      <SignUpForm navigation={navigation}/>
      <Button title="Geri Dön" onPress={()=>navigation.goBack()} />
    </View>
  );
};

export default SignUpScreen;