<template>
  <v-overlay :value="modalVisible">
    <v-progress-circular
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  props: {
    modalVisible: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {

    }
  }
}
</script>

