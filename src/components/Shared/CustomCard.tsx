import { AspectRatio, Box, Center, HStack, Heading, Image, Stack, Text } from "native-base";
import { truncateDescription } from "../../helpers/StringHelper";

export const CustomCard = (
    {url,categoryName,foodName,foodDescription}:
    {url:string,categoryName:string,foodName:string,foodDescription:string}
    ) => {
    return <Box alignItems="center" w="200px" h="200px" >
        <Box maxW="80" rounded="lg" overflow="hidden" _dark={{
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
                        uri: url
                    }}
                    style={{ width: 200, height: 100 }}
                    alt = "alt for img"
                    resizeMode="cover"
                />
                <Center bg="primary.50" _dark={{
                    bg: "violet.400"
                }} _text={{
                    fontWeight: "700",
                    fontSize: "2xs"
                }} position="absolute" bottom="0" px="3" py="1.5">
                    {categoryName}
                </Center>
            </Box>
            <Stack p="2" backgroundColor={"brand.800"}>
                <Stack>
                    <Heading size="sm" ml="-1">
                        {foodName}
                    </Heading>
                </Stack>
                <Text fontWeight="400" fontSize="xs">
                    {truncateDescription(foodDescription,90)}
                </Text>
            </Stack>
        </Box>
    </Box>;
};