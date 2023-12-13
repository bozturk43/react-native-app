import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext'
import { AspectRatio, Box, Center, Container, HStack, Heading, Image, Avatar, ScrollView, Stack, Text, VStack, View, Icon, Input, Pressable, Spacer } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RowScroll from '../components/Dashboard/RowScroll';
import SelectedCard from '../components/Shared/SelectedCard';
import Greetings from '../components/Dashboard/Greetings';
import Search from '../components/Dashboard/Search';
import { StyleSheet } from 'react-native';

const DashboardScreen = () => {
  const { user, logout } = useAuth();
  const { colors,fonts } = useTheme();
  return (
    <ScrollView stickyHeaderIndices={[1]} paddingX={2} paddingTop={2} paddingBottom={2} style={{backgroundColor:colors.brand[900]}} >
      <Greetings username={user?.username || ""} />
      <Search/>
      {/*==============SECTİON 1=========== */}
      <VStack space={4}>
        <VStack space={2} paddingY={2}>
          <Heading pl="2" fontSize={18}>
            Günün Yemegi
          </Heading>
          <SelectedCard />
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
          <RowScroll />
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
          <RowScroll />
        </VStack>
        {/*==============END SECTİONS=========== */}
      </VStack>
    </ScrollView>
  );
};

export default DashboardScreen;