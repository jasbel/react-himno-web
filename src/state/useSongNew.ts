import { useContext } from 'react';
import { SongNewContext } from './SongNewContext';

export const useSongNew = () => {
  const context = useContext(SongNewContext);
  if (!context) {
    throw new Error('useSongNew must be used within SongNewProvider');
  }
  return context;
};