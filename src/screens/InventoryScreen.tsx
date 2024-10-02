import React, { useState } from 'react';
import { Text, View, ScrollView, HStack, Heading, Pressable, Modal, Spinner, VStack } from 'native-base';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddProductModal from '../components/Inventory/AddProductModal';
import { PantryItemCard } from '../components/Shared/PantryItemCard';
import { usePantriesQuery } from '../services/query-service';

const InventoryScreen = () => {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: pantryItems, isLoading } = usePantriesQuery(user);

  if (isLoading) {
    return (
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    );
  }

  return (
    <View>
      {pantryItems && pantryItems?.length < 1 ? (
        <VStack h={"100%"} justifyItems={"center"} alignItems={"center"} justifyContent={"center"} style={{ backgroundColor: colors.brand[900]}}>
          <Text>
            Henüz Dolabınızda Bir Ürün Yok
          </Text>
          <Pressable onPress={() => setIsModalOpen(true)}>
            <VStack justifyItems={"center"} alignItems={"center"}>
              <Text> Eklemek İçin Dokunun </Text>
              <Ionicons name="add-circle-outline" size={35} />
            </VStack>
          </Pressable>
        </VStack>
      ) : (
        <ScrollView height="100%" paddingX={2} paddingTop={2} paddingBottom={2} style={{ backgroundColor: colors.brand[900] }}>
          <HStack space={4} justifyContent="space-between" marginBottom={4}>
            <Heading pl="2" fontSize={18}>
              Ürünler
            </Heading>
            <Pressable onPress={() => setIsModalOpen(true)}>
              <HStack>
                <Ionicons name="add-circle-outline" size={20} />
                <Text> Ekle </Text>
              </HStack>
            </Pressable>
          </HStack>
          {pantryItems?.map((item: any) => (
            <PantryItemCard
              key={item.productId}
              productId={item.productId}
              photoUrl={item.img_url}
              productName={item.name}
              quantity={item.quantity}
              unit={item.unit}
            />
          ))}
        </ScrollView>
      )}
      <Modal isOpen={isModalOpen}>
        <Modal.Content justifyContent="center">
          <AddProductModal
            onClose={() => {
              setIsModalOpen(false);
            }}
            user={user}
          />
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default InventoryScreen;
