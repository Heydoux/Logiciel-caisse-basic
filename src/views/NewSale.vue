<template>
  <div class="newsale row p-0 m-0">
    <div class="calculator px-3 pb-3 col-md-5">
      <div class="answer row p-0 m-0 border-bottom">
        <div class="col text-left">
          <span class="font-weight-bold">Montant à payer</span>
        </div>
        <div class="col">
          <p class="text-right mb-0">{{ this.transaction.prixAvCom }} €</p>
        </div>
      </div>
      <div class="display px-3">
        <p class="m-0">
          {{ logList + current }}
        </p>
      </div>
      <div @click="clear" id="clear" class="btn operator">C</div>
      <div @click="addtoLog('/')" id="divide" class="btn operator">
        /
      </div>
      <div @click="addtoLog('*')" id="times" class="btn operator">*</div>
      <div @click="addtoLog('-')" id="minus" class="btn operator">-</div>
      <div @click="append('7')" id="n7" class="btn">7</div>
      <div @click="append('8')" id="n8" class="btn">8</div>
      <div @click="append('9')" id="n9" class="btn">9</div>
      <div @click="addtoLog('+')" id="plus" class="btn operator operator-plus">
        +
      </div>
      <div @click="append('4')" id="n4" class="btn">4</div>
      <div @click="append('5')" id="n5" class="btn">5</div>
      <div @click="append('6')" id="n6" class="btn">6</div>
      <div @click="append('1')" id="n1" class="btn">1</div>
      <div @click="append('2')" id="n2" class="btn">2</div>
      <div @click="append('3')" id="n3" class="btn">3</div>
      <div @click="equal" id="equal" class="btn operator operator-equal">=</div>
      <div @click="append('0')" id="n0" class="zero">0</div>
      <div @click="append('.')" id="dot" class="btn">.</div>
    </div>
    <div id="transactionOptions" class="col-md-3 px-0 mb-3">
      <div class="h-50 w-75 m-auto bg-white">
        <h3 class="py-2 mb-0">Paiement</h3>
        <button
          @click="addPayment('carte')"
          class="btn btn-slpv-primary text-uppercase btn-payment"
          id="cartep"
        >
          SUMUP
        </button>
        <button
          @click="addPayment('cash')"
          class="btn btn-slpv-primary text-uppercase btn-payment border-top-0"
          id="cashp"
        >
          Espèces
        </button>
        <button
          @click="addPayment('vel')"
          class="btn btn-slpv-primary text-uppercase btn-payment border-top-0"
          id="velp"
        >
          VENTE EN LIGNE
        </button>
      </div>
      <div class="h-50 w-75 m-auto bg-white">
        <h3 class="border-top py-2 mb-0">Compte</h3>
        <button
          @click="addSaler(0)"
          class="btn btn-slpv-primary text-uppercase btn-saler"
        >
          Flor
        </button>
        <button
          @click="addSaler(1)"
          class="btn btn-slpv-primary text-uppercase btn-saler border-top-0"
        >
          Emma
        </button>
        <button
          @click="addSaler(2)"
          class="btn btn-slpv-primary text-uppercase btn-saler border-top-0"
        >
          Sous les pavés le vintage
        </button>
      </div>
    </div>
    <div class="col-md-4">
      <div class="h-50 bg-white resume">
        <h3 class="py-2 border-bottom">Détails de la vente</h3>
        <div class="row px-0 m-0 border-bottom">
          <div class="col text-left">
            <p class="m-0 py-3">Montant</p>
          </div>
          <div class="col text-right">
            <p id="SumSale" class="m-0 py-3">
              {{ this.transaction.prixAvCom }} €
            </p>
          </div>
        </div>
        <div
          v-if="transaction.modePaiement == 'cash'"
          class="row px-0 m-0 border-bottom"
        >
          <div class="col text-left">
            <p class="m-0 py-3">
              {{ paymentMod }}
            </p>
          </div>
          <div class="col text-right">
            <p class="m-0 py-3">
              {{ clientCash }}
            </p>
          </div>
        </div>
        <div v-if="transaction.modePaiement == 'cash'" class="row px-0 m-0">
          <div class="col text-left">
            <p class="m-0 py-3">Rendu</p>
          </div>
          <div class="col text-right">
            <p class="m-0 py-3">
              {{ cashBack }}
            </p>
          </div>
        </div>
      </div>
      <button
        id="savesalebtn"
        @click="sendTransaction"
        class="btn btn-slpv-primary text-uppercase mt-3"
      >
        Enregistrer la vente
      </button>
    </div>
    <div class="modal" id="clientcash" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center">
              Montant en espèces données par le client
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input type="number" v-model="clientCash" />
            <div id="calculatorModal" class="calculator">
              <div @click="appendModal('7')" id="n7" class="btn">7</div>
              <div @click="appendModal('8')" id="n8" class="btn">8</div>
              <div @click="appendModal('9')" id="n9" class="btn">9</div>
              <div @click="appendModal('4')" id="n4" class="btn">4</div>
              <div @click="appendModal('5')" id="n5" class="btn">5</div>
              <div @click="appendModal('6')" id="n6" class="btn">6</div>
              <div @click="appendModal('1')" id="n1" class="btn">1</div>
              <div @click="appendModal('2')" id="n2" class="btn">2</div>
              <div @click="appendModal('3')" id="n3" class="btn">3</div>
              <div @click="appendModal('0')" id="n0" class="zero">0</div>
              <div @click="appendModal('.')" id="dot" class="btn">.</div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              @click="calcCashBakc"
              class="btn btn-slpv-primary"
            >
              Valider
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { db } from "../firebase";

