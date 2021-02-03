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
      <div class="row dateFilter">
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
      salers: ["Tous", "Flor", "Emma", "Sous les pavés le vintage"],
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
    chooseSaler(salerNumber) {
      $(".btn-saler").removeClass("active");
      var activeSaler = $(".btn-saler")[salerNumber];
      $(activeSaler).addClass("active");
      var filter = this.salers[salerNumber].toUpperCase();
      var tr = $("#salesTable tr");
      this.total = this.totalApCom = this.totalCom = 0;
      for (var i = 0; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          var textValue = td.textContent || td.innerText;
          if (salerNumber === 0) {
            tr[i].style.display = "";
            let fullprice = parseFloat(
              tr[i].getElementsByTagName("td")[2].textContent
            );
            let priceCom = parseFloat(
              tr[i].getElementsByTagName("td")[3].textContent
            );
            this.total += fullprice;
            this.totalApCom += priceCom;
            this.totalApCom = Number(this.totalApCom.toFixed(2));
            this.totalCom = this.total - this.totalApCom;
            this.totalCom = Number(this.totalCom.toFixed(2));
          } else if (textValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            let fullprice = parseFloat(
              tr[i].getElementsByTagName("td")[2].textContent
            );
            let priceCom = parseFloat(
              tr[i].getElementsByTagName("td")[3].textContent
            );
            this.total += fullprice;
            this.totalApCom += priceCom;
            this.totalApCom = Number(this.totalApCom.toFixed(2));
            this.totalCom = this.total - this.totalApCom;
            this.totalCom = Number(this.totalCom.toFixed(2));
          } else {
            tr[i].style.display = "none";
          }
        }
      }
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
          enddate = new Date(curr.setDate(nbDays));
          break;
        case "week":
          this.selectedDate = "de cette semaine";
          first = curr.getDate() - curr.getDay() + 1;
          end = curr.getDate() - curr.getDay() + 7;
          startdate = new Date(curr.setDate(first));
          enddate = new Date(curr.setDate(end));
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
          enddate.setHours(23);
          enddate.setMinutes(59);
          enddate.setSeconds(59);
          break;
      }
      this.transactions = [];
      db.collection("transactions")
        .orderBy("date")
        .startAt(startdate)
        .endAt(enddate)
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
    this.transactions = [];
    db.collection("transactions")
      .orderBy("date")
      .startAt(startdate)
      .endAt(enddate)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.transactions.push(doc);
          this.total += doc.data().prixAvCom;
          this.totalApCom += Number(doc.data().prixApCom);
          this.totalApCom = Number(this.totalApCom.toFixed(2));
          this.totalCom = this.total - this.totalApCom;
          this.totalCom = Number(this.totalCom.toFixed(2));
        });
      });
  },
  watch: {
    pickupDate: function() {
      //this.resetCheckbox();
      this.total = this.totalApCom = this.totalCom = 0;
      var startdate = new Date(this.pickupDate);
      var enddate = new Date(this.pickupDate);
      this.selectedDate =
        "du " +
        this.pickupDate.substring(8, 10) +
        " " +
        this.months[parseInt(this.pickupDate.substring(5, 7))] +
        " " +
        this.pickupDate.substring(0, 4);
      startdate.setHours(0);
      startdate.setMinutes(0);
      enddate.setHours(23);
      enddate.setMinutes(59);
      enddate.setSeconds(59);
      this.transactions = [];
      db.collection("transactions")
        .orderBy("date")
        .startAt(startdate)
        .endAt(enddate)
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
