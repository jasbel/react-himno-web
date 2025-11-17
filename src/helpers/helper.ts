import { uuid } from "@/res/helpers";
import { IChorusPos, ID, IDPos, ISong, ISongListV1 } from "@/types/types";

const convertDecimalToHex = (val: number) => {
  if (val >= 1) {
    return 'ff';
  }
  if (val <= 0) {
    return '00';
  }

  let convert: number | string = parseInt((255 * val).toString(), 10);
  convert = convert.toString(16);
  if (convert.length === 1) {
    convert = '0' + convert;
  }
  return convert;
};

export const opacityColor = (color: string, opacity = 0.5) => {
  let hexString = convertDecimalToHex(opacity);
  const currentOpacityColor = color + hexString;
  return currentOpacityColor;
};

interface IChoirObj {
  type: "idx" | 'id';
  value: IDPos;
  id?: ID;
  pos?: number;
  repeat: number;
}

const getChoirObject = (posOrId: IDPos, repeat: number = 1): IChoirObj => {
  return {
    pos: typeof posOrId === 'number' ? posOrId : undefined,
    id: typeof posOrId === 'string' ? posOrId : undefined,
    value: posOrId,
    type: typeof posOrId === 'number' ? 'idx' : 'id',
    repeat: repeat||1
  }
}

export const getIdPosByChoir = (chorusIdOrPos: IChorusPos) => {
  const res: IChoirObj[] = [];

  if (typeof chorusIdOrPos === 'string' || typeof chorusIdOrPos === 'number') {
    res.push(getChoirObject(chorusIdOrPos))
  }

  if (Array.isArray(chorusIdOrPos)) {
    chorusIdOrPos.forEach(it => {
      if (Array.isArray(it)) {
        res.push(getChoirObject(it[0], it[1]))
        return;
      }
      if (typeof it === 'string' || typeof it === 'number') {
        res.push(getChoirObject(it))
      }
    });
  }
  return res
}

export const songV1ToNew = (data: ISongListV1): ISong => {
  const id = uuid()
 return {
  ...data,
  id: id,
  code: id,
  title: data.title,
  musicalNote: data.musicalNote,
  paragraphs: [],
  chorus: []
}
}
