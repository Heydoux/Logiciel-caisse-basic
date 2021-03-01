<template>
  <div class="saleslist h-100">
    <div class="row justify-content-center align-items-center p-0 m-0">
      <div class="col-md-12">
        <h3 class="text-left">Quel compte souhaites-tu consulter :</h3>
      </div>
      <div class="col-md-3">
        <button
          @click="chooseSaler(0)"
          class="btn btn-slpv-primary text-uppercase btn-saler"
        >
          Tout le monde
        </button>
      </div>
      <div class="col-md-3">
        <button
          @click="chooseSaler(1)"
          class="btn btn-slpv-primary text-uppercase btn-saler"
        >
          Flor
        </button>
      </div>
      <div class="col-md-3">
        <button
          @click="chooseSaler(2)"
          class="btn btn-slpv-primary text-uppercase btn-saler"
        >
          Emma
        </button>
      </div>
      <div class="col-md-3">
        <button
          @click="chooseSaler(3)"
          class="btn btn-slpv-primary text-uppercase btn-saler"
        >
          Sous les pavés le vintage
        </button>
      </div>
    </div>
    <div
      class="py-3 px-0 container h-100 justify-content-center align-items-center"
    >
      <div class="row dateFilter p-0 m-0">
        <div class="col-md-12">
          <h3 class="text-left">Quelle période :</h3>
        </div>
        <div class="col-md-3">
          <date-pick v-model="pickupDate" :displayFormat="'DD-MM-YYYY'">
            <template v-slot:default="{ toggle, inputValue }">
              <button @click="toggle" class="btn btn-slpv-primary">
                {{ inputValue || "Choisir une date" }}
              </button>
            </template>
          </date-pick>
        </div>
        <div class="col-md-3">
          <div class="form-check">
            <input
              type="radio"
              name="datechoose"
              class="form-check-input"
              id="chekbox_today"
              value="today"
              v-model="currentDay"
              @change="onChange($event)"
            />
            <label class="form-check-label" for="chekbox_today">
              Aujourd'hui
            </label>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-check">
            <input
              type="radio"
              name="datechoose"
              class="form-check-input"
              id="checkbox_week"
              value="week"
              v-model="currentWeek"
              @change="onChange($event)"
            />
            <label class="form-check-label" for="checkbox_week">
              Cette semaine
            </label>
          </div>
          <div class="form-check">
            <input
              type="radio"
              name="datechoose"
              class="form-check-input"
              id="checkbox_pastweek"
              value="pastweek"
              v-model="pastWeek"
              @change="onChange($event)"
            />
            <label class="form-check-label" for="checkbox_pastweek">
              Semaine dernière
            </label>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-check">
            <input
              type="radio"
              name="datechoose"
              class="form-check-input"
              id="checkbox_month"
              value="month"
              v-model="currentMonth"
              @change="onChange($event)"
            />
            <label class="form-check-label" for="checkbox_month">
              Ce mois-ci
            </label>
          </div>
        </div>
      </div>
      <div class="row paymentFilter p-0 mx-0 mt-4">
        <div class="col-md-12">
          <h3 class="text-left">Moyen de paiement :</h3>
        </div>
        <div class="paymentSelect mx-auto my-3">
          <select name="cars" id="cars" @change="pickUpPayment($event)">
            <option value="all">Tous</option>
            <option value="cash">Espèces</option>
            <option value="carte">SumUp</option>
            <option value="vel">Vente en ligne</option>
          </select>
        </div>
      </div>
      <h3 class="mt-5 text-left">Ventes {{ this.selectedDate }}</h3>
      <table id="salesTable" class="table-responsive mt-5 w-100">
        <thead>
          <tr>
            <th class="w-25 pr-2 border text-center">
              COMPTE
            </th>
            <th class="w-25 pr-2 border text-center">
              MÉTHODE DE PAIEMENT
            </th>
            <th class="w-25 pr-2 border text-center">
              PRIX AVEC COM
            </th>
            <th class="w-25 pr-2 border text-center">
              PRIX SANS COM
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, index) in transactions" v-bind:key="index">
            <td v-if="index % 2" class="w-25 py-3 border">
              {{ transaction.data().vendeuse }}
            </td>
            <td v-else class="w-25 py-3 bg-light border">
              {{ transaction.data().vendeuse }}
            </td>
            <td v-if="index % 2" class="w-25 py-3 text-center border">
              {{ transaction.data().modePaiement }}
            </td>
            <td v-else class="w-25 py-3 bg-light text-center border">
              {{ transaction.data().modePaiement }}
            </td>
            <td v-if="index % 2" class="w-25 py-3 text-center border fullprice">
              {{ transaction.data().prixAvCom }}
            </td>
            <td v-else class="w-25 py-3 bg-light text-center border fullprice">
              {{ transaction.data().prixAvCom }}
            </td>
            <td
              id="price"
              v-if="index % 2"
              class="w-25 py-3 text-center border priceCom"
            >
              {{ transaction.data().prixApCom }}
            </td>
            <td v-else class="w-25 py-3 bg-light text-center border priceCom">
              {{ transaction.data().prixApCom }}
            </td>
          </tr>
        </tbody>
      </table>
      <table id="sumTable" class="table-responsive my-5 mx-auto">
        <thead>
          <tr>
            <th class="pb-3 pr-2 border text-center font-weight-bold">
              TOTAL
            </th>
            <th class="pb-3 pr-2 border text-center font-weight-bold bg-info">
              {{ this.total }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="w-50 py-3 bg-light border font-weight-bold ">
              Total des commissions
            </td>
            <td class="w-50 py-3 border bg-warning font-weight-bold">
              {{ this.totalCom }}
            </td>
          </tr>
          <tr>
            <td class="w-50 py-3 border font-weight-bold">
              Total hors commissions
            </td>
            <td class="w-50 py-3 border bg-danger font-weight-bold">
              {{ this.totalApCom }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";

export default {
  name: "SalesList",
  components: { DatePick },
  props: {
    msg: String
  },
  data() {
    return {
      transactions: [],
      currentDate: new Date(),
      selectedDate: "",
      pickupDate: null,
      currentWeek: null,
      pastWeek: null,
      currentMonth: null,
      currentDay: null,
      total: 0,
      totalApCom: 0,
      totalCom: 0,
      months: [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre"
      ],
      requestPayment: null,
      requestSaler: null,
      requestStartDate: null,
      requestEndDate: null,
      salers: ["All", "Flor", "Emma", "Sous les pavés le vintage"],
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
    filterRequest() {
      this.total = this.totalApCom = this.totalCom = 0;
      this.transactions = [];
      if (this.requestPayment) {
        if (this.requestSaler) {
          db.collection("transactions")
            .where("vendeuse", "==", this.requestSaler)
            .where("modePaiement", "==", this.requestPayment)
            .orderBy("date")
            .startAt(this.requestStartDate)
            .endAt(this.requestEndDate)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                this.transactions.push(doc);
                this.total += doc.data().prixAvCom;
                this.totalApCom += Number(doc.data().prixApCom.toFixed(2));
                this.totalApCom = Number(this.totalApCom.toFixed(2));
                this.totalCom = this.total - this.totalApCom;
                this.totalCom = Number(this.totalCom.toFixed(2));
              });
            });
        } else {
          db.collection("transactions")
            .where("modePaiement", "==", this.requestPayment)
            .orderBy("date")
            .startAt(this.requestStartDate)
            .endAt(this.requestEndDate)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                this.transactions.push(doc);
                this.total += doc.data().prixAvCom;
                this.totalApCom += Number(doc.data().prixApCom.toFixed(2));
                this.totalApCom = Number(this.totalApCom.toFixed(2));
                this.totalCom = this.total - this.totalApCom;
                this.totalCom = Number(this.totalCom.toFixed(2));
              });
            });
        }
      } else if (this.requestSaler) {
        db.collection("transactions")
          .where("vendeuse", "==", this.requestSaler)
          .orderBy("date")
          .startAt(this.requestStartDate)
          .endAt(this.requestEndDate)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.transactions.push(doc);
              this.total += doc.data().prixAvCom;
              this.totalApCom += Number(doc.data().prixApCom.toFixed(2));
              this.totalApCom = Number(this.totalApCom.toFixed(2));
              this.totalCom = this.total - this.totalApCom;
              this.totalCom = Number(this.totalCom.toFixed(2));
            });
          });
      } else {
        db.collection("transactions")
          .orderBy("date")
          .startAt(this.requestStartDate)
          .endAt(this.requestEndDate)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.transactions.push(doc);
              this.total += doc.data().prixAvCom;
              this.totalApCom += Number(doc.data().prixApCom.toFixed(2));
              this.totalApCom = Number(this.totalApCom.toFixed(2));
              this.totalCom = this.total - this.totalApCom;
              this.totalCom = Number(this.totalCom.toFixed(2));
            });
          });
      }
    },
    pickUpPayment(event) {
      if (event.target.value != "all") {
        this.requestPayment = event.target.value;
      } else {
        this.requestPayment = null;
      }
      this.filterRequest();
    },
    chooseSaler(salerNumber) {
      $(".btn-saler").removeClass("active");
      var activeSaler = $(".btn-saler")[salerNumber];
      $(activeSaler).addClass("active");
      if (this.salers[salerNumber] == "All") {
        this.requestSaler = null;
      } else {
        this.requestSaler = this.salers[salerNumber];
      }
      this.filterRequest();
    },
    onChange(event) {
      var optionText = event.target.value;
      this.total = this.totalApCom = this.totalCom = 0;
      var curr = new Date();
      var startdate, enddate, nbDays, first, end;
      switch (optionText) {
        case "month":
          this.selectedDate = "de ce mois-ci";
          nbDays = new Date(
            curr.getFullYear(),
            curr.getMonth() + 1,
            0
          ).getDate();
          startdate = new Date(curr.setDate(1));
          curr = new Date();
          enddate = new Date(curr.setDate(nbDays));
          break;
        case "week":
          this.selectedDate = "de cette semaine";
          first = curr.getDate() - curr.getDay() + 1;
          end = curr.getDate() - curr.getDay() + 7;
          startdate = new Date(curr.setDate(first));
          curr = new Date();
          enddate = new Date(curr.setDate(end));
          startdate.setHours(0);
          startdate.setMinutes(0);
          startdate.setSeconds(1);
          enddate.setHours(23);
          enddate.setMinutes(59);
          enddate.setSeconds(59);
          break;
        case "pastweek":
          this.selectedDate = "de la semaine dernière";
          first = curr.getDate() - curr.getDay() + 1;
          end = curr.getDate() - curr.getDay();
          startdate = new Date(curr.setDate(first - 7));
          curr = new Date();
          enddate = new Date(curr.setDate(end));
          startdate.setHours(0);
          startdate.setMinutes(0);
          startdate.setSeconds(1);
          enddate.setHours(23);
          enddate.setMinutes(59);
          enddate.setSeconds(59);
          break;
        case "today":
          this.selectedDate =
            "du " +
            this.currentDate.getDate() +
            " " +
            this.months[this.currentDate.getMonth()] +
            " " +
            this.currentDate.getFullYear();
          startdate = new Date(this.currentDate);
          enddate = new Date(this.currentDate);
          startdate.setHours(0);
          startdate.setMinutes(0);
          startdate.setSeconds(1);
          enddate.setHours(23);
          enddate.setMinutes(59);
          enddate.setSeconds(59);
          break;
      }
      this.requestStartDate = startdate;
      this.requestEndDate = enddate;
      this.filterRequest();
    }
  },
  created() {
    this.total = this.totalApCom = this.totalCom = 0;
    this.selectedDate =
      "du " +
      this.currentDate.getDate() +
      " " +
      this.months[this.currentDate.getMonth()] +
      " " +
      this.currentDate.getFullYear();
    var startdate = new Date(this.currentDate);
    var enddate = new Date(this.currentDate);
    startdate.setHours(0);
    startdate.setMinutes(0);
    enddate.setHours(23);
    enddate.setMinutes(59);
    enddate.setSeconds(59);
    this.requestStartDate = startdate;
    this.requestEndDate = enddate;
    this.filterRequest();
  },
  watch: {
    pickupDate: function() {
      this.total = this.totalApCom = this.totalCom = 0;
      var startdate = new Date(this.pickupDate);
      var enddate = new Date(this.pickupDate);
      this.selectedDate =
        "du " +
        this.pickupDate.substring(8, 10) +
        " " +
        this.months[parseInt(this.pickupDate.substring(5, 7)) - 1] +
        " " +
        this.pickupDate.substring(0, 4);
      startdate.setHours(0);
      startdate.setMinutes(0);
      enddate.setHours(23);
      enddate.setMinutes(59);
      enddate.setSeconds(59);
      this.requestStartDate = startdate;
      this.requestEndDate = enddate;
      this.filterRequest();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.saleslist {
  margin-top: 3rem;

  .btn-slpv-primary {
    font-size: 1.2rem;

    &.active,
    &:focus {
      color: white;
      background-color: #c3abcd;
      border: #c3abcd;
    }
  }

  #sumTable {
    width: fit-content;

    .bg-info,
    .bg-warning,
    .bg-danger {
      font-size: 20px;
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
  .btn-saler {
    margin-bottom: 1rem;
  }

  .form-check {
    margin-top: 0.5rem;
  }
}
</style>
