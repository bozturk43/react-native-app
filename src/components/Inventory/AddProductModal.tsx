import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Heading, HStack, Input, Pressable, ScrollView, Spinner, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { User } from '../../context/AuthContext';
import { getAllProducts } from '../../services/product-service';
import { Product } from '../../types/ObjectTypes';
import { ProductCard } from '../Shared/ProductCard';

interface Props {
  onClose: () => void;
  user: User | null;
}

const AddProductModal = ({ onClose, user }: Props) => {

  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Yükleme durumu
  const [filteredList,setFilteredList] = useState<Product[]>([]);
  const [isOnSearch,setIsOnSearch] = useState(false);
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        if (user) {
          const items = await getAllProducts(user); // Kullanıcı mevcutsa veriyi al
          console.log("ITEMS",items)
          setProductList(items); // Gelen ürünleri ayarla, verilerin doğrudan kullanılabilir olduğundan emin olun
        }
      } catch (error) {
        console.error("Error fetching products:", error); // Hata bilgisini konsola yazdır
      } finally {
        setLoading(false); // Yükleme tamamlandı
      }
    };
    fetchAllProducts(); // Fonksiyonu çağır
  }, [user]);

  const searchProducts = (searchText: string) => {
    if (searchText !== "") {
      setIsOnSearch(true);
      setFilteredList(productList.filter((item: Product) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      ));
    } else {
      setIsOnSearch(false);
    }
  };
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
    <>
      <HStack space={4} justifyContent="space-between" marginBottom={4} marginTop={4} paddingX={4}>
        <Heading pl="2" fontSize={18}>
          Ürün Ekle
        </Heading>
        <Pressable onPress={() => onClose()}>
          <HStack>
            <Ionicons name="close-circle-outline" size={20} />
          </HStack>
        </Pressable>
      </HStack>
      {productList.length < 1 ? (
        <>
          <Text>Ürünler Getirilirken Bir Hata Oluştu.</Text>
        </>
      ) : (
        <ScrollView stickyHeaderIndices={[0]}height="100%" width="100%" backgroundColor="white" padding={2}>
          <VStack>
            <Input
                // onFocus={()=>onFocus()}
                background={"#fff"}
                backgroundColor={"#fff"}
                placeholder="Search"
                onChangeText={(text) =>{
                    searchProducts(text);
                }}
                variant="filled"
                width="100%" borderRadius="10"
                py="1" px="2"
                />
        </VStack>
        {(isOnSearch ? filteredList : productList).map((item: Product) => (
            <ProductCard
              key={item.id}
              id={item.id}
              img_url={item.img_url}
              name={item.name}
              category={item.category}
              unit={item.unit}
            />
          ))}
        </ScrollView>
      )}
    </>

  );
};

export default AddProductModal;