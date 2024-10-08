import { AspectRatio, Box, Heading, Image, Stack, VStack } from "native-base";
import { NavigationProp, Recipe } from "../../types/ObjectTypes";
import { useNavigation } from "@react-navigation/native";

import { Pressable } from "react-native";

interface SelectedCardProps extends Recipe {}
const SelectedCard = ({id,name,description,ingredients,img_url}:SelectedCardProps) => {

    const navigation = useNavigation<NavigationProp>(); // Burada tip güvenliğini sağlıyoruz
    return (
        <Pressable onPress={()=>navigation.navigate("RecipeDetailScreen", { recipeId: id,recipeName:name })}>
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
                        <Image source={{ uri:img_url }} alt="image" />
                    </AspectRatio>
                </Box>
            </Box>
            <Stack pl="3" pt="2">
                <Heading size="md">
                    {name}
                </Heading>
            </Stack>
        </VStack>
        </Pressable>
    )

}

export default SelectedCard;