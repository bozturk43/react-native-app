import React from 'react';
import { Box, HStack, Heading, ScrollView, Text, View } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomCard } from '../Shared/CustomCard';

const RowScroll = () => {
    return (
        <>
            <Box>
                <ScrollView horizontal={true}>
                    <HStack space={3}>
                        <CustomCard />
                        <CustomCard />
                        <CustomCard />
                    </HStack>
                </ScrollView>
            </Box>
        </>
    );
};

export default RowScroll;