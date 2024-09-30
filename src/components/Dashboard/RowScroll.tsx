import React, { useEffect, useState } from 'react';
import { Box, HStack, Heading, ScrollView, Text, View } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomCard } from '../Shared/CustomCard';
import { Food, Recipe } from '../../types/ObjectTypes';
import { getCategoryName } from '../../data/mocData';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RowScroll = ({ foodList }: { foodList: Recipe[] }) => {

    const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);


    useEffect(() => {
        const fetchCategoriesFromStorage = async () => {
            try {
                const storedCategories = await AsyncStorage.getItem('foodCategories');
                if (storedCategories) {
                    setCategories(JSON.parse(storedCategories)); // JSON string'i parse ederek state'e set ediyorum
                }
            } catch (error) {
                console.error('Error fetching categories from AsyncStorage:', error);
            }
        };

        fetchCategoriesFromStorage();
    }, []);

    // Kategori ismini bulmak için fonksiyon
    const getCategoryNameById = (categoryId: string) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Kategori Bulunamadı'; // Kategori bulunamazsa fallback
    };

    return (
        <>
            <Box>
                <ScrollView horizontal={true}>
                    <HStack space={3}>
                        {foodList?.map((item, index) => (
                            <CustomCard
                                key={index}
                                url={item.img_url}
                                categoryName={getCategoryNameById(item.categoryId)}
                                foodName={item.name}
                                foodDescription={item.description}
                            />
                        ))}
                    </HStack>
                </ScrollView>
            </Box>
        </>
    );
};

export default RowScroll;