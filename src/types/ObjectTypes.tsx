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