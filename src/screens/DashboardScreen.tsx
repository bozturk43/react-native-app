import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Center, Container, HStack, Heading, ScrollView, Text, VStack, View } from 'native-base';
import { CustomCard } from '../components/Shared/CustomCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RowScroll from '../components/Dashboard/RowScroll';

const DashboardScreen = () => {
  const { user, logout } = useAuth();

  return (
    <ScrollView paddingTop={2} paddingBottom={2}>
      <VStack space={4}>
        <RowScroll />
        <RowScroll />
        <RowScroll />
      </VStack>
    </ScrollView>
  );
};

export default DashboardScreen;