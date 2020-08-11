<template>
  <div class="home">
    <div>
      <Navbar />
    </div>
    <aplayer class="custom-player" :audio="playlist" ref="aplayer" :listMaxHeight="listMaxHeight" />
  </div>
</template>

<script>
import { storage, db, auth, playlistsCollection } from "@/firebase";
import GoogleLogin from "vue-google-login";
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "Playlist",
  data() {
    return {
      listMaxHeight: 0,
    };
  },
  components: {
    GoogleLogin,
    Navbar,
  },
  mounted() {
    this.initialiselistMaxHeight();
    this.$store.dispatch("watchPlaylistUpdates");

    this.$watch(
      () => {
        return this.$refs.aplayer.currentMusic;
      },
      (item) => {
        this.$store.dispatch("updateCurrentMusicHandler", item.id);
      }
    );
  },
  computed: {
    playlist() {
      return this.$store.state.playlist;
    },
  },
  methods: {
    initialiselistMaxHeight() {
      const viewWidth = window.outerWidth;
      let viewHeight = window.outerHeight;
      const usedHeight = 56 + 66; // navbar + player info height
      const marginTop = 20;

      if (viewWidth > 990) {
        viewHeight = window.innerHeight;
        this.listMaxHeight = viewHeight - usedHeight - marginTop * 2;
        return;
      }
      this.listMaxHeight = viewHeight - usedHeight;
    },
    isPlaying() {
      const { media } = this.$refs.aplayer;
      return !media.paused;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.isPlaying()) {
      const answer = window.confirm(
        "Do you really want to leave? Your music will stop!"
      );
      if (answer) {
        this.$refs.aplayer.pause();
        next();
      } else {
        next(false);
      }
      return;
    }
    next();
  },
};
</script>
