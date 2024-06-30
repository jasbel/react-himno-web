type uuidV4 = string;
type TNote = '_' | 'G|Sol' | 'A|La' | 'C|Do' | 'D|Re' | 'E|Mi' | 'B|Si' | 'F|Fa' | 'F#|Fa#' | 'C/D|Do-Re'
;

export interface IParagraph {
  paragraph: string,
}

export interface IChoir {
  choir: string,
  noPositions: number[],
}

export interface ISong {
  id: uuidV4,
  num_song: string,
  title: string,
  description: string,
  musicalNote: TNote,
  paragraphs: IParagraph[],
  chorus: IChoir[],
}
export interface IParagraph2 {
  id: uuidV4;
  paragraph: string;
  chorusPos: [position: number, repeat?: number][];

}

export interface IChoir2 {
  id: uuidV4;
  choir: string,
}

export interface ISong2 {
  id: uuidV4,
  code: string,
  title: string,
  musicalNote: TNote,
  paragraphs: IParagraph2[],
  chorus: IChoir2[],
}