import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext'
import { AspectRatio, Box, Center, Container, HStack, Heading, Image, Avatar, ScrollView, Stack, Text, VStack, View, Icon, Input, Pressable, Spacer } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RowScroll from '../components/Dashboard/RowScroll';
import SelectedCard from '../components/Shared/SelectedCard';
import Greetings from '../components/Dashboard/Greetings';
import Search from '../components/Dashboard/Search';
import { StyleSheet } from 'react-native';
import { belirliKategorilerdenBirerYemekAl, yemekler } from '../data/mocData'
import { Food } from '../types/ObjectTypes';

const DashboardScreen = () => {
  const { user, logout } = useAuth();
  const { colors, fonts } = useTheme();
  const [isSearch,setIsSearch] = useState<boolean>(false);
  const rastgeleAnaYemek = yemekler.find((item) => item.KategoriId === 1)
  const seciliYemekler: Food[] = belirliKategorilerdenBirerYemekAl();
  console.log(seciliYemekler);
  return (
    <ScrollView stickyHeaderIndices={[1]} paddingX={2} paddingTop={2} paddingBottom={2} style={{backgroundColor:colors.brand[900]}} >
    {!isSearch && <Greetings username={user?.username || ""} />}
      <Search onFocus={()=>setIsSearch(true)} onBlur={()=>setIsSearch(false)} />
      {
        isSearch ? 
        <View>
          <Text>
            Search Screen
          </Text>
        </View> 
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