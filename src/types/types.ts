export type ID = string;
export type TNote = '_' | 'G|Sol' | 'A|La' | 'C|Do' | 'D|Re' | 'E|Mi' | 'B|Si' | 'F|Fa' | 'F#|Fa#' | 'C/D|Do-Re'
;

export interface IParagraphOld {
  paragraph: string,
}

export interface IChoirOld {
  choir: string,
  noPositions: number[],
}

export interface ISongOld {
  id: ID,
  num_song: string,
  title: string,
  description: string,
  musicalNote: TNote,
  paragraphs: IParagraphOld[],
  chorus: IChoirOld[],
}
export type IChorusPos = ([positionOrId: number | ID, repeat?: number]|(ID|number))[] | (ID|number)
export interface IParagraph {
  id: ID;
  paragraph: string;
  chorusPos: IChorusPos;
}

export interface IChoir {
  id: ID;
  choir: string,
}

export interface ISongCreate {
  code: string,
  title: string,
  musicalNote: TNote | string ,
  paragraphs: IParagraph[],
  chorus: IChoir[],
}
export interface ISong extends ISongCreate {
  id: ID,
}