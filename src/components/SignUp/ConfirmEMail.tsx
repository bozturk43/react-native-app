import React, { useState } from 'react';
import { Center, HStack, Input, VStack, Button, Image, Text, Heading } from 'native-base';

const ConfirmEmail = ({ navigation }: { navigation: any }) => {
    const [confirmationCode,setConfirmationCode] = useState<string>("");

    const verifyCode = () => {
        navigation.navigate("Login");
    }

    return (
        <HStack bg="#fff" h="full" w="full" alignItems={"center"} _text={{ color: "white" }}>
            <Center w="full">
                <Heading paddingX={"12px"} marginBottom={"24px"}>
                    Please type your confirmation code don't forget check your spams then
                    <Text color={"brand.800"}> Confirm</Text>
                </Heading>
                <Input
                    size="xs"
                    h="40px"
                    w="80%"
                    placeholder="Type your confirm code"
                    rounded="xl"
                    onChangeText={(value) => setConfirmationCode(value)}
                    value={confirmationCode}
                />

                <VStack alignItems="center" w="100%" marginTop={"12px"}>
                    <Button bg="primary.600" w="60%" size="xs" onPress={()=>verifyCode()}>
                        Dogrula
                    </Button>
                </VStack>
            </Center>
        </HStack>
    );
};

export default ConfirmEmail;