import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'
import { HStack, Heading, ScrollView, Spinner, Text, VStack, View } from 'native-base';
import RowScroll from '../components/Dashboard/RowScroll';
import SelectedCard from '../components/Shared/SelectedCard';
import Greetings from '../components/Dashboard/Greetings';
import Search from '../components/Dashboard/Search';
import { belirliKategorilerdenBirerYemekAl, yemekler } from '../data/mocData'
import { Food, Recipe } from '../types/ObjectTypes';
import SearchResult from '../components/Dashboard/SearchResult';
import { useAvailableFoodsQuery } from '../services/query-service';
import { RefreshControl } from 'react-native';

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

  const onRefresh = async () => {
    setRefreshing(true);
    // Veri sorgulama işlemini yeniden başlat
    await refetch(); // useAvailableFoodsQuery'den refetch fonksiyonunu alarak kullanabilirsiniz
    setRefreshing(false);
    randomRecipe();
    setAvailableRecipes(foodList.availableRecipes);
    setUnAvailableRecipes(foodList.unavailableRecipes);
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
  }, [foodList]);

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
          {!isSearch && <Greetings username={user?.username || ""} />}
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
                {rastgeleTarif &&
                  <SelectedCard
                    id={rastgeleTarif?.id}
                    name={rastgeleTarif?.name}
                    img_url={rastgeleTarif.img_url}
                    categoryId={rastgeleTarif.categoryId}
                    description={rastgeleTarif?.description}
                    ingredients={rastgeleTarif.ingredients} />
                }
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
                {availableRecipes && <RowScroll foodList={availableRecipes} />}
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