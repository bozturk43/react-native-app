import React, { useRef, useState } from 'react';
import {HStack, Heading, Icon, Input, Pressable, ScrollView, Text, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity, View } from 'react-native';
import { belirliKategorilerdenBirerYemekAl } from '../../data/mocData';
import { Food } from '../../types/ObjectTypes';
import ColScroll from './ColScroll';
import SearchResult from './SearchResult';

interface Props{
    onFocus:()=>void;
    isOnSearch:boolean;
    closeSearch:()=>void;
    onTextChange: (text: string) => void;
    onCategorySelect: (cetgoryId: number) => void;
}

const categories: any[] = [
    {
        label: "Baslangıclar",
        icon: <Ionicons name="search-sharp" />,
        id:-1
    },
    {
        label: "Ara Sıcaklar",
        icon: <Ionicons name="search-sharp" />,
        id:-1
    },
    {
        label: "Ana Yemekler",
        icon: <Ionicons name="search-sharp" />,
        id:1
    },
    {
        label: "Soguk Mezeler",
        icon: <Ionicons name="search-sharp" />,
        id:-1
    },
    {
        label: "Tatlılar",
        icon: <Ionicons name="search-sharp" />,
        id:2
    },
    {
        label: "İçecekler",
        icon: <Ionicons name="search-sharp" />,
        id:-1
    },

]


const Search = ({onFocus,isOnSearch,closeSearch,onTextChange,onCategorySelect}:Props) => {
    const [searchText, setSearchText] = useState('');

    const onClose = () =>{
        closeSearch();
        setSearchText("");
    }

    return (
        <>
        <VStack space={2} backgroundColor={"brand.900"}>
            <Input
                onFocus={()=>onFocus()}
                background={"#fff"}
                backgroundColor={"#fff"}
                placeholder="Search"
                onChangeText={(text) =>{
                    onTextChange(text);
                    setSearchText(text);
                }}
                variant="filled"
                width="100%" borderRadius="10"
                py="1" px="2"
                value={searchText}
                InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="search-sharp" />} />} 
                InputRightElement={
                    isOnSearch ? (
                      <TouchableOpacity onPress={()=>onClose()} style={{paddingHorizontal:4}}>
                         <Ionicons name="close-circle-outline" size={16} color="gray" />
                      </TouchableOpacity>
                    ) : undefined
                  }
                />
            <ScrollView horizontal={true}>
                <HStack space={2}>
                    {categories.map((item, index) => {
                        return (
                            <Pressable 
                                key={index}
                                onPress={()=>onCategorySelect(item.id)}
                                backgroundColor={"brand.700"} 
                                borderRadius={"md"} 
                                padding={1} 
                                justifyContent={"flex-start"} 
                                alignItems={"flex-start"}>
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
        
        </>

    );
};

export default Search;