<template>
  <div class="exports h-100">
    <div class="row mt-5">
      <div class="col-md-12">
        <h2 class="mb-5">Quel mois souhaites-tu exporter ?</h2>
      </div>
      <div class="offset-md-1 col-md-3">
        <label class="mr-3" for="months">Mois : </label>
        <select name="month" id="months" v-model="monthToExport">
          <option value="janvier" selected="selected">Janvier</option>
          <option value="fevrier">Février</option>
          <option value="mars">Mars</option>
          <option value="avril">Avril</option>
          <option value="mai">Mai</option>
          <option value="juin">Juin</option>
          <option value="juillet">Juillet</option>
          <option value="aout">Août</option>
          <option value="septembre">Septembre</option>
          <option value="octobre">Octobre</option>
          <option value="novembre">Novembre</option>
          <option value="decembre">Décembre</option>
        </select>
      </div>
      <div class="col-md-3">
        <label class="mr-3" for="years">Année : </label>
        <select name="year" id="years" v-model="yearToExport">
          <option value="2021">2021</option>
        </select>
      </div>
      <div class="col-md-5">
        <button class="btn btn-slpv-primary mr-3" @click="exportSales">
          Exporter
        </button>
        <export-excel
          :data="json_data"
          :fields="json_fields"
          :name="exportName"
          class="d-none btn btn-primary"
          id="downloadBtn"
        >
          Télécharger le fichier
        </export-excel>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  name: "ExportsExcel",
  components: {},
  props: {
    msg: String
  },
  data() {
    return {
      monthToExport: null,
      yearToExport: null,
      months: [
        "janvier",
        "fevrier",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "aout",
        "septembre",
        "octobre",
        "novembre",
        "decembre"
      ],
      json_fields: {
        "Date": "date",
        "Compte": "account",
        "Méthode de paiement": "paiementMethod",
        "Prix de vente": "saleprice"
      },
      json_data: [],
      newData: {
        "date": null,
        "account": null,
        "paiementMethod": null,
        "saleprice": null
      },
      exportName: null
    };
  },
  methods: {
    exportSales() {
      var currDate = new Date();
      var nbDays;
      nbDays = new Date(
        currDate.getFullYear(),
        currDate.getMonth() + 1,
        0
      ).getDate();
      var startdate = new Date(currDate.setDate(1));
      var enddate = new Date(currDate.setDate(nbDays));
      db.collection("transactions")
        .orderBy("date")
        .startAt(startdate)
        .endAt(enddate)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.newData = [];
            var date = this.DateConverter(doc.data().date);
            this.newData.date = date;
            this.newData.account = doc.data().vendeuse;
            this.newData.paiementMethod = doc.data().modePaiement;
            this.newData.saleprice = doc.data().prixApCom;
            this.json_data.push(this.newData);
          });
        });
      $("#downloadBtn").removeClass("d-none");
    },
    DateConverter(timestamp) {
      // convert unix timestamp to milliseconds
      var ts_ms = timestamp * 1000;
      // initialize new Date object
      var date_ob = new Date(ts_ms);
      // year as 4 digits (YYYY)
      var year = date_ob.getFullYear();
      // month as 2 digits (MM)
      var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      // date as 2 digits (DD)
      var date = ("0" + date_ob.getDate()).slice(-2);
      // hours as 2 digits (hh)
      var hours = ("0" + date_ob.getHours()).slice(-2);
      // minutes as 2 digits (mm)
      var minutes = ("0" + date_ob.getMinutes()).slice(-2);
      // seconds as 2 digits (ss)
      var seconds = ("0" + date_ob.getSeconds()).slice(-2);
      var newDate =
        date +
        "/" +
        month +
        "/" +
        year +
        " - " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
      return newDate;
    }
  },
  created() {
    var d = new Date();
    var currMonth = d.getMonth();
    var currYear = d.getFullYear();
    var currMonthText = this.months[currMonth];
    this.monthToExport = currMonthText;
    this.yearToExport = currYear;
    this.exportName = currMonthText + "-" + currYear;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
