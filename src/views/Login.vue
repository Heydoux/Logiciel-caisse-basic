<template>
  <div class="login">
    <main id="mainContent" class="container-lg">
      <div class="modal-body">
        <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="pills-home-tab"
              data-toggle="pill"
              href="#pills-login"
              role="tab"
              aria-controls="pills-login"
              aria-selected="true"
            >
              Se connecter
            </a>
          </li>
          <!--
          <li class="nav-item">
            <a
              class="nav-link"
              id="pills-register-tab"
              data-toggle="pill"
              href="#pills-register"
              role="tab"
              aria-controls="pills-register"
              aria-selected="false"
            >
              Créer un compte
            </a>
          </li>
          -->
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-login"
            role="tabpanel"
            aria-labelledby="pills-login-tab"
          >
            <div class="form-group">
              <label for="exampleInputEmail1">E-mail</label>
              <input
                type="email"
                v-model="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="E-mail"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Mot de passe</label>
              <input
                type="password"
                @keyup.enter="login"
                v-model="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Mot de passe"
              />
            </div>
            <div class="form-group">
              <!--<button class="btn btn-primary" @click="login">Continuar</button>-->
              <button class="btn btn-primary" @click="login">
                Se connecter
              </button>
            </div>
          </div>
          <!--
          <div
            class="tab-pane fade"
            id="pills-register"
            role="tabpanel"
            aria-labelledby="pills-register-tab"
          >
            <div class="form-group">
              <label for="name">Nom</label>
              <input
                type="text"
                v-model="name"
                class="form-control"
                id="name"
                placeholder="Nom"
              />
            </div>
            <div class="form-group">
              <label for="email">E-mail</label>
              <input
                type="email"
                v-model="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="E-mail"
              />
            </div>
            <div class="form-group">
              <label for="password">Mot de passe</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="password"
                placeholder="Mot de passe"
              />
            </div>
            <div class="form-group">
              <button class="btn btn-primary" @click="register">
                Continuar
              </button>
            </div>
          </div>
          -->
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { fb, db } from "../firebase";

export default {
  name: "Login",
  props: {
    msg: String
  },
  data() {
    return {
      name: null,
      email: null,
      password: null
    };
  },
  methods: {
    login() {
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("admin/");
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password!");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
    register() {
      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          db.collection("users")
            .doc(user.user.uid)
            .set({
              name: this.name
            })
            .then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
          this.$router.replace("admin");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
