<template>
  <v-container>
    <v-row class="mt-10 mb-6">
      <v-col cols="12" sm="6">
        <div class="left-tab">
          <router-link class="mr-5" to="/" @click.native="$emit('getinitial')"
            >Home</router-link
          >
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="right-tab d-flex align-center">
          <v-text-field
              solo
              label="Search"
              append-icon="mdi-magnify"
              hide-details
              v-model="query.title"
              @click:append="emitDataForSearch()"
              @keyup.enter="emitDataForSearch()"
            ></v-text-field>
          <v-btn
            class="ml-3"
            fab
            small
            @click="query.show_filters = !query.show_filters"
          >
            <v-icon dark> mdi-calendar-clock </v-icon>
          </v-btn>
        </div>

        <v-expand-transition>
          <div class="expanded-filters mt-5" v-show="query.show_filters">
            <v-select
              prepend-icon="mdi-calendar"
              class="select-filter"
              :items="dateRanges"
              label="Date From"
              v-model="query.date_from"
              @keyup.enter.prevent="emitDataForSearch()"
            ></v-select>
            <v-select
              prepend-icon="mdi-calendar"
              class="select-filter ml-3"
              :items="dateRanges"
              label="Date To"
              v-model="query.date_to"
              @keyup.enter.prevent="emitDataForSearch()"
            ></v-select>
          </div>
        </v-expand-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    query: {
      title: "",
      date_from: "",
      date_to: "",
      show_filters: false
    },
  },
  data() {
    return {
    };
  },
  computed: {
    dateRanges() {
      let ranges = [];
      for (let i = 2021; i > 1950; i--) {
        ranges.push(i);
      }
      return ranges;
    },
  },
  methods: {
    emitDataForSearch() {
      this.$emit("search", this.query);
    },
  },
};
</script>

<style lang="scss" scoped>
.right-tab {
  align-items: center;
  justify-content: space-between;
}

.expanded-filters {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>