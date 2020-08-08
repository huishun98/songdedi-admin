<template>
  <div class="flex-center">
    <div class="flex-center-inner">
      <h1 class="title">SongDedi</h1>
      <p>This is a song dedication service.</p>
      <router-link to="/about" class="pad-bot-30">Learn more</router-link>
      <div class="btn google-btn" @click="login()">
        <div class="google-icon-wrapper">
          <img
            class="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <p class="btn-text">Sign in with Google</p>
      </div>
    </div>

    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { firebase, auth } from "@/firebase";
import GoogleLogin from "vue-google-login";

export default {
  name: "Login",
  components: {
    GoogleLogin,
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    login() {
      // Using a popup.
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      provider.addScope("profile");
      provider.addScope("email");
      const _this = this;
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          // This gives you a Google Access Token.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          localStorage.setItem("email", user.email);
          _this.$store.dispatch("updatePlaylist");
          _this.$router.push("/home");
        });
    },
  },
};
</script>
