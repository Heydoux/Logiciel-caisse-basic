<template>
  <div class="newsale">
    <div class="row justify-content-center align-items-center h-75 w-100 p-0">
      <div class="col-md-4">
        <button
          @click="addSaler('Flor')"
          class="btn btn-slpv-primary text-uppercase"
        >
          Flor
        </button>
      </div>
      <div class="col-md-4">
        <button
          @click="addSaler('Emma')"
          class="btn btn-slpv-primary text-uppercase"
        >
          Emma
        </button>
      </div>
      <div class="col-md-4">
        <button
          @click="addSaler('Slpv')"
          class="btn btn-slpv-primary text-uppercase"
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
          <label class="form-check-label" for="chekbox_sumup">CARTE</label>
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
      }
    };
  },
  methods: {
    addSaler(saler) {
      this.transaction.vendeuse = saler;
      console.log(this.transaction.vendeuse);
      $(this).addClass("active");
    },
    sendTransaction() {
      this.transaction.date = new Date();
      if (this.transaction.modePaiement === "carte") {
        this.transaction.prixApCom =
          this.transaction.prixAvCom -
          (this.transaction.prixAvCom * 1.49) / 100;
      }
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
}
</style>
