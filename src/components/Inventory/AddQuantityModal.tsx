import React, { useState } from 'react';
import { Text } from 'react-native';
import { Button,HStack, Image, Input, Pressable, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { User } from '../../context/AuthContext';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { addProductToPantry, updateProductQuantityToPantry } from '../../services/user-service';
import { useQueryClient } from '@tanstack/react-query';


interface Props {
    type:"add" | "update";
    onClose: () => void;
    user: User | null;
    productId: string;
    name: string;
    img_url: string;
    quantity?:number;
}

const AddQuantityModal = ({type,onClose, user, productId, name, img_url,quantity }: Props) => {
    const queryClient = useQueryClient();

    const [value, setValue] = useState(quantity !== undefined ? quantity : 0);
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

    const addProduct = async (productId: string, user: User|null, quantity: number) => {
        if(quantity === 0){
            showMessage({
                message: "Ürün Miktarı 0 olamaz",
                type: "danger",
                duration: 3000,
            });
        }
        else{
            if(user){
                const result = await addProductToPantry(user,productId,quantity);
                if(result.code === 0) {
                    showMessage({
                        message: result.message,
                        type: "success",
                        duration: 3000,
                    });
                    queryClient.invalidateQueries({queryKey:['fetchPantryItems']});
                    onClose();
                }
                else{
                    showMessage({
                        message: result.message,
                        type: "danger",
                        duration: 3000,
                    });
                }
            }
        }
    }
    const updateProduct = async (productId: string, user: User|null, quantity: number) => {
        if(quantity === 0){
            showMessage({
                message: "Ürün Miktarı 0 olamaz",
                type: "danger",
                duration: 3000,
            });
        }
        else{
            if(user){
                const result = await updateProductQuantityToPantry(user,productId,quantity);
                if(result.code === 0) {
                    showMessage({
                        message: result.message,
                        type: "success",
                        duration: 3000,
                    });
                    queryClient.invalidateQueries({queryKey:['fetchPantryItems']});
                    onClose();
                }
                else{
                    showMessage({
                        message: result.message,
                        type: "danger",
                        duration: 3000,
                    });
                }
            }
        }
    }

    return (
        <>
        {type === "add" ? (
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
        ) : (
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
                <Button width="80%" height={10} onPress={()=>updateProduct(productId,user,value)}>Güncelle</Button>
            </HStack>
            <FlashMessage position="top" />
        </VStack>
        )}
        </>
        

    );
};

export default AddQuantityModal;