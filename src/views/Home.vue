<template>
  <div class="home">
    <HelloWorld />
    <div class="mobileAlert">
      <i class="bi bi-keyboard text-danger" @click="showModal = true"></i>
      <div class="keyboardModal" v-show="showModal">
        <i class="bi bi-x-octagon text-light" @click="showModal = false"></i>
        <h2 class="text-light">
          Мы заметили, что Вы вошли с мобильного устройства, отключить
          встроенную виртуальную клавиаутуру?
        </h2>
        <button
          class="btn btn-outline-danger mx-2"
          @click="(inputmodeAllow = 'text'), (showModal = false)"
        >
          Нет
        </button>
        <button
          class="btn btn-outline-success mx-2"
          @click="(inputmodeAllow = 'none'), (showModal = false)"
        >
          Да
        </button>
      </div>
    </div>
    <div class="timer">
      <span class="me-1">{{ timePretty }}</span> <span><b>секунд</b></span>
    </div>
    <hr class="w-100" />
    <div
      v-if="UserInput === '' && isShowResult"
      class="
        alert alert-success
        d-flex
        w-100
        justify-content-center
        align-items-center
        border-top border-bottom
        my-3
      "
    >
      <h4 class="text-success py-3 my-0">
        {{ resultText }}
      </h4>
    </div>
    <div class="home console" @click="setFocus()">
      <div v-if="lang == 'RU'" class="textContainer d-flex mb-3">
        <div v-if="!ready" class="isUserReady">
          <p class="text-light my-0">
            Жми на меня, когда будешь готов!<br />
            И начинай печатать!
          </p>
        </div>
        <div id="text console text-center">
          <span
            :class="letterSetClass(letter.toLowerCase(), letterId)"
            v-for="(letter, letterId) in textForTypeRU[0]"
            :key="textForTypeRU[0][letter]"
            >{{ letter }}</span
          >
        </div>
      </div>
      <div v-if="lang == 'EN'" class="textContainer d-flex mb-3">
        <div v-if="!ready" class="isUserReady text py-3">
          <p class="text-light my-0">Click me, if you ready!</p>
        </div>
        <div id="text console text-center">
          <span
            :class="letterSetClass(letter, letterId)"
            v-for="(letter, letterId) in textForTypeEN[0]"
            :key="textForTypeEN[0][letter]"
            >{{ letter }}</span
          >
        </div>
      </div>
      <div class="my-0 py-0">
        <i class="bi bi-eye" v-show="!showInputText" @click="showInputText=true"></i>
        <i class="bi bi-eye-slash" v-show="showInputText" @click="showInputText=false"></i>
        <textarea
          ref="textArea"
          tabindex="0"
          @keypress.once="timerStart()"
          :value="UserInput"
          @input="UserInput = $event.target.value"
          :placeholder="placeholderInput"
          class="form-control my-0 py-0"
          :class="{ showInputText: showInputText }"
          :inputmode="inputmodeAllow"

        ></textarea>
      </div>
      <KeyBoard :UserInput="UserInput" @custom-change="addFromKeyboard" @backspase="backspace"/>
    </div>
  </div>
</template>

