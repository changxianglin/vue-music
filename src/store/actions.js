import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util' 
import { saveSearch, deleteSearch, clearSearch } from 'common/js/cache'

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
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  let currentSong = playList[currentIndex]

  let fpIndex = findIndex(playList, song)
  currentIndex++
  playList.splice(currentIndex, 0, song)
  if(fpIndex > -1) {
    if(currentIndex > fpIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--
    } else {
      playList.splice(fpIndex + 1, 1)
    }
  }

  let currentSIndex = findIndex(sequenceList, currentSong) + 1

  let fsIndex = findIndex(sequenceList, song)


  sequenceList.splice(currentSIndex, 0, song)

  if(fsIndex > -1) {
    if(currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}