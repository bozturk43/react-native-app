import React from 'react';
import { Box, HStack, Heading, ScrollView, Text, View } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomCard } from '../Shared/CustomCard';
import { Food } from '../../types/ObjectTypes';
import { getCategoryName } from '../../data/mocData';

const RowScroll = ({foodList}:{foodList:Food[]}) => {
    return (
        <>
            <Box>
                <ScrollView horizontal={true}>
                    <HStack space={3}>
                        {foodList?.map((item,index)=>(
                            <CustomCard 
                            key={index}
                            url={item.Fotograf} 
                            categoryName={ getCategoryName(item.KategoriId) || ""} 
                            foodName={item.Ad}
                            foodDescription={item.Tarif}
                            />
                        ))}
                    </HStack>
                </ScrollView>
            </Box>
        </>
    );
};

export default RowScroll;