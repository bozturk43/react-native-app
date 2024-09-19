import { Category, Food, Malzeme } from "../types/ObjectTypes"

export const kategoriler: Category[] = [
    {
        KategoriId: 1,
        KategoriAd: "Ana Yemekler"
    },
    {
        KategoriId: 2,
        KategoriAd: "Tatlılar"
    },
    {
        KategoriId: 3,
        KategoriAd: "Salatalar"
    },
    {
        KategoriId: 4,
        KategoriAd: "Çorbalar"
    },
];

const malzemeler: Malzeme[] = [
    { MalzemeId: 1, MalzemeAd: "Un" },
    { MalzemeId: 2, MalzemeAd: "Şeker" },
    { MalzemeId: 3, MalzemeAd: "Tuz" },
    { MalzemeId: 4, MalzemeAd: "Sıvı Yağ" },
    { MalzemeId: 5, MalzemeAd: "Yumurta" },
    { MalzemeId: 6, MalzemeAd: "Süt" },
    { MalzemeId: 7, MalzemeAd: "Yoğurt" },
    { MalzemeId: 8, MalzemeAd: "Krema" },
    { MalzemeId: 9, MalzemeAd: "Mısır Unu" },
    { MalzemeId: 10, MalzemeAd: "Kabartma Tozu" },
    { MalzemeId: 11, MalzemeAd: "Vanilya Özütü" },
    { MalzemeId: 12, MalzemeAd: "Kakao" },
    { MalzemeId: 13, MalzemeAd: "Hindistancevizi" },
    { MalzemeId: 14, MalzemeAd: "Badem Unu" },
    { MalzemeId: 15, MalzemeAd: "Bal" },
    { MalzemeId: 16, MalzemeAd: "Kurutulmuş Meyve" },
    { MalzemeId: 17, MalzemeAd: "Çikolata" },
    { MalzemeId: 18, MalzemeAd: "Muz" },
    { MalzemeId: 19, MalzemeAd: "Çilek" },
    { MalzemeId: 20, MalzemeAd: "Portakal" },
    { MalzemeId: 21, MalzemeAd: "Limon" },
    { MalzemeId: 22, MalzemeAd: "Ananas" },
    { MalzemeId: 23, MalzemeAd: "Elma" },
    { MalzemeId: 24, MalzemeAd: "Armut" },
    { MalzemeId: 25, MalzemeAd: "Karpuz" },
    { MalzemeId: 26, MalzemeAd: "Kavun" },
    { MalzemeId: 27, MalzemeAd: "Mandalina" },
    { MalzemeId: 28, MalzemeAd: "Vişne" },
    { MalzemeId: 29, MalzemeAd: "Üzüm" },
    { MalzemeId: 30, MalzemeAd: "Kiraz" },
    { MalzemeId: 31, MalzemeAd: "Kırmızı Lahana" },
    { MalzemeId: 32, MalzemeAd: "Karnabahar" },
    { MalzemeId: 33, MalzemeAd: "Marul" },
    { MalzemeId: 34, MalzemeAd: "Ispanak" },
    { MalzemeId: 35, MalzemeAd: "Maydanoz" },
    { MalzemeId: 36, MalzemeAd: "Dereotu" },
    { MalzemeId: 37, MalzemeAd: "Nane" },
    { MalzemeId: 38, MalzemeAd: "Taze Fesleğen" },
    { MalzemeId: 39, MalzemeAd: "Taze Kekik" },
    { MalzemeId: 40, MalzemeAd: "Frenk Soğanı" },
    { MalzemeId: 41, MalzemeAd: "Sarımsak" },
    { MalzemeId: 42, MalzemeAd: "Zencefil" },
    { MalzemeId: 43, MalzemeAd: "Kekik" },
    { MalzemeId: 44, MalzemeAd: "Köri" },
    { MalzemeId: 45, MalzemeAd: "Kırmızı Biber" },
    { MalzemeId: 46, MalzemeAd: "Yeşil Biber" },
    { MalzemeId: 47, MalzemeAd: "Havuç" },
    { MalzemeId: 48, MalzemeAd: "Patates" },
    { MalzemeId: 49, MalzemeAd: "Brokoli" },
    { MalzemeId: 50, MalzemeAd: "Karnabahar" },
    { MalzemeId: 51, MalzemeAd: "Mantar" },
    { MalzemeId: 52, MalzemeAd: "Kabak" },
    { MalzemeId: 53, MalzemeAd: "Enginar" },
    { MalzemeId: 54, MalzemeAd: "Kırmızı Lahana" },
    { MalzemeId: 55, MalzemeAd: "Bezelye" },
    { MalzemeId: 56, MalzemeAd: "Biber Salçası" },
    { MalzemeId: 57, MalzemeAd: "Domates Salçası" },
    { MalzemeId: 58, MalzemeAd: "Hardal" },
    { MalzemeId: 59, MalzemeAd: "Tarçın" },
    { MalzemeId: 60, MalzemeAd: "Kimyon" }
  ];
  

