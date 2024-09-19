import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'
import {HStack, Heading,ScrollView, Text, VStack, View} from 'native-base';
import RowScroll from '../components/Dashboard/RowScroll';
import SelectedCard from '../components/Shared/SelectedCard';
import Greetings from '../components/Dashboard/Greetings';
import Search from '../components/Dashboard/Search';
import { belirliKategorilerdenBirerYemekAl, yemekler } from '../data/mocData'
import { Food } from '../types/ObjectTypes';
import SearchResult from '../components/Dashboard/SearchResult';

const DashboardScreen = () => {
  const { user, logout } = useAuth();
  const { colors, fonts } = useTheme();
  const [isSearch,setIsSearch] = useState<boolean>(false);
  const [searchText,setSearchText] = useState<string>("");
  const [searchCategory,setSearchCategory]=useState<number>(-1)
  const rastgeleAnaYemek = yemekler.find((item) => item.KategoriId === 1)
  const seciliYemekler: Food[] = belirliKategorilerdenBirerYemekAl();
  return (
    <ScrollView stickyHeaderIndices={ isSearch ? [0] : [1]} paddingX={2} paddingTop={2} paddingBottom={2} style={{backgroundColor:colors.brand[900]}} >
    {!isSearch && <Greetings username={user?.username || ""} />}
      <Search 
        onFocus={()=>setIsSearch(true)} 
        isOnSearch={isSearch} 
        closeSearch={()=>{
          setIsSearch(false);
          setSearchText("");
          setSearchCategory(-1)
        }} 
        onTextChange={(e)=>setSearchText(e)}
        onCategorySelect = {(e)=>setSearchCategory(e)}
        />
      {
        isSearch ? 
        <SearchResult searchText={searchText} searchCategoryId={searchCategory}/>
        :
        <>
        <VStack space={4}>
        <VStack space={2} paddingY={2}>
          <Heading pl="2" fontSize={18}>
            Günün Yemegi
          </Heading>
          {rastgeleAnaYemek &&
            <SelectedCard heading={rastgeleAnaYemek?.Ad} url={rastgeleAnaYemek?.Fotograf} />
          }
        </VStack>
        {/*==============SECTİON 2=========== */}
        <VStack space={2}>
          <HStack space={1} alignItems={"center"}>
            <Heading pl="2" fontSize={18}>
              Sizin İçin
            </Heading>
            <Text fontSize={8} fontStyle={"italic"}>
              (Mevcut Ürünleriniz ile Yapabilirsiniz.)
            </Text>
          </HStack>
          {seciliYemekler && <RowScroll foodList={seciliYemekler} />}
        </VStack>
        {/*==============SECTİON 3=========== */}
        <VStack space={2}>
          <HStack space={1} alignItems={"center"}>
            <Heading pl="2" fontSize={18}>
              Alternatif Seçimler
            </Heading>
            <Text fontSize={8} fontStyle={"italic"}>
              (Alacağınız ek bir kaç ürün ile Yapabilirsiniz.)
            </Text>
          </HStack>
          {seciliYemekler && <RowScroll foodList={seciliYemekler} />}
        </VStack>
        {/*==============END SECTİONS=========== */}
      </VStack>
      </>
      }
      {/*==============SECTİON 1=========== */}
      
    </ScrollView>
  );
};

export default DashboardScreen;