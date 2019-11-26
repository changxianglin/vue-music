import { playMode } from 'common/js/config'

const state = {
  singer: {},
  playing: false,
  fullScrren: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: [],
  searchHistory: [],
}

export default state