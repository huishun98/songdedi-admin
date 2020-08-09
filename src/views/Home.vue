<template>
  <div>
    <Navbar />
    <div class="container align-left pad-top-30">
      <img :src="image" class="image translate-10" />
      <div class="section">
        <h1 class="title">Welcome to SongDedi!</h1>
        <p>This is a song dedication service.</p>
      </div>
      <div class="section">
        <h2 class="subtitle">Add songs to playlist</h2>
        <p>
          Add songs to your playlist at
          <a :href="link" target="_blank">{{link}}</a>.
        </p>
        <p>Share this link with your friends!</p>
      </div>
      <div class="section">
        <h2 class="subtitle">View playlist</h2>
        <p>
          View playlist
          <router-link to="/playlist">here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import image from "@/assets/sound.png";

export default {
  name: "Home",
  components: {
    Navbar,
  },
  data() {
    return {
      image: image,
    };
  },
  computed: {
    email() {
      return localStorage.getItem("email");
    },
    link() {
      return `https://songdedi.herokuapp.com/request:${this.email}`;
    },
  },
  methods: {},
};
</script>
