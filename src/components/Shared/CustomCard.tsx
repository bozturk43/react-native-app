import { AspectRatio, Box, Center, HStack, Heading, Image, Stack, Text } from "native-base";

export const CustomCard = () => {
    return <Box alignItems="center" w="200px" h="200px">
        <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
        }} _web={{
            shadow: 2,
            borderWidth: 0
        }} _light={{
            backgroundColor: "gray.50"
        }}>
            <Box>
                <Image
                    source={{
                        uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                    }}
                    style={{ width: 200, height: 100 }}
                    alt = "alt for img"
                    resizeMode="cover"
                />
                <Center bg="violet.500" _dark={{
                    bg: "violet.400"
                }} _text={{
                    color: "warmGray.50",
                    fontWeight: "700",
                    fontSize: "2xs"
                }} position="absolute" bottom="0" px="3" py="1.5">
                    PHOTOS
                </Center>
            </Box>
            <Stack p="2">
                <Stack>
                    <Heading size="sm" ml="-1">
                        The Garden City
                    </Heading>
                    <Text fontSize="2xs" _light={{
                        color: "violet.500"
                    }} _dark={{
                        color: "violet.400"
                    }} fontWeight="500" ml="-0.5" mt="-1">
                        The Silicon Valley of India.
                    </Text>
                </Stack>
                <Text fontWeight="400" fontSize="xs">
                    Bengaluru (also called Bangalore) is the center of India's high-tech
                </Text>
            </Stack>
        </Box>
    </Box>;
};