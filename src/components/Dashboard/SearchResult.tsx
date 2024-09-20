import { Box, Center, HStack, Heading, Image, ScrollView, Stack, Text, VStack, View, useScreenReaderEnabled } from "native-base";
import { belirliKategorilerdenBirerYemekAl, getCategoryName, searchFoods,searchFoodsByCategoryId,yemekler } from "../../data/mocData";
import { Food } from "../../types/ObjectTypes";
import ColScroll from "./ColScroll";
import { useEffect, useState } from "react";
import { truncateDescription } from "../../helpers/StringHelper";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
    searchText: string,
    searchCategoryId:number,
}


const SearchResult = ({ searchText,searchCategoryId }: Props) => {
    const [seciliYemekler,setSeciliYemekler] = useState<Food[]>(belirliKategorilerdenBirerYemekAl());
    const [isSearched,setIsSearched] = useState<boolean>(false);

    useEffect(() => {
        if (searchText !== "") {
            searchByText(searchText);
            setIsSearched(true);
        }
        else{
            setIsSearched(false);
        }
    }, [searchText]);
    useEffect(() => {
        if (searchCategoryId > -1) {
            filterByCategoryId(searchCategoryId);
            setIsSearched(true);
        }
    }, [searchCategoryId])

    const searchByText = (text: string) => {
        const findedFoods = searchFoods(text);
        setSeciliYemekler(findedFoods);
    }
    const filterByCategoryId = (categoryId : number) => {
        if(isSearched){
            const filteredByCategoryFoods = searchFoodsByCategoryId(categoryId);
            setSeciliYemekler(filteredByCategoryFoods);
        }
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
                    <VStack space={3} paddingX={4}>
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
        <Box alignItems="center" width="75vw">
            <Box rounded="lg" overflow="hidden" _dark={{
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