<script>
import KeyBoard from "../components/KeyBoard.vue";
import HelloWorld from "../components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    KeyBoard,
    HelloWorld,
  },
  data() {
    return {
      showModal: false,
      showInputText:false,
      inputmodeAllow: "text",
      lang: "RU",
      time: 0,
      timePretty: "0.00",
      textForTypeEN: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quae inventore, nam, impedit ad veritatis neque ex atque perspiciatis quo, dicta cupiditate! Odit perferendis libero esse et accusantium, commodi vero?",
      ],
      textForTypeRU: [
        "Одуванчик похож на солнышко с золотыми лучами. А рядом белеет пушистый шарик. Таня дунула на шарик. Полетели пушинки. Потому и называется одуванчик. Танюша пришла домой с золотым веночком на голове. Вечером уснула девочка. И одуванчики закрыли свои цветочки до утра",
      ],
      ready: false,
      UserInput: "",
      placeholderInput: "Здесь будет отображаться то, что Вы ввели",
      resultText: "",
      isShowResult: false,
    };
  },

  methods: {
    addFromKeyboard(event) {
      this.UserInput = this.UserInput + event.innerText;
      if (event.innerText == "") this.UserInput = this.UserInput + " ";
    },
    backspace(){
      this.UserInput  =  this.UserInput.slice(0, -1)
    },
    setFocus() {
      this.isShowResult = false;
      this.ready = true;
      this.$refs.textArea.focus();
      if(!this.$refs.textArea) return;
    },
    letterSetClass(letter, letterId) {
      const UserInputLength = this.UserInput.length;
      if (letterId === UserInputLength) return "letter-duration letter--cursor";
      if (letterId > UserInputLength - 1)
        return "letter-duration letter--default";

      /*  
        TODO:
          - Заменять пробелы на цвет, либо |, что бы было ясно что куда откуда|/
          - Кидать варну если неверная раскладка
          - Доделать нормальный вывод результата
      */

      this.bu();
      if (letter.toLowerCase() === this.UserInput[letterId].toLowerCase())
        return "letter-duration letter--success text-decoration-line-through";
      else return "letter-duration letter--danger text-decoration-line-through";
    },
    timerStart() {
      let starttime = Date.now();
      setInterval(() => {
        if (
          (this.UserInput.length > 0) &
          (this.textForTypeRU[0].toLowerCase() !=
            this.UserInput.toLowerCase() ||
            this.textForTypeEN[0].toLowerCase() != this.UserInput.toLowerCase())
        ) {
          this.time = Date.now() - starttime;
          this.timePretty =
            `${Math.floor((Date.now() - starttime) / 1000)}` +
            "." +
            `${Math.floor((Date.now() - starttime) % 1000)}`;
        }
        if (this.UserInput == "") {
          this.timePretty = "0.00";
          this.time = Date.now();
          starttime = Date.now();
          clearInterval();
          return;
        }
      }, 100);
    },
    bu() {
      if (
        this.textForTypeRU[0].toLowerCase() == this.UserInput.toLowerCase() ||
        this.textForTypeEN[0].toLowerCase() == this.UserInput.toLowerCase()
      ) {
        switch (this.lang) {
          case "RU":
            this.placeholderInput =
              Math.ceil(this.textForTypeRU[0].length / this.timePretty) +
              " знаков в секунду!";
            this.resultText =
              "Тест завершен! Ваша скорость печати = " +
              this.textForTypeEN[0].length / this.timePretty +
              " знаков в секунду!";
            break;
          case "EN":
            this.placeholderInput =
              Math.ceil(this.textForTypeEN[0].length / this.timePretty) +
              " знаков в секунду!";

            this.resultText =
              "Тест завершен! Ваша скорость печати = " +
              this.textForTypeEN[0].length / this.timePretty +
              " знаков в секунду!";
            break;
        }

        this.isShowResult = true;
        this.ready = false;
        return (this.UserInput = "");
      }
    },
  },
};
</script>

<style scoped>
.mobileAlert button:focus {
  box-shadow: none !important;
}
.keyboardModal {
  transition: 3s;
  position: absolute;
  background: darkblue;
  z-index: 100500;
  left: 0;
  right: 0;
  padding: 1.2em;
}
textarea{
  opacity: 0;
}
.showInputText{
  opacity: 1!important;
  
}
.console {
  cursor: pointer;
}
.letter-duration {
  transition-property: background-color, color, border-color !important;
  transition-duration: 0.1s !important;
}
.letter--cursor {
  color: #1266f1 !important;
}
.letter--cursor::after {
  content: "|";
  color: #00b74a;
  animation-duration: 300ms;
  margin-left: -0.2em;
  padding: 0;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-name: cursorAnim;
}
@keyframes cursorAnim {
  from {
    color: #00b74a;
  }
  to {
    color: #fcfcfc;
  }
}
.letter--default {
  color: #262626 !important;
}
.letter--success {
  color: #00b74a !important;
}
.letter--danger {
  color: #f93154 !important;
}
</style>