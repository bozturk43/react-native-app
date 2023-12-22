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