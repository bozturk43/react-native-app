import { HStack, Image, Modal, Pressable, Stack, Text } from "native-base";
import { Product } from "../../types/ObjectTypes";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import AddQuantityModal from "../Inventory/AddQuantityModal";
import { useAuth } from "../../context/AuthContext";


export const ProductCard = ({ id, name, category, unit, img_url }: Product) => {
    const {user} = useAuth();
    const [isQuantityModalOpen, setIsQuantityModalOpen] = useState<boolean>(false);
    return (
        <HStack alignItems="center" p="2" bg="white" shadow={2} rounded="md" marginBottom={2}>
            <Image
                source={{ uri: img_url }}
                alt="Product Image"
                size="50px"  // Görsel boyutunu ayarlayabilirsiniz
                borderRadius="md"
            />
            <Stack ml="2" flex={1}>
                <HStack justifyContent="space-between">
                    <Text fontWeight="bold" fontSize="md">{name}</Text>
                    <Pressable onPress={()=>setIsQuantityModalOpen(true)}>
                        <Ionicons name="add-circle-outline" size={20} />
                    </Pressable>
                </HStack>
                <HStack justifyContent="space-between" mt="1">
                    <Text>Kategori: {category}</Text>
                    <Text>Birim: {unit}</Text>
                </HStack>
            </Stack>

            <Modal isOpen={isQuantityModalOpen}>
                <Modal.Content justifyContent="center">
                    <AddQuantityModal 
                        onClose={() => setIsQuantityModalOpen(false)}
                        type="add" 
                        user={user} 
                        productId={id} 
                        name={name} 
                        img_url={img_url}
                        />
                </Modal.Content>
            </Modal>
        </HStack>
    );
};
