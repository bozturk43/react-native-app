import { Box, HStack, Image, Stack, Text } from "native-base";

interface ProductCardProps {
    photoUrl: string;
    productName: string;
    quantity: number;
    unit: string;
}

export const ProductCard = ({ photoUrl, productName, quantity, unit }: ProductCardProps) => {
    return (
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
    );
};
