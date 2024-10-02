import React from 'react';
import { Text, View } from 'react-native';
import { useAuth, User } from '../context/AuthContext';
import { Avatar, Button, HStack, Pressable, VStack } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import { useMutation } from '@tanstack/react-query';
import { uploadUserProphilePhoto } from '../services/user-service';
import { HttpServiceReturnObject } from '../types/ObjectTypes';
const SettingScreen = () => {
  const { user, logout,updateUser } = useAuth();
  function LogOutUser() {
    logout();
  }
  const { mutate: uploadProfilePhoto } = useMutation({
    mutationFn: (base64Image: string) => uploadUserProphilePhoto(user as User, base64Image),
    onSuccess: (data) => {
      console.log('API Response:', data.data);
      if (user) {
        updateUser({
          ...user, // mevcut kullanıcıyı koru
          img_url: data.data.url, // sadece img_url'yi güncelle
        });
      }
    },
    onError: (error) => {
      console.log('Hata', 'Resim yüklenirken bir hata oluştu: ' + error.message);
    },
  });
  const pickImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      includeBase64: true, // Base64 formatında almak için
      cropping: true, // Otomatik kesme işlemi yapılmasın

    }).then(image => {
      // Burada seçilen resim ile ilgili işlemleri yapın
      if (image.data) {
        const base64Image = `data:image/jpeg;base64,${image.data}`;
        uploadProfilePhoto(base64Image);
      }
      // Örneğin: Resmi Firebase'e yükleme işlemi yapılabilir
    }).catch(error => {
      console.log('Error picking image: ', error);
    });
  };
  return (

    <View>
      {user && (
        <>
          <VStack alignItems={"center"}>
            <HStack justifyContent={"center"} alignItems={"center"} padding={2}>
              <Pressable
                onPress={() => pickImage()}
              >
                <Avatar
                  w={150}
                  h={150}
                  bg="green.500"
                  source={{
                    uri: user.img_url === "https://avatar.iran.liara.run/public" ? "" : user.img_url
                  }}
                />
              </Pressable>
            </HStack>
            <Text>{user?.username}</Text>
            <Text>{user?.email}</Text>
            <Button bg="primary.600" w="60%" size="xs" onPress={() => LogOutUser()}>
              Çıkış Yap
            </Button>
          </VStack>

        </>
      )}

    </View>
  );
};

export default SettingScreen;