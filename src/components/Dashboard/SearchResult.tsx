import { Box, Center, HStack, Heading, Image, ScrollView, Stack, Text, VStack, View } from "native-base";
import { belirliKategorilerdenBirerYemekAl, getCategoryName } from "../../data/mocData";
import { Food } from "../../types/ObjectTypes";
import ColScroll from "./ColScroll";
import { useEffect } from "react";
import { truncateDescription } from "../../helpers/StringHelper";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
    searchText: string
}


const SearchResult = ({ searchText }: Props) => {
    const seciliYemekler: Food[] = belirliKategorilerdenBirerYemekAl();

    useEffect(() => {
        if (searchText !== "") {
            searchByText(searchText);
        }
    }, [searchText])

    const searchByText = (text: string) => {
        console.log("Texte Göre Arama", text);
    }
    const filterByCategoryId = () => {
        console.log("Id Göre Arama");
    }
    return (
        <View style={{ paddingVertical: 12 }}>
            {seciliYemekler && <ResultContent foodList={seciliYemekler} />}
        </View>
    )
}


interface ResultContentProps {
    foodList: Food[];
}

const ResultContent = ({ foodList }: ResultContentProps) => {
    return (
        <Box>
            <ScrollView>
                <Center>
                    <VStack space={3}>
                        {foodList?.map((item, index) => (
                            <ItemContent
                                key={index}
                                url={item.Fotograf}
                                categoryName={getCategoryName(item.KategoriId) || ""}
                                foodName={item.Ad}
                                foodDescription={item.Tarif}
                            />
                        ))}
                    </VStack>
                </Center>
            </ScrollView>
        </Box>
    )
}

interface ItemContentProps {
    url: string;
    categoryName: string;
    foodName: string;
    foodDescription: string
}
const ItemContent = ({ url, categoryName, foodName, foodDescription }: ItemContentProps) => {
    return (
        <Box alignItems="center" width="80%">
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
                        style={{ width: "auto", height: 100 }}
                        alt="alt for img"
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
                    <HStack space={3} alignItems="center" justifyContent="center">
                        <HStack space={1} justifyContent="center" alignItems="center">
                            <Ionicons name="people-circle-sharp" size={13} color="white" />
                            <Text fontSize={10}>4-6 Kişilik</Text>
                        </HStack>
                        <HStack space={1} justifyContent="center" alignItems="center">
                            <Ionicons name="time-sharp" size={13} color="white" />
                            <Text fontSize={10}>15 Dk</Text>
                        </HStack>
                    </HStack>
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
    )
}



export default SearchResult;