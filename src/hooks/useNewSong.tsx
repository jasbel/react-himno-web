import React, { useContext } from 'react'
import { SongContext } from '../state/SongNewContext'

export const useSong = () => {
  const {songs, songFavorites, changeSongBySearch, songsSearch} = useContext(SongContext)
  return {songs, songFavorites, changeSongBySearch, songsSearch}
}
