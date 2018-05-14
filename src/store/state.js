import { playMode } from 'utils/config'
import { loadSearch, loadPlay, loadFavorite } from 'utils/cache'

const state = {
  userid: '',
  tag: '',
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite(),
  songUrl: ''
}
export default state
