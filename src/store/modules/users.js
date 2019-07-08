import { db } from "../../main";
import firebase from "firebase/app";
import "firebase/auth";
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
        user
          .updateProfile({
            displayName: userInfo.username
          })
          .then(function() {
            console.log(user);
          })
          .catch(function(error) {
            // An error happened.
          });
        // console.log(user);
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    // db.collection("users")
    //   .doc(payload)
    //   .set(payload)
    //   .then(data => {
    //     commit("SET_Data", payload);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
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
