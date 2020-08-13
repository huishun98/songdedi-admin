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
    logoutClearPlaylist({ commit }) {
      commit("setPlaylist", [])
    },
    updateCurrentMusicHandler({ }, id) {
      updateCurrentMusic(id - 1)
    },
    deleteTrack({ state }, trackNumber) {
      const i = trackNumber - 1
      let playlist = state.playlist
      playlist.splice(i, 1);
      uploadPlaylist(playlist).then(() => {
        alert("Track is successfully deleted.")
      })
    },
    clearPlaylist() {
      uploadPlaylist([]).then(() => {
        alert("Playlist is successfully cleared.")
      })
    },
    loginGeneratePlaylist({ dispatch, commit }, email) {
      if (email == null || email.length <= 0) {
        console.log(`Error getting user email: ${email}`)
      }
      // check if user exists, if not create new playlist
      const docRef = playlistsCollection.doc(email)
      docRef.get()
        .then((doc) => {
          if (doc.exists) {
            commit("setPlaylist", doc.data().playlist)
          } else {
            // separate login interation with firebase to ensure that clear playlist only happens when required
            newPlaylist(email).then(() => {
              dispatch('updatePlaylist')
            });
          }
        });
    },
    updatePlaylist({ commit }) {
      const email = localStorage.getItem("email")
      if (email == null || email.length <= 0) {
        return
      }
      let docRef = playlistsCollection.doc(email);
      docRef.get().then((doc) => {
        if (doc.exists) {
          commit("setPlaylist", doc.data().playlist)
        } else {
          console.log(`Error getting playlist: ${email}`)
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    },
    watchPlaylistUpdates({ commit }) {
      const email = localStorage.getItem("email")
      playlistsCollection.doc(email).onSnapshot(function (doc) {
        if (doc.data() == undefined) {
          console.log(`Error getting playlist: ${email}`)
        } else {
          commit("setPlaylist", doc.data().playlist)
        }
      });
    }
  },
  modules: {
  }
})


// Uploading to firestore

const updateCurrentMusic = (index) => {
  const email = localStorage.getItem("email")

  return new Promise(function (resolve, reject) {
    playlistsCollection
      .doc(email)
      .update({
        currentMusic: index
      })
      .then(function () {
        resolve()
      })
      .catch(function (error) {
        console.error("Error updating current music: ", error);
        reject()
      });
  })
}

const newPlaylist = (email) => {
  const time = new Date().getTime()

  return new Promise(function (resolve, reject) {
    playlistsCollection
      .doc(email)
      .set({
        playlist: [],
        timestamp: time,
        currentMusic: 0
      })
      .then(function () {
        console.log("Document successfully written!");
        resolve()
      })
      .catch(function (error) {
        console.error("Error writing new document: ", error);
        reject()
      });
  })
}

const uploadPlaylist = (playlist) => {
  const email = localStorage.getItem("email")
  const time = new Date().getTime()

  return new Promise(function (resolve, reject) {
    playlistsCollection
      .doc(email)
      .update({
        playlist: playlist,
        timestamp: time
      })
      .then(function () {
        console.log("Document successfully updated");
        resolve()
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
        reject()
      });
  })
}