import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext'
import { useNavigation, useRoute } from '@react-navigation/native';
import { AspectRatio, Button, Heading, HStack, Image, ScrollView, Spinner, Text, View } from 'native-base';
import { RouteProp } from '@react-navigation/native';
import { Ingredient, RootStackParamList } from '../types/ObjectTypes';
import { useRecipeDetails } from '../services/query-service';
import { useAuth } from '../context/AuthContext';
import Ingredients from '../components/RecipeDetail/Ingredients';

// RootStackParamList'ten parametre tipini almak için tür tanımı
type RecipeDetailScreenRouteProp = RouteProp<RootStackParamList, 'RecipeDetailScreen'>;
const RecipeDetailScreen = () => {
    const route = useRoute<RecipeDetailScreenRouteProp>(); // route'ı kullanırken türü belirtiyoru
    const navigation = useNavigation();
    const { user } = useAuth();
    const { colors, fonts } = useTheme();

    const { recipeId, recipeName } = route.params; // recipeId'yi alıyoruz
    const { data: recipeDetail, isLoading } = useRecipeDetails(user, recipeId);
    useEffect(() => {
        // Sayfanın başlığını güncelleme ve header stillerini ayarlama
        navigation.setOptions({
            title: recipeName, // Dinamik başlık
            headerStyle: {
                backgroundColor: '#d44e00', // Header arka plan rengi
                paddingVertical: 2, // Header'daki iç boşluğu küçültmek için padding
            },
            headerTitleStyle: {
                fontSize: 14, // Başlık font boyutunu küçültme
                fontWeight: 'bold', // İsteğe bağlı olarak başlık fontu kalınlığı
                color: '#fff', // Başlık metin rengi
            },
        });
    }, [navigation, recipeId]);

    if (isLoading) {
        return (
            <View backgroundColor={colors.brand[900]} h="100%" padding={4}>
                <Spinner color={colors.brand[700]} />
            </View>
        )
    }

    const missingIngredients = recipeDetail.missingIngredients?.filter((item: Ingredient) => item.isMissing) || [];


    return (
        <ScrollView paddingX={2} paddingTop={2}  style={{ backgroundColor: colors.brand[900] }}>
            <AspectRatio ratio={32 / 16}>
                <Image source={{ uri: recipeDetail.img_url }} alt={recipeDetail.name}></Image>
            </AspectRatio>
            <Ingredients ingredientList={recipeDetail.ingredients} title="Malzemeler"/>
            {recipeDetail.missingIngredients && <Ingredients ingredientList={missingIngredients} title='Eksik Malzemeler'/>}
            <Text fontSize={12} paddingY={4}>
                {recipeDetail.recipe_instructions}
            </Text>
            <Button 
                marginBottom={8} 
                disabled={recipeDetail.missingIngredients === null}
                bg={recipeDetail.missingIngredients !== null ? "gray.400" : "primary.500"} // Disabled durum için gri renk
                _disabled={{
                    bg: "gray.400", // Gri arka plan rengi
                    opacity: 0.7, // Silik görünüm için opaklık
                }}
            >
                Bu Yemegi Yaptım
            </Button>
        </ScrollView>
    );
};

export default RecipeDetailScreen;