export const yemekler: Food[] = [
    {
        Id: 1,
        KategoriId: 1,
        Ad: "Fırında Tavuk",
        Tarif: "Tavukları fırına vermeden önce marine edin ve baharatlayın. Fırında pişirin ve sıcak servis yapın.",
        MalzemeIdleri: [1, 2, 3, 4],
        Fotograf: "https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        Id: 2,
        KategoriId: 1,
        Ad: "Izgara Somon",
        Tarif: "Somonu ızgarada pişirirken zeytinyağı ve baharatlarla marine edin. Üzerine limon suyu sıkarak servis yapın.",
        MalzemeIdleri: [5, 6, 7, 8],
        Fotograf: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        Id: 3,
        KategoriId: 1,
        Ad: "Sebzeli Kuzu Güveç",
        Tarif: "Kuzu etini doğrayın, sebzelerle birlikte güveçte pişirin. Servis yapmadan önce maydanozla süsleyin.",
        MalzemeIdleri: [7, 8, 6, 9],
        Fotograf: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        Id: 4,
        KategoriId: 1,
        Ad: "Fırında Patates Kızartması",
        Tarif: "Patatesleri dilimleyin, baharatlarla karıştırın ve fırında pişirin. Altın rengi alana kadar bekleyin.",
        MalzemeIdleri: [8, 10, 11, 12],
        Fotograf: "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        Id: 5,
        KategoriId: 2,
        Ad: "Çikolatalı Kek",
        Tarif: "Kek karışımını hazırlayın, fırında pişirin ve çikolata sosuyla servis yapın.",
        MalzemeIdleri: [13, 14, 15, 16],
        Fotograf: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        Id: 6,
        KategoriId: 2,
        Ad: "Muzlu Cheesecake",
        Tarif: "Bisküvileri ezin, üzerine cheesecake karışımını dökün ve muz dilimleriyle süsleyin.",
        MalzemeIdleri: [17, 18, 19, 20],
        Fotograf: "https://images.pexels.com/photos/6364473/pexels-photo-6364473.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
    },
    {
        Id: 7,
        KategoriId: 2,
        Ad: "Profiterol",
        Tarif: "Küçük toplar halinde hamuru pişirin, içlerine krema doldurun ve çikolata sosu ekleyin.",
        MalzemeIdleri: [21, 22, 23, 24],
        Fotograf: "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        Id: 8,
        KategoriId: 2,
        Ad: "Tiramisu",
        Tarif: "Mascarpone ve kahveli bisküvi katmanlarıyla tatlıyı hazırlayın ve buzdolabında soğutun.",
        MalzemeIdleri: [25, 26, 27, 28],
        Fotograf: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        Id: 9,
        KategoriId: 3,
        Ad: "Mevsim Salatası",
        Tarif: "Mevsim sebzelerini doğrayın, sos ile karıştırın ve üstüne peynir serpin.",
        MalzemeIdleri: [29, 30, 31, 32],
        Fotograf: "https://images.pexels.com/photos/2116094/pexels-photo-2116094.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        Id: 10,
        KategoriId: 3,
        Ad: "Cevizli Roka Salatası",
        Tarif: "Rokayı doğrayın, ceviz ekleyin ve zeytinyağı ile karıştırın.",
        MalzemeIdleri: [33, 34, 35, 36],
        Fotograf: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        Id: 11,
        KategoriId: 3,
        Ad: "Akdeniz Salatası",
        Tarif: "Dolmalık biber, salatalık, domates, zeytin ve peynirle salata hazırlayın.",
        MalzemeIdleri: [37, 38, 39, 40],
        Fotograf: "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        Id: 12,
        KategoriId: 3,
        Ad: "Ton Balıklı Salata",
        Tarif: "Ton balığını doğrayın ve sebzelerle karıştırın. Limon suyu ve zeytinyağı ekleyin.",
        MalzemeIdleri: [41, 42, 43, 44],
        Fotograf: "https://images.pexels.com/photos/793759/pexels-photo-793759.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        Id: 13,
        KategoriId: 4,
        Ad: "Mercimek Çorbası",
        Tarif: "Kırmızı mercimeği pişirin, sebzelerle karıştırın ve blenderdan geçirin.",
        MalzemeIdleri: [45, 46, 47, 48],
        Fotograf: "https://images.pexels.com/photos/64208/pexels-photo-64208.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        Id: 14,
        KategoriId: 4,
        Ad: "Domates Çorbası",
        Tarif: "Domatesleri rendeleyin, tereyağında pişirin ve kremayla servis yapın.",
        MalzemeIdleri: [49, 50, 51, 52],
        Fotograf: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        Id: 15,
        KategoriId: 4,
        Ad: "Tavuklu Noodle Çorbası",
        Tarif: "Tavuk suyu hazırlayın, noodle ekleyin ve baharatlarla tatlandırın.",
        MalzemeIdleri: [53, 54, 55, 56],
        Fotograf: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        Id: 16,
        KategoriId: 4,
        Ad: "Kabak Çorbası",
        Tarif: "Kabakları doğrayın, suda pişirin ve blenderdan geçirerek püre haline getirin.",
        MalzemeIdleri: [57, 58, 59, 60],
        Fotograf: "https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
];

export function belirliKategorilerdenBirerYemekAl() {
    const secilenYemekler:any = [];
    yemekler.forEach((yemek) => {
      if (!secilenYemekler[yemek.KategoriId]) {
        secilenYemekler[yemek.KategoriId] = yemek;
      }
    });
    return secilenYemekler as Food[];
}
export function getCategoryName(id:number){
    const kategori = kategoriler.find((item)=>item.KategoriId === id);
    return kategori?.KategoriAd
}

export function searchFoods(text:string){
    const filteredFoods : Food[]  = yemekler.filter((item)=>item.Ad.includes(text));
    return filteredFoods;


}
  