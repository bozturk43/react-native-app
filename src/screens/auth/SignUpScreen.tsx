import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import SignUpForm from '../../components/SignUp/SignUpForm';
import ConfirmEmail from '../../components/SignUp/ConfirmEMail';

const SignUpScreen = ({navigation}:{navigation:any}) => {
  const [activeComponent,setActiveComponent] = useState<React.ReactNode>(<SignUpForm navigation={navigation} handleActiveComponent={()=>handleActiveComponent()}/>)
  const handleActiveComponent = () =>{
    setActiveComponent(<ConfirmEmail navigation={navigation}/>)
  } 
  return (
    <View>
      {activeComponent}
      <Button title="Geri Dön" onPress={()=>navigation.goBack()} />
    </View>
  );
};

export default SignUpScreen;