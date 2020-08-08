import Vue from 'vue'
import Vuex from 'vuex'
import { playlistsCollection } from "@/firebase";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playlist: []
  },
  getters: {
    getPlaylistLength(state) {
      return state.playlist.length
    }
  },
  mutations: {
    setPlaylist(state, playlist) {
      state.playlist = playlist
    }
  },
  actions: {
    // downloadPlaylist() {

    // },
    deleteTrack({ state }, trackNumber) {
      const i = trackNumber - 1
      let playlist = state.playlist
      playlist.splice(i, 1);
      uploadPlaylist(playlist)
    },
    clearPlaylist() {
      uploadPlaylist([])
    },
    updatePlaylist({ commit }) {
      const email = localStorage.getItem("email")
      playlistsCollection.doc(email).onSnapshot(function (doc) {
        if (doc.data() == undefined) {
          uploadPlaylist([]);
          commit("setPlaylist", [])
        } else {
          commit("setPlaylist", doc.data().playlist)
        }
      });
    }
  },
  modules: {
  }
})

const uploadPlaylist = (playlist) => {
  const email = localStorage.getItem("email")
  const time = new Date().getTime()
  playlistsCollection
    .doc(email)
    .set({
      playlist: playlist,
      timestamp: time
    })
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing new document: ", error);
    });
}