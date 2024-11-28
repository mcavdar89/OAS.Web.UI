import { AlisVerisList } from "./personel-sepet-urun.model";

export interface Personel {
id: number;
ad: string;
soyad: string;
birimId: number;
birimAd: string;
alisVerisList?: AlisVerisList[] | undefined;
}