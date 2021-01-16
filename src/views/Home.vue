<template>
  <div class="home">
    <app-header :query="query" @search="search" @getinitial="getInitialData()"></app-header>
    <v-container>
      <v-row>
        <v-col 
        v-for="(comic, index) in comics"
        :key="index + 'comic'"
        cols="12"
        sm="4">
          <v-card>
            <v-img
              class="white--text align-end"
              height="25em"
              :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
            >
              <v-card-title>{{ comic.title }}</v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Notifications -->
    <v-snackbar
      v-model="snackbar"
      bottom
      left
    >
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import AppHeader from '../components/Header'
import APIGetInitialData from '../services/marvel/comics/getInitialData'
import APISearch from '../services/marvel/comics/getSearch'


export default {
  name: 'Home',
  components: {
    AppHeader
  },
  mounted () {
    if (Object.keys(this.$route.query).length > 0) {
      if (this.$route.query.title !== undefined) {
        this.query.title = this.$route.query.title
      }
      if (this.$route.query.date_from) {
        this.query.date_from = parseInt(this.$route.query.date_from)
        this.query.show_filters = true
      } else {
        this.query.date_from = ''
      }
      if (this.$route.query.date_to) {
        this.query.date_to = parseInt(this.$route.query.date_to)
        this.query.show_filters = true
      } else {
        this.query.date_from = ''
      }
      
      this.search(this.query)
    } else {
      this.getInitialData()
    }
  },
  data () {
    return {
      comics: [],
      query: {
        title: "",
        date_from: "",
        date_to: "",
        show_filters: false
      },
      snackbar: false,
      snackText: ''
    }
  },
  methods: {
    getInitialData () {
      this.query = {
        title: "",
        date_from: "",
        date_to: "",
        show_filters: false
      }
      this.$setLoadingModal(true)
      APIGetInitialData
      .call()
      .then(response => {
        this.comics = response.data.data.results
        this.$setLoadingModal(false)
        if (response.data.data.results.length < 1) {
          this.snackText = 'No results'
          this.snackbar = true
        }
      })
      .catch(e => {
        console.log(e.response)
        this.snackText = 'Something went wrong'
        this.snackbar = true
        this.$setLoadingModal(false)
      })
    },
    search(value) {
      if (this.validateFields()) return

      this.$setLoadingModal(true)
      let date_range = ''
      if (value.date_from != '' && value.date_to != '') {
        date_range = `${value.date_from}-01-01%2C${value.date_to}-01-01`
      }
      let data = {
        title: value.title,
        date_range: date_range
      }
      APISearch
      .call(data)
      .then(response => {
        this.comics = response.data.data.results
        this.$router.push({ path: '/', query: {title: value.title, date_from: value.date_from, date_to: value.date_to} })
        this.$setLoadingModal(false)
        if (response.data.data.results.length < 1) {
          this.snackText = 'No results'
          this.snackbar = true
        }
      })
      .catch(e => {
        console.log(e.response)
        this.snackText = 'Something went wrong'
        this.snackbar = true
        this.$setLoadingModal(false)
      })
    },
    validateFields () {
      if (this.query.date_from > this.query.date_to) {
        this.snackText = 'Date To must be bigger number'
        this.snackbar = true
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card__title {
  background: #000000b9;
  text-shadow: 1px 1px black;
}
</style>
