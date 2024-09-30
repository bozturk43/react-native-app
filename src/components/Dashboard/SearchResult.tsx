import { AspectRatio, Box, Center, Checkbox, HStack, Heading, Image, ScrollView, Stack, Text, VStack, View, useScreenReaderEnabled } from "native-base";
import {Recipe } from "../../types/ObjectTypes";
import ColScroll from "./ColScroll";
import { useEffect, useState } from "react";
import { truncateDescription } from "../../helpers/StringHelper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAvailableFoodsQuery } from "../../services/query-service";
import { useAuth } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
    searchText: string,
    searchCategoryId:string,
}


const SearchResult = ({ searchText, searchCategoryId }: Props) => {
    const { user, logout } = useAuth();
    const { data: foodList, isLoading, error } = useAvailableFoodsQuery(user);
    const [isSearched, setIsSearched] = useState<boolean>(false);
    const [filteredFoods, setFilteredFoods] = useState<Recipe[]>([]);
    const [includeUnavailable, setIncludeUnavailable] = useState<boolean>(false); // Unavailable olanları dahil edip etmeyeceğimizi kontrol eden state.

    useEffect(() => {
        if (searchText !== "") {
            searchByText(searchText);
            setIsSearched(true);
        } else {
            setIsSearched(false);
        }
    }, [searchText, includeUnavailable]); // CheckBox state'ini de dependency'ye ekliyoruz

    useEffect(() => {
        if (searchCategoryId !== "") {
            filterByCategoryId(searchCategoryId);
            setIsSearched(true);
        }
    }, [searchCategoryId, includeUnavailable]);

    const searchByText = (text: string) => {
        if (!foodList) return; // Veri gelmediyse çık
        const availableRecipes = foodList.availableRecipes.filter((food: Recipe) =>
            food.name.toLowerCase().includes(text.toLowerCase())
        );
        
        // Eğer checkbox işaretlenmişse unavailableRecipes'ı da dahil et.
        const finalRecipes = includeUnavailable
            ? [...availableRecipes, ...foodList.unavailableRecipes.filter((food: Recipe) =>
                food.name.toLowerCase().includes(text.toLowerCase())
              )]
            : availableRecipes;

        setFilteredFoods(finalRecipes || []);
    };

    const filterByCategoryId = (categoryId: string) => {
        if (!foodList) return; // Veri gelmediyse çık
        const availableRecipes = foodList.availableRecipes.filter(
            (food: Recipe) => food.categoryId === categoryId
        );

        // Eğer checkbox işaretlenmişse unavailableRecipes'ı da dahil et.
        const finalRecipes = includeUnavailable
            ? [...availableRecipes, ...foodList.unavailableRecipes.filter((food: Recipe) =>
                food.categoryId === categoryId
              )]
            : availableRecipes;

        setFilteredFoods(finalRecipes || []);
    };

    if (isLoading) {
        return <Text>Yükleniyor...</Text>; // Loading durumunu göster
    }

    if (error) {
        return <Text>Veri alınırken bir hata oluştu.</Text>; // Hata durumunu göster
    }

    return (
        <View style={{ paddingVertical: 12 }}>
             <Checkbox 
                value="includeUnavailable" // Checkbox'a bir value ekliyoruz.
                isChecked={includeUnavailable} 
                onChange={setIncludeUnavailable}
                size={"sm"}
                aria-label="aria-label"
                marginBottom={2}
            >
                <Text fontSize={"12"}>Dolabımda olmayan Ürünleride Dahil Et</Text>
                </Checkbox> 
            {/* Checkbox ekleniyor */}
            {filteredFoods && <ResultContent foodList={filteredFoods} />}
        </View>
    );
};



interface ResultContentProps {
    foodList: Recipe[];
}

const ResultContent = ({ foodList }: ResultContentProps) => {

    const [categoryNames, setCategoryNames] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchCategoryNames = async () => {
            const newCategoryNames: { [key: string]: string } = {};
            for (const food of foodList) {
                const categoryName = await getCategoryNameById(food.categoryId);
                newCategoryNames[food.categoryId] = categoryName;
            }
            setCategoryNames(newCategoryNames);
        };

        fetchCategoryNames();
    }, [foodList]);

    const getCategoryNameById = async (categoryId: string): Promise<string> => {
        try {
            const storedCategories = await AsyncStorage.getItem('foodCategories');
            if (storedCategories) {
                const categories = JSON.parse(storedCategories);
                const category = categories.find((cat: { id: string; name: string }) => cat.id === categoryId);
                return category ? category.name : 'Kategori Bulunamadı';
            } else {
                return 'Kategori Bulunamadı';
            }
        } catch (error) {
            console.error('Error fetching category from AsyncStorage:', error);
            return 'Kategori Bulunamadı';
        }
    };

    return (
        <Box>
            <ScrollView>
                <Center>
                    <VStack space={3} paddingX={2}>
                        {foodList?.map((item, index) => (
                            <ItemContent
                                key={index}
                                url={item.img_url}
                                categoryName={categoryNames[item.categoryId] || 'Yükleniyor...'}
                                foodName={item.name}
                                foodDescription={item.description}
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

    const [imgError, setImgError] = useState<boolean>(false);

    return (
        <Box alignItems="center" w={"350px"} h={"220px"}>
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
                    <AspectRatio w={"100%"} ratio={38 / 16}>
                    <Image
                        source={{
                            uri: imgError ? 'http://worldfoodtour.co.uk/wp-content/uploads/2013/06/neptune-placeholder-48.jpg' : url
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