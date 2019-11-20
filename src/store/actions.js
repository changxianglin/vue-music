import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util' 

const findIndex = (list, song) => {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = ({ commit, state}, {list, index}) => {
  commit(types.SET_SEQUENCE_LIST, list)
  if(state.mode === playMode.random) {
    const randomlist = shuffle(list)
    commit(types.SET_PLAYLIST, randomlist)
    index = findIndex(randomlist, list[index])  
  } else {
    commit(types.SET_PLAYLIST, list) 
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
} 

export const randomPlay = ({commit}, {list}) => {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  const randomlist = shuffle(list)
  commit(types.SET_PLAYLIST, randomlist)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function({ commit, state }, song) {
  let playlist = state.playlist
  let sequenceList = state.sequenceList
  let currentIndex = state.currentIndex

  let currentSong = playlist[currentIndex]

  let fpIndex = findIndex(playlist, song)
  currentIndex++
  playlist.splice(currentIndex, 0, song)
}