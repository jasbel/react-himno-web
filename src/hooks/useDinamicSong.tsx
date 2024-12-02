import { useContext } from 'react'
import { SongDinamicContext } from '@/state/SongDinamicContext'

export const useDinamicSong = () => {
  const {song, songs, changeSongBySearch, songsSearch, getSongs, getSong} = useContext(SongDinamicContext)
  return {song, songs, changeSongBySearch, songsSearch, getSongs, getSong}
}
