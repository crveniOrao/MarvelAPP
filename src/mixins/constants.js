export default {
  methods: {
    $setLoadingModal(new_state) {
      this.$store.commit('loadingModal/setLoadingModal', new_state)
    }
  }
}
