<template>
  <div>
    <Navbar />
    <div class="container align-left pad-top-30">
      <div class="section">
        <h1 class="title">Welcome to SongDedi!</h1>
        <p>This is a song dedication service.</p>
      </div>
      <div class="section">
        <h2 class="subtitle">Request for songs</h2>
        <p>
          Songs for this account can be requested at
          <a :href="link" target="_blank">{{link}}</a>
        </p>
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

export default {
  name: "Home",
  components: {
    Navbar,
  },
  data() {
    return {};
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
