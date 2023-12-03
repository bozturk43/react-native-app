import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Box, Center, FormControl, HStack, Input, Pressable, VStack, WarningOutlineIcon,Button, Image } from 'native-base';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const { user, login } = useAuth();

  const userData = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
  };

  function LogInUser() {
    console.log("METHOD CALISTI");
    login(userData);
  }
  var imag = require("../../assests/images/logo-color.png");
  return (
    <HStack bg="#fff" h="full" w="full" alignItems={"center"} _text={{ color: "white" }}>
      <Box w="full">
        <Image w="100%" h="100px" source={imag} alt='Define an alt' marginBottom={12}/>
        <VStack w="full" space="4" alignItems="center">
          <FormControl w="75%" maxW="300px">
            <FormControl.Label fontSize={'xs'}>E-Mail</FormControl.Label>
            <Input size={"xs"} h="40px" placeholder="Type your e-mail" rounded={'xl'} />
            <FormControl.Label fontSize={'xs'}>Password</FormControl.Label>
            <Input size={"xs"} h="40px" placeholder="Enter password" rounded={'xl'} />
            {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Try different from previous passwords.
              </FormControl.ErrorMessage> */}
          </FormControl>
          <Button bg="primary.600" w="60%" size="xs" onPress={() => LogInUser()}>
            Giriş Yap
          </Button>
          <VStack alignItems="flex-end" w="100%">
            <Button variant={"link"} size={"xs"} fontSize={"2xs"} onPress={()=>navigation.navigate("SignUp")}>
              Henüz bir hesabın yok mu ?
            </Button>
          </VStack>
        </VStack>
      </Box>
    </HStack>
  );
};

export default LoginScreen;