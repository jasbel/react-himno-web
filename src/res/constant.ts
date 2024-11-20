import { ISong } from "@/types/types";
import { uuid } from "./helpers";

export const titleApp = 'Himnos y Canticos';


export const initSong: () => ISong = () =>  ({
    "id": uuid(),
    "code": "",
    "title": "",
    musicalNote: "_",
    "chorus": [],
    "paragraphs": []
})