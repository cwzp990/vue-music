import * as types from './mutation-types'
import { api } from 'api/index'
import { setToken } from 'utils/cookie'

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const login = function ({commit}, userinfo) {
  return new Promise((resolve, reject) => {
    api.getLoginCellphoneResource(userinfo.username, userinfo.password).then(res => {
      if (res.data.code === 200) {
        setToken(res.data.account.id)
        commit(types.SET_USER_ID, res.data.account.id)
        resolve()
      }
    }).catch(err => {
      reject(err)
    })
  })
}
