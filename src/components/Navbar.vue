<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" sticky>
    <div class="overlay" :class="{ 'active': collapseActive }" @click="closeCollapse()"></div>
    <router-link class="navbar-brand" to="/home">SongDedi</router-link>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav v-if="show" v-model="collapseActive">
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/playlist">Playlist</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/settings">Settings</router-link>
        </li>
        <b-nav-item
          class="btn-outline-secondary btn-outline margin-left-10-md slim margin-top-md"
          href="javascript:void(0)"
          @click="logout()"
        >Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { auth } from "@/firebase";

export default {
  name: "Navbar",
  data() {
    return {
      collapseActive: false,
    };
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    document.body.classList.remove("disable-scroll");
  },
  watch: {
    collapseActive(newVal, oldVal) {
      if (newVal) {
        document.body.classList.add("disable-scroll");
        return;
      }
      document.body.classList.remove("disable-scroll");
    },
  },
  methods: {
    closeCollapse() {
      this.collapseActive = false;
    },
    logout() {
      const _this = this;
      auth
        .signOut()
        .then(function () {
          // Sign-out successful.
          localStorage.setItem("email", "");
          _this.$router.push("/login");
        })
        .catch(function (error) {
          // An error happened.
          console.log(error);
        });
    },
  },
};
</script>
