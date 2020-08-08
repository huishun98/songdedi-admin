<template>
  <div class="home">
    <div>
      <Navbar />
    </div>
    <aplayer class="custom-player" :audio="playlist" />
  </div>
</template>

<script>
import { storage, db, auth, playlistsCollection } from "@/firebase";
import GoogleLogin from "vue-google-login";
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "Playlist",
  // data() {
  //   return {
  //     playlist: [],
  //   };
  // },
  components: {
    GoogleLogin,
    Navbar,
  },
  computed: {
    playlist() {
      return this.$store.state.playlist;
    },
  },
  methods: {
    isPlaying() {
      const x = document.getElementsByClassName("aplayer-button")[0];
      return x.classList.contains("aplayer-pause");
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.isPlaying()) {
      const answer = window.confirm(
        "Do you really want to leave? Your music will stop!"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
      return
    }
    next();
  },
};
</script>
