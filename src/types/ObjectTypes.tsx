
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Burayı güncelledik
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native'; // Burayı güncelledik

export type RootStackParamList = {
    RecipeDetailScreen: {recipeId:string,recipeName:string}
    // Diğer ekranlarınızı buraya ekleyin
};

export type TabParamList = {
    Dashboard: undefined;
    Dolabım: undefined;
    Settings: undefined;
};

export type NavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<RootStackParamList>,
    BottomTabNavigationProp<TabParamList>
>;

export interface Category {
    KategoriId: number;
    KategoriAd: string;
}
export interface Malzeme {
    MalzemeId: number,
    MalzemeAd: string
}
export interface Food {
    Id: number,
    KategoriId: number,
    Ad: string,
    Tarif:string,
    MalzemeIdleri: number[],
    Fotograf: string
}

export interface Recipe {
    id:string,
    name:string,
    description:string;
    categoryId:string;
    img_url:string;
    ingredients:Ingredient[],
    missingIngredients?:Ingredient[]
}
export interface Ingredient{
    productId:string,
    name?:string,
    quantity?:number,
    con_id?:string
}

export interface PantryItem {
    productId: string;
    name: string;
    quantity: number;
  }

export interface Product {
    id:string,
    name:string,
    unit:string,
    category:string,
    img_url:string
}
//0=> success 1=>fail
export interface HttpServiceReturnObject{
    message:string,
    code:0 | 1,
}