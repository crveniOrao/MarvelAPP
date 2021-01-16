const loading_modal = {
  strict: true,
  namespaced: true,
  state: {
    loadingModal: false
  },
  mutations: {
    setLoadingModal (state, payload) {
      state.loadingModal = payload
    }
  }
}

export default loading_modal