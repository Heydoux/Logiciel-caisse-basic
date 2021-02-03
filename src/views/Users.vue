<template>
  <div class="users mt-5 pt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-">
          <div class="alert alert-info">
            Please use the Reset password email button for reseting the
            password. The form doens't work currently
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input
              type="text"
              v-model="account.name"
              placeholder="User name"
              class="form-control"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input
              type="text"
              v-model="account.email"
              placeholder="Email address"
              class="form-control"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input
              type="text"
              v-model="account.password"
              placeholder="New password"
              class="form-control"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input
              type="text"
              v-model="account.confirmPassword"
              placeholder="Confirm password"
              class="form-control"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <input
              type="submit"
              value="Enregistrer les modifications"
              class="btn btn-primary w-100"
              @click="updateProfile"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <input
              type="button"
              @click="resetPassword"
              value="Reset password email"
              class="btn btn-success w-100"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";

export default {
  name: "Users",
  props: {
    msg: String
  },
  data() {
    return {
      account: {
        name: null,
        email: null,
        emailVerified: null,
        password: null,
        confirmPassword: null,
        uid: null
      }
    };
  },
  methods: {
    resetPassword() {
      const auth = fb.auth();
      auth
        .sendPasswordResetEmail(auth.currentUser.email)
        .then(() => {
          console.log("reset ok");
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateProfile() {
      db.collection("users")
        .doc(this.account.uid)
        .update(this.account)
        .then(() => {
          console.log("Information modifiée avec succès !");
        })
        .catch(err => {
          console.error("Erreur los de la modification du profil: ", err);
        });
    }
  },
  created() {
    var user = fb.auth().currentUser;
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(snapshot => {
        this.account.name = snapshot.data().name;
        this.account.email = user.email;
        this.account.uid = user.uid;
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
