import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { getUserPantries } from '../services/user-service';
import { Box, Heading, HStack, Modal, Pressable, ScrollView, Spinner, VStack } from 'native-base';
import { PantryItemCard } from '../components/Shared/PantryItemCard';
import { useTheme } from '../context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddProductModal from '../components/Inventory/AddProductModal';
import { PantryItem } from '../types/ObjectTypes';

const InventoryScreen = () => {
  const { user } = useAuth();
  const { colors, fonts } = useTheme();
  const [loading, setLoading] = useState(true); // Yükleme durumu
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]); // Dolap malzemeleri durumu
  const [isModalOpen,setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPantryItems = async () => {
      try {
        if (user) {
          const items = await getUserPantries(user); // Kullanıcı mevcutsa veriyi al
          setPantryItems(items); // Gelen ürünleri ayarla, verilerin doğrudan kullanılabilir olduğundan emin olun
        }
      } catch (error) {
        console.error("Error fetching pantry items:", error); // Hata bilgisini konsola yazdır
      } finally {
        setLoading(false); // Yükleme tamamlandı
      }
    };
    fetchPantryItems(); // Fonksiyonu çağır
  }, [user]);


  if (loading) {
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
      {pantryItems.length < 1 ? (
        <>
          <Text>Henüz bir ürün yok.</Text>
        </>
      ) : (
        <ScrollView height="100%" paddingX={2} paddingTop={2} paddingBottom={2} style={{ backgroundColor: colors.brand[900] }} >
          <HStack space={4} justifyContent="space-between" marginBottom={4}>
            <Heading pl="2" fontSize={18}>
              Ürünler
            </Heading>
            <Pressable onPress={()=>setIsModalOpen(true)}>
              <HStack>
                <Ionicons name="add-circle-outline" size={20} />
                <Text> Ekle </Text>
              </HStack>
            </Pressable>
          </HStack>
          {pantryItems.map((item: any) => (
            <PantryItemCard
              key={item.productId}
              photoUrl={item.img_url}
              productName={item.name}
              quantity={item.quantity}
              unit={item.unit}
            />
            // Anahtar props'u ekleyin
          ))}
          {/* Ürünleri listelemek için buraya FlatList veya başka bir yapı ekleyebilirsiniz */}
        </ScrollView>
      )}
      <Modal isOpen={isModalOpen}>
        <Modal.Content justifyContent="center">
        <AddProductModal onClose={()=>setIsModalOpen(false)} user={user}/>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default InventoryScreen;
