<template>
  <div class="newsale">
    <div class="row justify-content-center align-items-center h-75 w-100 p-0">
      <div class="col-md-4">
        <button
          @click="addSaler(0)"
          class="btn btn-slpv-primary text-uppercase btn-saler"
        >
          Flor
        </button>
      </div>
      <div class="col-md-4">
        <button
          @click="addSaler(1)"
          class="btn btn-slpv-primary text-uppercase btn-saler"
        >
          Emma
        </button>
      </div>
      <div class="col-md-4">
        <button
          @click="addSaler(2)"
          class="btn btn-slpv-primary text-uppercase btn-saler"
        >
          Sous les pavés le vintage
        </button>
      </div>
      <div class=" col-md-12 m-auto">
        <div class="form-group d-flex">
          <label
            for="inputPrice"
            class="text-uppercase w-25 font-weight-bold my-auto"
          >
            Prix de vente
          </label>
          <input
            type="number"
            class="form-control w-25"
            id="inputPrice"
            placeholder="Prix de vente"
            v-model="transaction.prixAvCom"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-check">
          <input
            type="radio"
            name="pricemethod"
            class="form-check-input"
            id="chekbox_sumup"
            value="carte"
            v-model="transaction.modePaiement"
          />
          <label class="form-check-label" for="chekbox_sumup">SUMUP</label>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-check">
          <input
            type="radio"
            name="pricemethod"
            class="form-check-input"
            id="checkbox_cash"
            value="cash"
            v-model="transaction.modePaiement"
          />
          <label class="form-check-label" for="checkbox_cash">CASH</label>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-check">
          <input
            type="radio"
            name="pricemethod"
            class="form-check-input"
            id="checkbox_vel"
            value="vel"
            v-model="transaction.modePaiement"
          />
          <label class="form-check-label" for="checkbox_vel">
            VENTE EN LIGNE
          </label>
        </div>
      </div>
      <div class="offset-md-3 col-md-4 m-auto">
        <button
          id="savesalebtn"
          @click="sendTransaction"
          class="btn btn-slpv-primary text-uppercase"
        >
          Enregistrer la vente
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  name: "NewSale",
  props: {
    msg: String
  },
  data() {
    return {
      transaction: {
        vendeuse: null,
        prixAvCom: null,
        prixApCom: null,
        date: null,
        modePaiement: []
      },
      salers: ["Flor", "Emma", "Sous les pavés le vintage"]
    };
  },
  methods: {
    addSaler(salernumber) {
      this.transaction.vendeuse = this.salers[salernumber];
      $(".btn-saler").removeClass("active");
      var activeSaler = $(".btn-saler")[salernumber];
      $(activeSaler).addClass("active");
    },
    sendTransaction() {
      this.transaction.date = new Date();
      this.transaction.prixAvCom = parseInt(this.transaction.prixAvCom);
      if (this.transaction.modePaiement === "carte") {
        this.transaction.prixApCom =
          this.transaction.prixAvCom -
          (this.transaction.prixAvCom * 1.49) / 100;
      } else {
        this.transaction.prixApCom = this.transaction.prixAvCom;
      }
      db.collection("transactions")
        .add(this.transaction)
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
          this.reset();
          Swal.fire({
            title: "Youhou !",
            text: "Transaction bien enregistrée, bien joué.",
            icon: "success",
            confirmButtonText: "Cool"
          });
        })
        .catch(function(error) {
          console.error("Error adding document in database: ", error);
          Swal.fire({
            title: "Oups !",
            text: "La transacion n'a pas pu s'enregistrer correctement, merci de réessayer",
            icon: "error",
            confirmButtonText: "Ok"
          });
        });
    },
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this));
      $(".btn-saler").removeClass("active");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.newsale {
  height: 100vh;

  input[type="number"] {
    font-size: 1.5rem;
  }

  .btn-slpv-primary {
    font-size: 1.3rem;

    &.active,
    &:focus {
      color: white;
      background-color: #c3abcd;
      border: #c3abcd;
    }
  }

  .form-check-label {
    font-size: 20px;
    margin-left: 10px;
  }

  input[type="radio"] {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #555555;
    border-radius: 50%;
    background-clip: content-box;
    padding: 3px;
  }

  input[type="radio"]:checked {
    background-color: #555555;
  }
}
@media only screen and (max-width: 768px) {
  .newsale {
    margin-top: 3rem;

    .form-group {
      margin-top: 2rem;

      input[type="number"] {
        width: 75% !important;
      }
    }
  }

  #savesalebtn {
    margin-top: 2rem;
  }
}
</style>
