import React from 'react';
import { Box, HStack, Heading, ScrollView, Text, View } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomCard } from '../Shared/CustomCard';

const RowScroll = () => {
    return (
        <>
            <Box>
                <Heading p={2} alignItems={"center"} justifyContent={"center"}>
                    <Text fontSize={"md"}>Bölüm 1</Text>
                    <MaterialCommunityIcons name="arrow-right-bold-box" color={"black"} size={20} />
                </Heading>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' }} marginBottom={2} />
                <ScrollView horizontal={true}>
                    <HStack space={3}>
                        <CustomCard />
                        <CustomCard />
                        <CustomCard />
                    </HStack>
                </ScrollView>
            </Box>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' }} />
        </>
    );
};

export default RowScroll;