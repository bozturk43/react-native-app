import React from 'react';
import { Box, HStack, Heading, Icon, Input, Pressable, ScrollView, Text, VStack, View } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
const categories: any[] = [
    {
        label: "Baslangıclar",
        icon: <Ionicons name="search-sharp" />
    },
    {
        label: "Ara Sıcaklar",
        icon: <Ionicons name="search-sharp" />
    },
    {
        label: "Ana Yemekler",
        icon: <Ionicons name="search-sharp" />
    },
    {
        label: "Soguk Mezeler",
        icon: <Ionicons name="search-sharp" />
    },
    {
        label: "Tatlılar",
        icon: <Ionicons name="search-sharp" />
    },
    {
        label: "İçecekler",
        icon: <Ionicons name="search-sharp" />
    },

]


const Search = () => {
    return (
        <VStack space={2} backgroundColor={"brand.900"}>
            <Input
                background={"#fff"}
                backgroundColor={"#fff"}
                placeholder="Search"
                variant="filled"
                width="100%" borderRadius="10"
                py="1" px="2"
                InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="search-sharp" />} />} />
            <ScrollView horizontal={true}>
                <HStack space={2}>
                    {categories.map((item, index) => {
                        return (
                            <Pressable key={index} backgroundColor={"brand.700"} borderRadius={"md"} padding={1} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                <HStack>
                                    <Icon size="4" color="gray.400" as={item.icon} />
                                    <Text color={"white"} fontSize={10}>{item.label}</Text>
                                </HStack>
                            </Pressable>
                        )
                    })}
                </HStack>
            </ScrollView>
        </VStack>
    );
};

export default Search;