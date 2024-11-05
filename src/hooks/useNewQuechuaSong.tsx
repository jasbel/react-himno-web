import React, { useContext } from 'react'
import { SongQuechuaContext } from '../state/SongNewQuechuaContext'

export const useSongQuechua = () => {
  const {songs,songsSearch,  songFavorites, changeSongBySearch} = useContext(SongQuechuaContext)
  return {songs,songsSearch, songFavorites, changeSongBySearch}
}
