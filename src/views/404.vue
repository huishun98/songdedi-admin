<template>
  <div>
    <Navbar :show="false" />
    <div class="container align-left pad-top-30">
      <div class="section">
        <h1 class="title">404</h1>
        <p>Page not found.</p>
        <router-link to="/">Go Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "NotFound",
  components: {
    Navbar,
  },
};
</script>
