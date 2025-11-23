export type ID = string;
export type IDPos = ID|number;
export type TNote = '_' | 'G|Sol' | 'A|La' | 'C|Do' | 'D|Re' | 'E|Mi' | 'B|Si' | 'F|Fa' | 'F#|Fa#' | 'C/D|Do-Re'
;

export interface IParagraphOld {
  paragraph: string,
}

export interface IChoirOld {
  choir: string,
  noPositions: number[],
}

export interface ISongListV1 {
  title: string,
  description: string,
  musicalNote: TNote,
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

export interface ISongItem  {
  id: ID,
  description: string,
  title: string,
  musicalNote: TNote ,
  paragraphs: {
    paragraph: string
  }[],
  chorus: IChoir[],
}
export interface ISongV1 extends ISongBase {
  id: ID,
}
export interface ISong extends ISongBase {
  id: ID,
  description: string,
  filename?: string,
}

export interface ISong extends ISongBase {
  id: ID,
  description: string,
  filename?: string,
}

export interface ISongSingle {
  title: string,
  musicalNote: TNote,
  description: string,
}