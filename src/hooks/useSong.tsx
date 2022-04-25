import React, { useContext } from 'react'
import { SongContext } from '../state/SongContext'

export const useSong = () => {
  const {songs, songFavorites} = useContext(SongContext)
  return {songs, songFavorites}
}
