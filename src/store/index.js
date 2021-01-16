import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import loadingModal from './loading-modal/index'

export default new Vuex.Store({
  modules: {
    loadingModal
  }
})
