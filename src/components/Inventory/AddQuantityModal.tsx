import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button, Heading, HStack, Image, Input, NumberInput, Pressable, ScrollView, Spinner, VStack, View, Toast, useToast } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { User } from '../../context/AuthContext';
import { getAllProducts } from '../../services/product-service';
import { Product } from '../../types/ObjectTypes';
import { ProductCard } from '../Shared/ProductCard';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { addProductToPantry } from '../../services/user-service';

interface Props {
    onClose: () => void;
    user: User | null;
    productId: string;
    name: string;
    img_url: string;
}

const AddQuantityModal = ({ onClose, user, productId, name, img_url }: Props) => {
    const [value, setValue] = useState(0);
    const toast = useToast(); // useToast hook'u ile Toast'u kullan


    const handleIncrease = () => {
        setValue(value + 1);
    };
    const handleDecrease = () => {
        setValue(value > 0 ? value - 1 : 0); // Negatif değere düşmemesi için kontrol
    };
    const handleChange = (text: any) => {
        const num = parseInt(text);
        if (!isNaN(num)) {
            setValue(num);
        }
    };
    const showToast = () => {
        toast.show({
            description: "Bu bir uyarı mesajıdır!",
            placement: "top", // Üst kısımda görüntülenmesini sağlar
            duration: 3000, // 3 saniye sonra kaybolacak
            style: {
                position: 'absolute', // Toast'u konumlandırma
                top: 0, // Ekranın en üst kısmına yerleştirme
                zIndex: 9999, // Diğer bileşenlerin üzerinde görünmesini sağlar
            },
        });
    };

    const addProduct = (productId: string, user: User|null, quantity: number) => {
        if(quantity === 0){
            showMessage({
                message: "Ürün Miktarı 0 olamaz",
                type: "danger",
                duration: 3000,
            });
        }
        else{
            if(user){
                addProductToPantry(user,productId,quantity);
            }
        }
    }

    return (
        <VStack space={4} padding={2}>
            <HStack justifyContent="space-between">
                <Text>
                    Miktar Girin
                </Text>
                <Pressable onPress={() => onClose()}>
                    <Ionicons name="close-circle-outline" size={20} />
                </Pressable>
            </HStack>
            <HStack justifyItems="center" justifyContent="center" alignItems="center" space={4}>
                <Image
                    source={{ uri: img_url }}
                    alt="Product Image"
                    size="50px"  // Görsel boyutunu ayarlayabilirsiniz
                    borderRadius="md"
                />
                <Text>
                    {name}
                </Text>
            </HStack>
            <HStack space={2} alignItems="center" justifyContent="center">
                <Button onPress={handleDecrease}>-</Button>
                <Input
                    value={value.toString()}
                    onChangeText={handleChange}
                    keyboardType="numeric"
                    width="50px"
                    textAlign="center"
                />
                <Button onPress={handleIncrease}>+</Button>
            </HStack>
            <HStack space={2} alignItems="center" justifyContent="center">
                <Button width="80%" height={10} onPress={()=>addProduct(productId,user,value)}>Ekle</Button>
            </HStack>
            <FlashMessage position="top" />

        </VStack>

    );
};

export default AddQuantityModal;