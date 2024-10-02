import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'
import { Box, HStack, Heading, Pressable, ScrollView, Spinner, Text, VStack, View } from 'native-base';
import RowScroll from '../components/Dashboard/RowScroll';
import SelectedCard from '../components/Shared/SelectedCard';
import Greetings from '../components/Dashboard/Greetings';
import Search from '../components/Dashboard/Search';
import { belirliKategorilerdenBirerYemekAl, yemekler } from '../data/mocData'
import { Food, NavigationProp, Recipe } from '../types/ObjectTypes';
import SearchResult from '../components/Dashboard/SearchResult';
import { useAvailableFoodsQuery } from '../services/query-service';
import { RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';


const DashboardScreen = () => {
  const { user, logout } = useAuth();
  const { colors, fonts } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<string>("");
  const [rastgeleTarif, setRastgeleTarif] = useState<Recipe | null>(null);
  const [availableRecipes, setAvailableRecipes] = useState<Recipe[] | null>(null);
  const [unAvailableRecipes, setUnAvailableRecipes] = useState<Recipe[] | null>(null);
  const { data: foodList, isLoading, refetch } = useAvailableFoodsQuery(user); // Kullanıcı bilgisi ile sorguyu çağırın

  const queryClient = useQueryClient();
  const navigation = useNavigation<NavigationProp>();


  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ['fetchAvailableFoods'] });
    setRefreshing(false);
  };

  const randomRecipe = () => {
    if (foodList && foodList.availableRecipes) {
      const randomIndex = Math.floor(Math.random() * foodList.availableRecipes.length);
      setRastgeleTarif(foodList.availableRecipes[randomIndex]);
    }
  };

  // foodList değiştiğinde rastgele tarif seç
  useEffect(() => {
    if (foodList) {
      randomRecipe();
      setAvailableRecipes(foodList.availableRecipes);
      setUnAvailableRecipes(foodList.unavailableRecipes);
    }
  }, [foodList,onRefresh]);

  return (
    <ScrollView paddingX={2} paddingTop={2} paddingBottom={2} style={{ backgroundColor: colors.brand[900] }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Spinner color={colors.brand[700]} />
        </View>
      ) : (
        <>
          {!isSearch && <Greetings user={user} />}
          <Search
            onFocus={() => setIsSearch(true)}
            isOnSearch={isSearch}
            closeSearch={() => {
              setIsSearch(false);
              setSearchText("");
              setSearchCategory("");
            }}
            onTextChange={(e) => setSearchText(e)}
            onCategorySelect={(e) => setSearchCategory(e)}
          />
          {isSearch ? (
            <SearchResult searchText={searchText} searchCategoryId={searchCategory} />
          ) : (
            <VStack space={4}>
              <VStack space={2} paddingY={2}>
                <Heading pl="2" fontSize={18}>
                  Günün Yemegi
                </Heading>
                {rastgeleTarif ? (
                  <SelectedCard
                    id={rastgeleTarif.id}
                    name={rastgeleTarif.name}
                    img_url={rastgeleTarif.img_url}
                    categoryId={rastgeleTarif.categoryId}
                    description={rastgeleTarif.description}
                    ingredients={rastgeleTarif.ingredients}
                  />
                ) : (
                  <Box paddingX={3}>
                    <Text fontSize={12}>
                      Size yemek önermek için dolabınızda yeterli ürün bulamadık, lütfen dolabınıza yeni ürünler ekleyin.
                    </Text>
                    <Pressable onPress={()=>navigation.navigate("Dolabım")}>
                      <HStack alignItems={"center"} justifyContent={"center"}>
                        <Text>Dolabıma Git</Text>
                        <Ionicons name="arrow-forward-circle-outline" size={25} />
                      </HStack>
                    </Pressable>
                  </Box>
                )}
              </VStack>
              {/*==============SECTİON 2=========== */}
              <VStack>
                <HStack alignItems={"center"}>
                  <Heading pl="2" fontSize={18}>
                    Sizin İçin
                  </Heading>
                  <Text fontSize={8} fontStyle={"italic"}>
                    (Mevcut Ürünleriniz ile Yapabilirsiniz.)
                  </Text>
                </HStack>
                {availableRecipes && availableRecipes.length > 0 ? (
                  <RowScroll foodList={availableRecipes} />
                ) : (
                  <Box paddingX={3}>
                    <Text fontSize={12}>
                      Kullanılabilir tarifler için dolabınızda yeterli ürün bulamadık, lütfen dolabınıza yeni ürünler ekleyin.
                    </Text>
                    <Pressable onPress={()=>navigation.navigate("Dolabım")}>
                      <HStack alignItems={"center"} justifyContent={"center"}>
                        <Text>Dolabıma Git</Text>
                        <Ionicons name="arrow-forward-circle-outline" size={25} />
                      </HStack>
                    </Pressable>
                  </Box>
                )}
              </VStack>
              {/*==============SECTİON 3=========== */}
              <VStack>
                <HStack space={1} alignItems={"center"}>
                  <Heading pl="2" fontSize={18}>
                    Alternatif Seçimler
                  </Heading>
                  <Text fontSize={8} fontStyle={"italic"}>
                    (Alacağınız ek bir kaç ürün ile Yapabilirsiniz.)
                  </Text>
                </HStack>
                {unAvailableRecipes && <RowScroll foodList={unAvailableRecipes} />}
              </VStack>
              {/*==============END SECTİONS=========== */}
            </VStack>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default DashboardScreen;