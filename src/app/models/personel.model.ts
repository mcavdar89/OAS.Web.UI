import { AlisVerisList } from "./alisveris-list.model";

export interface Personel {
id: number;
ad: string;
soyad: string;
birimId: number;
birimAd: string;
alisVerisList?: AlisVerisList[] | undefined;
}