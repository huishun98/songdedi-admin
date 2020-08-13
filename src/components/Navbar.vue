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
          <router-link class="nav-link" to="/settings">Settings</router-link>
        </li>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
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
  },
};
</script>
