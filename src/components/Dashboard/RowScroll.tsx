import React from 'react';
import { Box, HStack, Heading, ScrollView, Text, View } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomCard } from '../Shared/CustomCard';
import { Food, Recipe } from '../../types/ObjectTypes';
import { getCategoryName } from '../../data/mocData';


const RowScroll = ({foodList}:{foodList:Recipe[]}) => {
    return (
        <>
            <Box>
                <ScrollView horizontal={true}>
                    <HStack space={3}>
                        {foodList?.map((item,index)=>(
                            <CustomCard 
                            key={index}
                            url={item.img_url} 
                            categoryName={ "Düzenlenecek"} 
                            foodName={item.name}
                            foodDescription={item.description}
                            />
                        ))}
                    </HStack>
                </ScrollView>
            </Box>
        </>
    );
};

export default RowScroll;