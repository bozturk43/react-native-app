import React, { useState } from 'react';
import { Box, Center, FormControl, HStack, Input, VStack, Button, Image, Text, Heading } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { SignUpFormData } from '../../types/UserTypes';
import { signUpFromService } from '../../services/user-service';
import { useMutation } from '@tanstack/react-query';

const SignUpForm = ({ navigation, handleActiveComponent }: { navigation: any, handleActiveComponent: () => void }) => {
    const { control, handleSubmit, formState: { errors }, setError } = useForm<SignUpFormData>();
    const [signUpError,setSignUpError] = useState<string>();

    const { mutate: signUpUser } = useMutation({
        mutationFn: (signUpData: SignUpFormData) => signUpFromService(signUpData),
        onSuccess: (data) => {
          console.log('API Response:', data.data);
          handleActiveComponent();
        },
        onError: (error) => {
          console.error('Hata', 'Kayıt Sırasında Bir Hata Oluştu: ' + error.message);
          setSignUpError(error.message);
        },
      });

    const onSubmit = (data: SignUpFormData) => {
        if (data.password.length < 6) {
            setError('password', {
                type: 'manual',
                message: 'Şifre en az 6 karakter olmalıdır',
            });
            return; // Fonksiyonu sonlandır
        }
        // Şifreler eşleşmiyorsa hata mesajı göster
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', {
                type: 'manual',
                message: 'Şifreler Eşleşmiyor',
            });
            return; // Fonksiyonu sonlandır
        }
        signUpUser(data);
    }

    var imag = require("../../assests/images/signinPageImage.jpg");

    return (
        <HStack bg="#fff" h="full" w="full" alignItems={"center"} _text={{ color: "white" }}>
            <Image w="100%" h="100px" source={imag} alt='Define an alt' style={{ position: "absolute", top: 0 }} />
            <Center w="full">
                <Heading paddingX={"12px"} marginBottom={"24px"}>
                    Don't think about it every day just
                    <Text color={"brand.800"}> Sign Up</Text>
                </Heading>
                <FormControl w="75%" maxW="300px">
                    <FormControl.Label fontSize={'xs'}>User Name</FormControl.Label>
                    <Controller
                        control={control}
                        name="username"
                        rules={{ required: 'Username is required' }}
                        render={({ field }) => (
                            <Input
                                size="xs"
                                h="40px"
                                placeholder="Type your username"
                                rounded="xl"
                                onChangeText={(value) => field.onChange(value)}
                                value={field.value}
                            />
                        )}
                    />
                    {errors.username && <Text color="red.500">{errors.username.message}</Text>}

                    <FormControl.Label fontSize={'xs'}>E-Mail</FormControl.Label>
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <Input
                                size="xs"
                                h="40px"
                                placeholder="Type your email"
                                rounded="xl"
                                onChangeText={(value) => field.onChange(value)}
                                value={field.value}
                            />
                        )}
                        name="email"
                        rules={{ required: 'Email is required' }}
                    />
                    {errors.email && <Text color="red.500">{errors.email.message}</Text>}

                    <FormControl.Label fontSize={'xs'}>Password</FormControl.Label>
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <Input
                                size="xs"
                                h="40px"
                                placeholder="Type your password"
                                rounded="xl"
                                onChangeText={(value) => field.onChange(value)}
                                value={field.value}
                            />
                        )}
                        name="password"
                        rules={{ required: 'Password is required' }}
                    />
                    {errors.password && <Text color="red.500">{errors.password.message}</Text>}
                    
                    <FormControl.Label fontSize={'xs'}>Confirm Password</FormControl.Label>
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <Input
                                size="xs"
                                h="40px"
                                placeholder="Retype your password"
                                rounded="xl"
                                onChangeText={(value) => field.onChange(value)}
                                value={field.value}
                            />
                        )}
                        name="confirmPassword"
                        rules={{ required: 'Confirm Password is required' }}
                    />
                    {/* Password mismatch error */}
                    {errors.confirmPassword && <Text color="red.500">{errors.confirmPassword.message}</Text>}

                    <VStack alignItems="center" w="100%" marginTop={"12px"}>
                        <Button bg="primary.600" w="60%" size="xs" onPress={handleSubmit(onSubmit)}>
                            Kayıt Ol
                        </Button>
                    </VStack>
                </FormControl>
                {signUpError && <Text color="red.500">{signUpError}</Text>}
            </Center>
        </HStack>
    );
};

export default SignUpForm;
