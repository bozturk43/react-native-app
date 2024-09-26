import { Box, HStack, Image, Modal, Pressable, Stack, Text } from "native-base";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddQuantityModal from "../Inventory/AddQuantityModal";
import { useAuth } from "../../context/AuthContext";
import ConfirmationDialog from "./ConfirmationDialog";
import { deleteProductFromPantry } from "../../services/user-service";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useQueryClient } from '@tanstack/react-query';


interface PantryItemCardProps {
    productId: string
    photoUrl: string;
    productName: string;
    quantity: number;
    unit: string;
}

export const PantryItemCard = ({ productId, photoUrl, productName, quantity, unit }: PantryItemCardProps) => {
    const { user } = useAuth();
    const [isQuantityModalOpen, setIsQuantityModalOpen] = useState<boolean>(false);
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const deletePantryItem = async (productId: string) => {
        if (user) {
            const result = await deleteProductFromPantry(user, productId);
            if (result.code === 0) {
                showMessage({
                    message: result.message,
                    type: "success",
                    duration: 3000,
                });
                queryClient.invalidateQueries({ queryKey: ['fetchPantryItems'] });
            }
            else {
                showMessage({
                    message: result.message,
                    type: "danger",
                    duration: 3000,
                });
            }
        }
    }
    return (
        <Box position="relative">
            <HStack alignItems="center" p="2" bg="white" shadow={2} rounded="md" marginBottom={2}>
                <Image
                    source={{ uri: photoUrl }}
                    alt="Product Image"
                    size="50px"  // Görsel boyutunu ayarlayabilirsiniz
                    borderRadius="md"
                />
                <Stack ml="2" flex={1}>
                    <Text fontWeight="bold" fontSize="md">{productName}</Text>
                    <HStack justifyContent="space-between" mt="1">
                        <Text>Adet: {quantity} {unit}</Text>
                    </HStack>
                </Stack>
            </HStack>
            <Pressable
                position="absolute"
                top={2}
                right={2}
                onPress={() => setIsQuantityModalOpen(true)}
            >
                <Ionicons name="pencil-outline" size={15} color="gray" />
            </Pressable>
            <Pressable
                position="absolute"
                top={10}
                right={2}
                onPress={() => setIsConfirmationDialogOpen(true)}
            >
                <Ionicons name="trash-outline" size={15} color="gray" />
            </Pressable>
            <Modal isOpen={isQuantityModalOpen}>
                <Modal.Content justifyContent="center">
                    <AddQuantityModal
                        onClose={() => setIsQuantityModalOpen(false)}
                        type="update"
                        user={user}
                        productId={productId}
                        name={productName}
                        img_url={photoUrl}
                        quantity={quantity}
                    />
                </Modal.Content>
            </Modal>
            <ConfirmationDialog
                isOpen={isConfirmationDialogOpen}
                onClose={() => setIsConfirmationDialogOpen(false)}
                onConfirm={() => deletePantryItem(productId)}
            />
            <FlashMessage position="top" style={{ zIndex: 1000 }} /> {/* zIndex ayarı */}
        </Box>

    );
};
