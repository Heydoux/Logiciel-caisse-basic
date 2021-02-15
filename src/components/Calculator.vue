<template>
  <div class="calculator">
    <div class="answer">{{ answer }}</div>
    <div class="display">{{ logList + current }}</div>
    <div @click="clear" id="clear" class="btn operator">C</div>
    <div @click="divide" id="divide" class="btn operator">
      /
    </div>
    <div @click="times" id="times" class="btn operator">*</div>
    <div @click="minus" id="minus" class="btn operator">-</div>
    <div @click="append('7')" id="n7" class="btn">7</div>
    <div @click="append('8')" id="n8" class="btn">8</div>
    <div @click="append('9')" id="n9" class="btn">9</div>
    <div @click="plus" id="plus" class="btn operator operator-plus">+</div>
    <div @click="append('4')" id="n4" class="btn">4</div>
    <div @click="append('5')" id="n5" class="btn">5</div>
    <div @click="append('6')" id="n6" class="btn">6</div>
    <div @click="append('1')" id="n1" class="btn">1</div>
    <div @click="append('2')" id="n2" class="btn">2</div>
    <div @click="append('3')" id="n3" class="btn">3</div>
    <div @click="equal" id="equal" class="btn operator operator-equal">=</div>
    <div @click="append('0')" id="n0" class="zero">0</div>
    <div @click="dot" id="dot" class="btn">.</div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  props: {
    msg: String
  },
  data() {
    return {
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
    appendkey(number) {
      console.log("key press", number);
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
    dot() {
      if (this.current.indexOf(".") === -1) {
        this.append(".");
      }
    },
    divide() {
      this.addtoLog("/");
    },
    times() {
      this.addtoLog("*");
    },
    minus() {
      this.addtoLog("-");
    },
    plus() {
      this.addtoLog("+");
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::selection {
  background: none;
}

body {
  background-color: #3fa9fc;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.calculator {
  display: grid;
  grid-template-rows: repeat(7, minmax(60px, auto));
  grid-template-columns: repeat(4, 60px);
  grid-gap: 12px;
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
  color: #484848;
  background-color: #f4faff;
  border-radius: 5px;
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
  background-color: #d9efff;
  color: #3fa9fc;
}

.operator-plus {
  grid-row-start: span 2;
}

.operator-equal {
  grid-row-start: span 2;
}
</style>
