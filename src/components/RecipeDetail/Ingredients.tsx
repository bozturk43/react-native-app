import React from 'react';
import { Ingredient } from '../../types/ObjectTypes';
import { Heading, HStack, Text, View } from 'native-base';


const Ingredients = ({ ingredientList, title }: { ingredientList: Ingredient[], title: string }) => {
    return (
        <>
            <Heading fontSize={14}>
                {title}
            </Heading>
            <HStack w="100%" alignItems="center" space={3} paddingX={2}>
                {ingredientList.map((item: Ingredient, index: number) => (
                    <View>
                        <Text key={index} fontSize={12}>{item.productName} </Text>
                        <Text fontSize={12}>{item.quantity} {`${item.conversionName?.con_name}`}</Text>
                    </View>
                ))}
            </HStack>
        </>
    );
};

export default Ingredients;