import { AspectRatio, Box, Heading, Image, Stack, VStack } from "native-base";

const SelectedCard = () => {
    return (
        <VStack backgroundColor={"brand.800"} p="2" borderRadius={"md"} shadow={4}>
            <Box alignItems={"center"}>
                <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700"
                }} _web={{
                    shadow: 2,
                    borderWidth: 0
                }} _light={{
                    backgroundColor: "gray.50"
                }}>
                    <AspectRatio w="100%" ratio={16 / 9}>
                        <Image source={{
                            uri: "https://cdn.yemek.com/mncrop/940/625/uploads/2016/09/kutahya-yemekleri-one-cikan.jpg"
                        }} alt="image" />
                    </AspectRatio>
                </Box>
            </Box>
            <Stack pl="3" pt="2">
                <Heading size="md">
                    The Garden City
                </Heading>
            </Stack>
        </VStack>
    )

}

export default SelectedCard;