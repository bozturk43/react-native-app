import { AspectRatio, Box, Center, HStack, Heading, Image, Stack, Text } from "native-base";
import { truncateDescription } from "../../helpers/StringHelper";
import { useState } from "react";

export const CustomCard = (
    { url, categoryName, foodName, foodDescription }:
        { url: string, categoryName: string, foodName: string, foodDescription: string }
) => {
    const [imgError, setImgError] = useState<boolean>(false);

    return (
        <Box alignItems="center" w="200px" h="220px"> {/* Yüksekliği burada sabitliyoruz */}
            <Box
                maxW="80"
                rounded="lg"
                overflow="hidden"
                _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700"
                }}
                _web={{
                    shadow: 2,
                    borderWidth: 0
                }}
                _light={{
                    backgroundColor: "gray.50"
                }}
                h="100%" // Box'ın yüksekliğini %100 olarak ayarlıyoruz
            >
                <Box>
                    <AspectRatio w={"100%"} ratio={32/16}>
                    <Image
                        source={{
                            uri: imgError ? 'https://worldfoodtour.co.uk/wp-content/uploads/2013/06/neptune-placeholder-48.jpg' : url
                        }}
                        style={{ width: 200, height: 100 }}
                        alt="alt for img"
                        resizeMode="cover"
                        onError={() => setImgError(true)} // Hata durumunda imgError'u true yap
                    />
                    </AspectRatio>
                    <Center bg="primary.50" _dark={{
                        bg: "violet.400"
                    }} _text={{
                        fontWeight: "700",
                        fontSize: "2xs"
                    }} position="absolute" bottom="0" px="3" py="1.5">
                        {categoryName}
                    </Center>
                </Box>
                <Stack p="2" backgroundColor={"brand.800"} h="100%">
                    <Stack>
                        <Heading size="sm" ml="-1">
                            {foodName}
                        </Heading>
                    </Stack>
                    <Text fontWeight="400" fontSize="xs">
                        {truncateDescription(foodDescription, 90)}
                    </Text>
                </Stack>
            </Box>
        </Box>
    );
};
