import { PersonelSepetUrun } from "./personel-sepet-urun.model";


export interface PersonelSepet {
    id: string,
    personelId: number,
    personelIsim: string,
    toplamTutar: number,
    personelSepetUrunList: PersonelSepetUrun[]
}
