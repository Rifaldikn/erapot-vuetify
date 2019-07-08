import { db } from "../../main";
const state = {
  account: []
};

const getters = {
  account_data: state => state.account
};

const mutations = {
  SET_Account(state, payload) {
    state.account = payload;
  }
};

const actions = {
  Login_Account({ commit }, payload) {},
  Sigup_Account({ commit }, payload) {
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ...
    //   });
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        var user = firebase.auth().currentUser;

        user
          .updateProfile({
            displayName: userInfo.username
          })
          .then(function() {
            // Update successful.
            dispatch("users/loginWithEmail", userInfo, { root: true });
            console.log(user);
          })
          .catch(function(error) {
            // An error happened.
          });
        // console.log(user);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        commit("app/setErrorMessage", errorMessage, { root: true });
        store.commit("app/toggleSnackbar", { root: true });
        console.log(error);
      });
    db.collection("users")
      .doc(payload)
      .set(payload)
      .then(data => {
        commit("SET_Data", payload);
      })
      .catch(error => {
        console.log(error);
      });
  },
  LogOut_Account({ commit }) {}
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
