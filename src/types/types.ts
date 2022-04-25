
export interface Paragraphs {
  paragraph: string
}

export interface Chorus {
  choir: string,
  noPositions: number[],
}

export interface Songs {
  id: string,
  num_song: string,
  title_es: string,
  description_es: string,
  // musicalNote: '_' | 'G|Sol' | 'A|La' | 'C|Do' | 'D|Re' | 'E|Mi' | 'B|Si' | 'F|Fa' | 'F#|Fa#' | 'C/D|DoRe'
  musicalNote: '_' | 'G|Sol' | 'A|La' | 'C|Do' | 'D|Re' | 'E|Mi' | 'B|Si' | 'F|Fa' | 'F#|Fa#' | 'C/D|Do-Re'
  ,
  paragraphs: Paragraphs[],
  chorus: Chorus[],
}