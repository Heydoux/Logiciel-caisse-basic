<template>
  <div class="newsale">
    <div class="calculator">
      <div class="answer">{{ answer }}</div>
      <div class="display">{{ logList + current }}</div>
      <div @click="clear" id="clear" class="btn operator">C</div>
      <div @click="addtoLog('/')" id="divide" class="btn operator">
        /
      </div>
      <div @click="addtoLog('*')" id="times" class="btn operator">*</div>
      <div @click="addtoLog('-')" id="minus" class="btn operator">-</div>
      <div @click="append('7')" id="n7" class="btn">7</div>
      <div @click="append('8')" id="n8" class="btn">8</div>
      <div @click="append('9')" id="n9" class="btn">9</div>
      <div @click="addtoLog('+')" id="plus" class="btn operator operator-plus">+</div>
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
        prixAvCom: null,
        prixApCom: null,
        date: null,
        modePaiement: []
      },
      salers: ["Flor", "Emma", "Sous les pavés le vintage"],
      logList: "",
      current: "",
      answer: "",
      operatorClicked: true
    };
  },
  methods: {
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
      this.answer = "";
      this.logList = "";
      this.operatorClicked = false;
    },
    equal() {
      if (this.operatorClicked == false) {
        this.answer = eval(this.logList + this.current);
      } else {
        this.answer = "WHAT?!!";
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

.calculator {
  display: grid;
  grid-template-rows: repeat(7, minmax(60px, auto));
  grid-template-columns: repeat(4, 60px);
  width: fit-content;
  padding: 35px;
  font-family: "Poppins";
  font-weight: 300;
  font-size: 18px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 80px -30px rgba(13, 81, 134, 1);
}

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
}

.display,
.answer {
  grid-column: 1 / 5;
  display: flex;
  align-items: center;
}

.display {
  color: #a3a3a3;
  border-bottom: 1px solid #e1e1e1;
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow: clip;
}

.answer {
  font-weight: 500;
  color: #146080;
  font-size: 55px;
  height: 65px;
}

.zero {
  grid-column: 1 / 3;
}

.operator {
  background-color: #1939f6;
  color: #FFFFFF;
  border: 0.5px solid #142ec5;
}

.operator-plus {
  grid-row-start: span 2;
}

.operator-equal {
  grid-row-start: span 2;
}
</style>
