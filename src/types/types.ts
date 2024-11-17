export type ID = string;
type TNote = '_' | 'G|Sol' | 'A|La' | 'C|Do' | 'D|Re' | 'E|Mi' | 'B|Si' | 'F|Fa' | 'F#|Fa#' | 'C/D|Do-Re'
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
export interface IParagraph {
  id: ID;
  paragraph: string;
  chorusPos: [positionOrId: number | ID, repeat?: number][];

}

export interface IChoir {
  id: ID;
  choir: string,
}

export interface ISong {
  id: ID,
  code: string,
  title: string,
  musicalNote: TNote | string,
  paragraphs: IParagraph[],
  chorus: IChoir[],
}

export type ISongSearch = Pick<ISong, 'id' | 'code' | 'title' | 
'musicalNote' | 'paragraphs'> // & {description: string}