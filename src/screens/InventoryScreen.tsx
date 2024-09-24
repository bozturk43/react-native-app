import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { getUserPantries } from '../services/user-service';
import { Box, Heading, HStack, ScrollView, Spinner, VStack } from 'native-base';
import { ProductCard } from '../components/Shared/ProductCard';
import { useTheme } from '../context/ThemeContext';

// Ürünlerin tipini tanımlayın
interface PantryItem {
  productId: string;
  name: string;
  quantity: number;
}

const InventoryScreen = () => {
  const { user } = useAuth();
  const { colors, fonts } = useTheme();
  const [loading, setLoading] = useState(true); // Yükleme durumu
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]); // Dolap malzemeleri durumu

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

  console.log("PANTRY ITEMS", pantryItems);

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
        <ScrollView height="100%" paddingX={2} paddingTop={2} paddingBottom={2} style={{backgroundColor:colors.brand[900]}} >
          <VStack space={2} justifyContent="center">
            <Heading pl="2" fontSize={18}>
              Ürünler
            </Heading>
          </VStack>
          {pantryItems.map((item: any) => (
            <ProductCard
              key={item.productId}
              photoUrl="https://media.istockphoto.com/id/1450576005/tr/foto%C4%9Fraf/tomato-isolated-tomato-on-white-background-perfect-retouched-tomatoe-side-view-with.jpg?s=612x612&w=0&k=20&c=cjD8XQtMuCzMo-pGK3LGUx-iQvi9n97GN-cDybXVVrw="
              productName={item.name}
              quantity={item.quantity}
              unit={item.unit}
            />
            // Anahtar props'u ekleyin
          ))}
          {/* Ürünleri listelemek için buraya FlatList veya başka bir yapı ekleyebilirsiniz */}
        </ScrollView>
      )}
    </View>
  );
};

export default InventoryScreen;
