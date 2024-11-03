import React, { useContext } from 'react'
import { SongQuechuaContext } from '../state/SongNewQuechuaContext'

export const useSongQuechua = () => {
  const {songs, songFavorites} = useContext(SongQuechuaContext)
  return {songs, songFavorites}
}
