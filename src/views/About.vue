<template>
  <div>
    <Navbar :show="false" />
    <div class="container align-left pad-top-30">
      <router-link to="/">Go Back</router-link>
      <div class="section">
        <h1 class="title">About</h1>
        <p>SongDedi is a free song dedication service suitable for weddings, parties or any event.</p>
      </div>
      <div class="section">
        <h2 class="subtitle">You need a music playlist for your event</h2>
        <p>Can't decide which songs to add to your playlist?</p>
        <h2 class="subtitle">Let your friends do it for you!</h2>
        <p>Anyone can contribute to your playlist. Your playlist will update in real time!</p>
      </div>
      <div class="section">
        <h2 class="subtitle">How it works</h2>
        <p>When you log in, you will see a URL generated just for you. It is for your friends! The URL will direct you to this page, where anyone can easily request songs to be added to your playlist.</p>
        <img :src="image1" class="image" />
        <p>You will also see a link to your playlist, which updates every time someone requests a song, all in real time!</p>
        <img :src="image2" class="image" />
      </div>
      <div class="section">
        <h2 class="subtitle">Libraries and Frameworks</h2>
        <p>Big thanks to all the developers who directly and indirectly contributed to this project!</p>
        <p>
          <a href="https://github.com/MoePlayer/APlayer" target="_blank">MoePlayer/APlayer</a>
        </p>
        <p>
          <a href="https://github.com/vuejs/vue" target="_blank">vuejs/vue</a>
        </p>
      </div>
      <div class="section">
        <h2 class="subtitle">Contact</h2>
        <p>
          Hit me up at
          <a href="mailto:huishun98@gmail.com">huishun98@gmail.com</a> to provide feedback, report a fault, enquire about collaboration or if you just need someone to talk to.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import screenshot2 from "@/assets/screenshot2.jpg";
import screenshot1 from "@/assets/screenshot1.jpg";

export default {
  name: "About",
  components: {
    Navbar,
  },
  data() {
    return {
      image1: screenshot1,
      image2: screenshot2,
    };
  },
};
</script>
