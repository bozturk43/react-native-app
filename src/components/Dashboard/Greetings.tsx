import { Box, HStack, Heading, Avatar, Text, VStack, Pressable } from 'native-base';
import { User } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../types/ObjectTypes';


const Greetings = ({ user }: { user: User | null }) => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <Box w="100%" paddingY={2}>
            {user && (
                <HStack space={"justify-between"}>
                    <HStack w="80%">
                        <VStack>
                            <Heading fontWeight={"light"}>
                                Hello,<Text fontWeight={"bold"}>{user.username}</Text>
                            </Heading>
                            <Text fontStyle={"italic"}>What do you want to cook today?</Text>
                        </VStack>
                    </HStack>
                    <Box w="20%" alignItems={"flex-end"} justifyContent={"flex-end"}>
                        <Pressable onPress={()=> navigation.navigate('Settings')}>
                            <Avatar 
                                bg="green.500" 
                                source={{
                                    uri: user.img_url === "https://avatar.iran.liara.run/public" ? "" : user.img_url
                                }} 
                            />
                        </Pressable>
                    </Box>
                </HStack>
            )}
        </Box>
    );
}

export default Greetings;
