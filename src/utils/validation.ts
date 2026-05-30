import { ISongModel, ISongCreate, TNote } from '@/types/types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateSong = (song: ISongModel | ISongCreate): ValidationResult => {
  const errors: string[] = [];

  // Title validation
  if (!song.title || song.title.trim().length === 0) {
    errors.push('El título es requerido');
  } else if (song.title.length > 200) {
    errors.push('El título no puede exceder 200 caracteres');
  }

  // Musical note validation
  if (!song.musicalNote) {
    errors.push('La nota musical es requerida');
  } else {
    const validNotes: TNote[] = ['_', 'G|Sol', 'A|La', 'C|Do', 'D|Re', 'E|Mi', 'B|Si', 'F|Fa', 'F#|Fa#', 'C/D|Do-Re'];
    if (!validNotes.includes(song.musicalNote as TNote)) {
      errors.push('Nota musical inválida');
    }
  }

  // Paragraphs validation
  if (!song.paragraphs || !Array.isArray(song.paragraphs)) {
    errors.push('Los párrafos deben ser un arreglo');
  } else if (song.paragraphs.length === 0) {
    errors.push('Debe haber al menos un párrafo');
  } else {
    song.paragraphs.forEach((paragraph, index) => {
      if (!paragraph.id) {
        errors.push(`Párrafo ${index + 1}: ID es requerido`);
      }
      if (!paragraph.paragraph || paragraph.paragraph.trim().length === 0) {
        errors.push(`Párrafo ${index + 1}: El texto del párrafo es requerido`);
      }
      if (!paragraph.chorusPos) {
        errors.push(`Párrafo ${index + 1}: chorusPos es requerido`);
      }
    });
  }

  // Chorus validation
  if (!song.chorus || !Array.isArray(song.chorus)) {
    errors.push('El coro debe ser un arreglo');
  } else if (song.chorus.length > 0) {
    song.chorus.forEach((choir, index) => {
      if (!choir.id) {
        errors.push(`Coro ${index + 1}: ID es requerido`);
      }
      if (!choir.choir || choir.choir.trim().length === 0) {
        errors.push(`Coro ${index + 1}: El texto del coro es requerido`);
      }
    });
  }

  // Description validation for ISongModel
  if ('description' in song && song.description !== undefined) {
    if (song.description.length > 500) {
      errors.push('La descripción no puede exceder 500 caracteres');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateSongId = (id: string): boolean => {
  return id && id.trim().length > 0;
};