<template>
  <div class="home">
    <Navbar />
    <div class="qr-wrapper">
      <div @click="toggleShowQr()">
        <qrcode-vue :value="link" :size="size" level="H" class="box-shadow qr" v-if="showQr"></qrcode-vue>
      </div>
      <a href="javascript:void(0)" v-if="!showQr" @click="toggleShowQr()">Show QR</a>
    </div>

    <div class="banner-text flex-center split-text">
      <div class="split-text">
        Dedicate songs at
        <a :href="link" target="_blank">{{link}}</a>.
      </div>
    </div>
    <aplayer class="custom-player" :audio="playlist" ref="aplayer" :listMaxHeight="listMaxHeight" />
  </div>
</template>

<script>
import { storage, db, auth, playlistsCollection } from "@/firebase";
import GoogleLogin from "vue-google-login";
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import QrcodeVue from "qrcode.vue";

export default {
  name: "Playlist",
  data() {
    return {
      showQr: false,
      listMaxHeight: 0,
      size: 250,
    };
  },
  components: {
    GoogleLogin,
    Navbar,
    QrcodeVue,
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
    link() {
      const email = localStorage.getItem("email");
      return `https://songdedi.herokuapp.com/request:${email}`;
    },
  },
  methods: {
    toggleShowQr() {
      this.showQr = !this.showQr;
    },
    initialiselistMaxHeight() {
      const viewWidth = window.outerWidth;
      let viewHeight = window.outerHeight;
      const usedHeight = 56 + 66 + 100; // navbar + player info + banner-text height
      const marginBot = 40;

      if (viewWidth > 990) {
        viewHeight = window.innerHeight;
        this.listMaxHeight = viewHeight - usedHeight - marginBot;
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
