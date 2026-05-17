

import { ID, ISongModel } from "@/types/types";
import { uuid } from "./helpers";
import { ERoutes } from "./enum";

export const titleApp = 'Himnos y Canticos';


export const initSong: () => ISongModel = () =>  ({
    "id": uuid(),
    "description": "",
    "title": "",
    musicalNote: "_",
    "chorus": [],
    "paragraphs": []
})

export const routeList = {
    edit: (id: ID) => '/' + ERoutes.editHimno + '/' + id,
    song: (id: ID) => '/' + ERoutes.item + '/' + id,
    songQuechua: (id: ID) => '/' + ERoutes.itemQuechua + '/' + id,
}
export const defaultSize = {
  widthMax: 1440,
  widthMin: 360,
}