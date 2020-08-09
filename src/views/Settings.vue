<template>
  <div>
    <Navbar />
    <div class="container align-left pad-top-30">
      <div class="section">
        <h1 class="title">Settings</h1>
      </div>
      <!-- <div class="section">
        <h2 class="subtitle">Download playlist</h2>
        <b-button variant="primary" @click="downloadPlaylist()">Download playlist</b-button>
      </div>-->
      <div class="section">
        <h2 class="subtitle">Delete tracks</h2>
        <p>Select track number to delete</p>
        <b-form inline>
          <b-form-select
            id="inline-form-custom-select-pref"
            class="mb-2 mr-sm-2 mb-sm-0"
            :options="options"
            :value="null"
            v-model="selectedTrack"
            @change="deleteTrack()"
          ></b-form-select>
        </b-form>
      </div>
      <div class="section">
        <h2 class="subtitle">Clear playlist</h2>
        <b-link class="text-danger" @click="clearPlaylist()">Clear all tracks</b-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Settings",
  components: {
    Navbar,
  },
  data() {
    return {
      selectedTrack: null,
      options: [],
    };
  },
  computed: {
    playlist() {
      return this.$store.state.playlist;
    },
  },
  watch: {
    playlist() {
      this.initialiseOptions();
    },
  },
  methods: {
    initialiseOptions() {
      const playlistLength = this.$store.getters.getPlaylistLength;
      let array = [...Array(playlistLength).keys()].map((x) => ++x);
      array.unshift({ text: "Choose...", value: null });
      this.options = array;
    },
    // downloadPlaylist() {
    //   this.$store.dispatch("downloadPlaylist");
    // },
    deleteTrack() {
      if (!this.selectedTrack) {
        alert("Please select a track to delete");
        return;
      }
      const _this = this;

      setTimeout(function () {
        const answer = window.confirm(
          `Do you really want to delete track ${_this.selectedTrack}? This action is not reversible.`
        );
        if (answer) {
          _this.$store.dispatch("deleteTrack", _this.selectedTrack);
          _this.selectedTrack = null;
        }
      }, 0);
    },
    clearPlaylist() {
      const answer = window.confirm(
        "Do you really want to clear your playlist? All your tracks will be deleted. This action is not reversible."
      );
      if (answer) {
        this.$store.dispatch("clearPlaylist");
      }
    },
  },
  mounted() {
    this.$store.dispatch("watchPlaylistUpdates");
    this.initialiseOptions();
  },
};
</script>