export default {
  name: "NewSales",
  props: {
    msg: String
  },
  data() {
    return {
      transaction: {
        vendeuse: null,
        prixAvCom: 0,
        prixApCom: null,
        date: null,
        modePaiement: null
      },
      salers: ["Flor", "Emma", "Sous les pavés le vintage"],
      logList: "",
      current: "",
      answer: "0",
      operatorClicked: true,
      paymentMod: null,
      clientCash: "",
      cashBack: 0
    };
  },
  methods: {
    addSaler(salernumber) {
      this.transaction.vendeuse = this.salers[salernumber];
      $(".btn-saler").removeClass("active");
      var activeSaler = $(".btn-saler")[salernumber];
      $(activeSaler).addClass("active");
    },
    addPayment(paymethod) {
      this.transaction.modePaiement = paymethod;
      $(".btn-payment").removeClass("active");
      var activePayment = $("#" + paymethod + "p");
      $(activePayment).addClass("active");
      switch (paymethod) {
        case "carte":
          this.paymentMod = "Carte";
          break;
        case "cash":
          this.paymentMod = "Espèces";
          $("#clientcash").modal("show");
          break;
        case "vel":
          this.paymentMod = "Vente en ligne";
          break;
      }
    },
    appendModal(number) {
      this.clientCash += number;
      this.clientCash = parseFloat(this.clientCash);
    },
    calcCashBakc() {
      this.cashBack = this.clientCash - this.transaction.prixAvCom;
      $("#clientcash").modal("hide");
    },
    append(number) {
      if (this.operatorClicked) {
        this.current = "";
        this.operatorClicked = false;
      }
      this.current = `${this.current}${number}`;
    },
    addtoLog(operator) {
      if (this.operatorClicked == false) {
        this.logList += `${this.current} ${operator} `;
        this.current = "";
        this.operatorClicked = true;
      }
    },
    clear() {
      this.current = "";
      this.transaction.prixAvCom = 0;
      this.logList = "";
      this.operatorClicked = false;
    },
    equal() {
      if (this.operatorClicked == false) {
        this.transaction.prixAvCom = eval(this.logList + this.current);
      } else {
        this.transaction.prixAvCom = "WHAT?!!";
      }
    },
    sendTransaction() {
      this.transaction.date = new Date();
      if (this.transaction.modePaiement === "carte") {
        this.transaction.prixApCom =
          this.transaction.prixAvCom -
          (this.transaction.prixAvCom * 1.49) / 100;
      } else {
        this.transaction.prixApCom = this.transaction.prixAvCom;
      }
      if (
        this.transaction.modePaiement === null ||
        this.transaction.vendeuse === null ||
        this.transaction.prixAvCom == 0
      ) {
        console.log("Faux");
        Swal.fire({
          title: "Informations incomplètes !",
          text:
            "Un blame pour avoir oublié de sélectionner le mode de paiement ou le compte réalisant la vente !",
          icon: "error",
          confirmButtonText: "Ok"
        });
      } else {
        console.log("Ok");
        /*db.collection("transactions")
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
              text:
                "La transacion n'a pas pu s'enregistrer correctement, merci de réessayer",
              icon: "error",
              confirmButtonText: "Ok"
            });
          });
          */
      }
    },
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this));
      $(".btn-saler").removeClass("active");
      $(".btn-payment").removeClass("active");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.newsale {
  height: 100vh;
  padding-top: 2.5rem !important;
  background-color: #cecece;

  input[type="number"] {
    font-size: 1.5rem;
  }

  h3 {
    color: #26734f;
  }

  .btn-slpv-primary {
    font-size: 1.3rem;
    line-height: 1.4rem;
    height: 3.9rem;
    width: 100%;
    color: #fff;
    background-color: #26734f;
    border: 2px solid #15402c;

    &.active,
    &:focus {
      color: white;
      background-color: #c3abcd;
      border: 2px solid #15402c;
    }
  }

  .calculator {
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    font-weight: 300;
    font-size: 18px;

    .btn,
    .zero {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      outline: none;
      color: #ffffff;
      background-color: #1e2022;
      border: 0.5px solid #191b1d;
      border-radius: 0px;
      font-size: 2rem;
      padding: 0;
    }

    .display,
    .answer {
      grid-column: 1 / 5;
      display: flex;
      background-color: #ffffff;
    }

    .display {
      color: #5c5c5c;

      &::before {
        content: "0";
        min-height: 1.2rem;
        align-self: center;
        opacity: 0;
      }

      p {
        align-self: center;
        font-size: 1.5rem;
        line-height: 1.5rem;
      }
    }

    .answer {
      color: #26734f;

      .col {
        align-self: center;

        span {
          min-height: 3rem;
        }

        p {
          font-size: 3rem;
          line-height: 3rem;
          margin: 0;
        }
      }
    }

    .zero {
      grid-column: 1 / 3;
    }

    .operator {
      background-color: #26734f;
      color: #ffffff;
      border: 0.5px solid #15402c;
    }

    .operator-plus,
    .operator-equal {
      grid-row-start: span 2;
    }

    .resume {
      p {
        &::before {
          content: "0";
          opacity: 0;
        }
      }

      #SumSale {
        font-weight: bold;
        color: #26734f;
        font-size: 1.3rem;
      }
    }
  }

  #calculatorModal {
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-weight: 300;
    font-size: 18px;
    padding: 2rem;

    .btn {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
  }
}
@media only screen and (max-width: 1024px) {
  .newsale {
    .btn-slpv-primary {
      font-size: 1rem;
    }
  }
}
@media only screen and (max-width: 768px) {
  .newsale {
    margin-top: 3rem;
    height: 200vh;

    #transactionOptions {
      .w-75 {
        width: 95% !important;
        display: flex !important;
        flex-wrap: wrap !important;
        margin-bottom: 1rem !important;

        h3 {
          width: 100%;
          font-size: 24px;
          line-height: 26px;
        }

        .btn-slpv-primary {
          width: 33%;
          font-size: 0.875rem;
          line-height: 1rem;
        }
      }
    }
    #savesalebtn {
      margin-top: 2rem;
    }

    .resume {
      height: unset !important;
    }
  }
}
</style>
