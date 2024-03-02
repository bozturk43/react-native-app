import { View } from "native-base";
import { belirliKategorilerdenBirerYemekAl } from "../../data/mocData";
import { Food } from "../../types/ObjectTypes";
import ColScroll from "./ColScroll";
import { useEffect } from "react";

interface Props{
    searchText:string
}

 const SearchResult = ({searchText}:Props) =>{
    const seciliYemekler: Food[] = belirliKategorilerdenBirerYemekAl();

    useEffect(()=>{
        if(searchText !== ""){
            searchByText(searchText);
        }
    },[searchText])

    const searchByText = (text:string) =>{
        console.log("Texte Göre Arama",text);
    }
    const filterByCategoryId = () =>{
        console.log("Id Göre Arama");
    }
    return(
        <View style={{paddingVertical:12}}>
            {seciliYemekler && <ColScroll foodList={seciliYemekler} />}
        </View>
    )
}

export default SearchResult;