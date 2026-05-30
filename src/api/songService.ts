import { ID, ISongModel, ISongCreate } from '@/types/types';
import { supabase } from '@/lib/supabaseClient';

export const getListSong = async () => {
  try {
    const { data, error } = await supabase
      .from('himnos')
      .select('*');

    if (error) throw error;

    // Map database fields to ISongModel
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description || '',
      musicalNote: item.musical_note,
      paragraphs: item.paragraphs,
      chorus: item.chorus,
      filename: item.filename
    }));
  } catch (error) {
    throw error;
  }
};

export const getSong = async (id: ID) => {
  try {
    const { data, error } = await supabase
      .from('himnos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      description: data.description || '',
      musicalNote: data.musical_note,
      paragraphs: data.paragraphs,
      chorus: data.chorus,
      filename: data.filename
    } as ISongModel;
  } catch (error) {
    throw error;
  }
};

export const createSong = async (songData: ISongCreate) => {
  try {
    const { title, musicalNote, paragraphs, chorus } = songData;
    // We don't have description in ISongCreate but ISongModel has it. 
    // Assuming songData might have it or we default to empty.
    const description = (songData as any).description || '';

    const { data, error } = await supabase
      .from('himnos')
      .insert([
        {
          title,
          musical_note: musicalNote,
          paragraphs,
          chorus,
          description
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      musicalNote: data.musical_note,
      paragraphs: data.paragraphs,
      chorus: data.chorus,
      filename: data.filename
    };
  } catch (error) {
    throw error;
  }
};

export const updateSong = async (songData: ISongModel) => {
  try {
    const { id, title, musicalNote, paragraphs, chorus, description, filename } = songData;

    const { data, error } = await supabase
      .from('himnos')
      .update({
        title,
        musical_note: musicalNote,
        paragraphs,
        chorus,
        description,
        filename
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      musicalNote: data.musical_note,
      paragraphs: data.paragraphs,
      chorus: data.chorus,
      filename: data.filename
    };
  } catch (error) {
    throw error;
  }
};

export const deleteSong = async (id: ID) => {
  try {
    const { error } = await supabase
      .from('himnos')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    throw error;
  }
};

export const syncSongsFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('himnos')
      .select('*')
      .order('title', { ascending: true });

    if (error) throw error;

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description || '',
      musicalNote: item.musical_note,
      paragraphs: item.paragraphs,
      chorus: item.chorus,
      filename: item.filename || ''
    }));
  } catch (error) {
    throw error;
  }
};