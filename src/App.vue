<template>
  <v-app>
    <router-view/>
    <loading-modal :modalVisible="$store.state.loadingModal.loadingModal"></loading-modal>
  </v-app>
</template>

<script>
import LoadingModal from './components/LoadingModal';

export default {
  name: 'App',

  components: {
    LoadingModal
  },

  data: () => ({
    //
  }),
};
</script>
