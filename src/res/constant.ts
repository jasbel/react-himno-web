import { ID, ISong } from "@/types/types";
import { uuid } from "./helpers";
import { ERoutes } from "./enum";

export const titleApp = 'Himnos y Canticos';


export const initSong: () => ISong = () =>  ({
    "id": uuid(),
    "code": "",
    "title": "",
    musicalNote: "_",
    "chorus": [],
    "paragraphs": []
})

export const routeList = {
    edit: (id: ID) => '/' + ERoutes.editHimno + '/' + id,
}