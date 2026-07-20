export type ID = string;
export type IDPos = ID|number;
export type TNote = '_' | 'G|Sol' | 'A|La' | 'C|Do' | 'D|Re' | 'E|Mi' | 'B|Si' | 'F|Fa' | 'F#|Fa#' | 'C/D|Do-Re'
;

export interface ISongListV1 extends ISongBase {
  id: ID,
  description: string,
  filename: string,
}
export type IChorusPos = ([positionOrId: IDPos, repeat?: number]|(IDPos))[] | (IDPos)
export interface IParagraph {
  id: ID;
  paragraph: string;
  chorusPos: IChorusPos;
}

export interface IChoir {
  id: ID;
  choir: string,
}

export interface ISongBase {
  title: string,
  musicalNote: TNote ,
  paragraphs: IParagraph[],
  chorus: IChoir[],
}

export interface ISongCreate extends ISongBase {}

export interface IParagraphItem {
  id: ID;
  paragraph: string;
  chorusPos?: IChorusPos;
}

export interface ISongItem  {
  id: ID,
  description: string,
  title: string,
  musicalNote: TNote ,
  paragraphs: IParagraphItem[],
  chorus: IChoir[],
}
export interface ISongV1Model extends ISongBase {
  id: ID,
}
export interface ISongModel extends ISongBase {
  id: ID,
  description: string,
  filename?: string,
}

export interface ISong extends ISongModel {
  favorite: boolean
}

export interface ISongSingle {
  title: string,
  musicalNote: TNote,
  description: string,
}