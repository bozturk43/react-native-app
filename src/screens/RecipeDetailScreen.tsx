import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View } from 'native-base';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/ObjectTypes';

// RootStackParamList'ten parametre tipini almak için tür tanımı
type RecipeDetailScreenRouteProp = RouteProp<RootStackParamList, 'RecipeDetailScreen'>;
const RecipeDetailScreen = () => {
    const route = useRoute<RecipeDetailScreenRouteProp>(); // route'ı kullanırken türü belirtiyoru
    const navigation = useNavigation();
    const { recipeId,recipeName } = route.params; // recipeId'yi alıyoruz

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


    return (
        <View>
            <Text>{recipeId}</Text>
        </View>
    );
};

export default RecipeDetailScreen;
