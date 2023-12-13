import { Box,HStack,Heading,Avatar,Text,VStack} from 'native-base';

const Greetings = ({ username }: { username: string }) => {
    return (
        <Box w="100%" paddingY={2}>
            <HStack space={"justify-between"}>
                <HStack w="80%">
                    <VStack>
                        <Heading fontWeight={"light"}>
                            Hello,<Text fontWeight={"bold"}>{username}</Text>
                        </Heading>
                        <Text fontStyle={"italic"}>What do you want to cook today ?</Text>
                    </VStack>
                </HStack>
                <Box w="20%" alignItems={"flex-end"} justifyContent={"flex-end"}>
                    <Avatar bg="green.500" source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    }} />
                </Box>
            </HStack>
        </Box>
    )
}

export default Greetings;