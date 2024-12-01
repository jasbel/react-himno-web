import { useContext } from 'react'
import { SongDinamicContext } from '@/state/SongDinamicContext'

export const useDinamicSong = () => {
  const {songs, changeSongBySearch, songsSearch, getSongs} = useContext(SongDinamicContext)
  return {songs, changeSongBySearch, songsSearch, getSongs}
}
