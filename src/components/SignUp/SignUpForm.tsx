import React from 'react';
import { Box, Center, FormControl, HStack, Input, Pressable, VStack, WarningOutlineIcon, Button, Image, Text, Heading, Container } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { SignUpFormData } from '../../types/UserTypes';

const SignUpForm = ({ navigation }: { navigation: any }) => {

    const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();
    const onSubmit = (data: SignUpFormData) => {
        console.log("Veriler", data);
    }
    var imag = require("../../assests/images/signinPageImage.jpg");
    return (
        <HStack bg="#fff" h="full" w="full" alignItems={"center"} _text={{ color: "white" }}>
                        <Image w="100%" h="100px" source={imag} alt='Define an alt' style={{position:"absolute",top:0}}/>

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
                        rules={{ required: 'Username is required' }} // Add validation rules if needed
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
                    <VStack alignItems="center" w="100%" marginTop={"12px"}>
                        <Button bg="primary.600" w="60%" size="xs" onPress={handleSubmit(onSubmit)}>
                            Kayıt Ol
                        </Button>
                    </VStack>
                </FormControl>
            </Center>
        </HStack>
    );
};

export default SignUpForm;