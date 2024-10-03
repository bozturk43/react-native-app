import React, { useState } from 'react';
import { View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Text, Box, Center, FormControl, HStack, Input, Pressable, VStack, WarningOutlineIcon, Button, Image, Alert } from 'native-base';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const { user, login } = useAuth();
  const [error, setError] = useState<string | null>(null); // Hata mesajını saklamak için state
  const [email, setEmail] = useState<string>(''); // E-posta state'i
  const [password, setPassword] = useState<string>(''); // Şifre state'i

  const userData = {
    email: email,
    password: password,
  };

  const LogInUser = async () => {
    if (!email || !password) {
      setError("Lütfen e-posta ve şifre alanlarını doldurun."); // Hata mesajını ayarla
      return; // Fonksiyonu sonlandır
    }
    try {
      await login(userData);
      // Başarıyla giriş yaptıktan sonra yapılacak işlemler
    } catch (err:any) {
      setError(err.response?.data?.error); // Hata mesajını state'e kaydet
    }
  };
  var imag = require("../../assests/images/logo-color.png");
  return (
    <HStack bg="#fff" h="full" w="full" alignItems={"center"} _text={{ color: "white" }}>
      <Box w="full">
        <Image w="100%" h="100px" source={imag} alt='Define an alt' marginBottom={12} />
        <VStack w="full" space="4" alignItems="center">
          <FormControl w="75%" maxW="300px">
            <FormControl.Label fontSize={'xs'}>E-Mail</FormControl.Label>
            <Input size={"xs"} h="40px" placeholder="Type your e-mail" rounded={'xl'} onChangeText={setEmail} />
            <FormControl.Label fontSize={'xs'}>Password</FormControl.Label>
            <Input size={"xs"} h="40px" placeholder="Enter password" rounded={'xl'} onChangeText={setPassword} />
            {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Try different from previous passwords.
              </FormControl.ErrorMessage> */}
          </FormControl>
          <Button bg="primary.600" w="60%" size="xs" onPress={() => LogInUser()}>
            Giriş Yap
          </Button>
          {/* {error && <Button bg="primary.600" w="60%" size="xs" onPress={() => LogInUser()}>
            Yanlıs Sifre
          </Button>} */}

          {error && (
            <VStack>
            <Alert status="error" marginTop="2">
              <Alert.Icon />
              <Text fontSize="md" color="coolGray.800">
                {error}
              </Text>
            </Alert>
            </VStack>
          )}

          <VStack alignItems="flex-end" w="100%">
            <Button variant={"link"} size={"xs"} fontSize={"2xs"} onPress={() => navigation.navigate("SignUp")}>
              Henüz bir hesabın yok mu ?
            </Button>
          </VStack>
        </VStack>
      </Box>
    </HStack>
  );
};

export default LoginScreen;