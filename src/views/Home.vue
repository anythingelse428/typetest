<template>
  <div>
    <HelloWorld />
    <div class="timer">
      <span class="me-1">{{ timePretty }}</span> <span><b>секунд</b></span>
    </div>
    <hr class=" w-100">
    <div v-if="UserInput === '' && isShowResult" class="alert alert-success d-flex w-100 justify-content-center align-items-center border-top border-bottom my-3">
      <h4 class="text-success py-3 my-0">
        {{resultText}}
      </h4>
    </div>
    <div class="home console" @click="setFocus()">
      <div v-if="lang == 'RU'" class="textContainer d-flex mb-3">
        <div v-if="!ready" class="isUserReady text py-3">
          <p class="text-light my-0">Жми на меня, когда будешь готов!<br> И начинай печатать!</p>
        </div>
        <div id="text console text-center">
          <span :class="letterSetClass(letter, letterId)" v-for="(letter, letterId) in textForTypeRU[0]" :key="textForTypeRU[0][letter]">{{ letter }}</span>
        </div>
      </div>
      <div v-if="lang == 'EN'" class="textContainer d-flex mb-3">
        <div v-if="!ready" class="isUserReady text py-3">
          <p class="text-light my-0">Click me, if you ready!</p>
        </div>
        <div id="text console text-center">
          <span :class="letterSetClass(letter, letterId)" v-for="(letter, letterId) in textForTypeEN[0]" :key="textForTypeEN[0][letter]">{{ letter }}</span>
        </div>
      </div>
      <div class="my-0 py-0">
        <textarea
          ref="textArea"
          tabindex="0"
          @keypress.once="timerStart()"
          v-model="UserInput"
          :placeholder="placeholderInput"
          class="form-control my-0 py-0"
          style="opacity: 0;"
        ></textarea>
      </div>

      <!-- <KeyBoard :UserInput="UserInput" /> -->
    </div>
  </div>
</template>

<script>
// import KeyBoard from '../components/KeyBoard.vue'
import HelloWorld from '../components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // KeyBoard,
    HelloWorld
  },
  data () {
    return {
      lang: 'RU',
      time: 0,
      timePretty: '0.00',
      textForTypeEN: [
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quae inventore, nam, impedit ad veritatis neque ex atque perspiciatis quo, dicta cupiditate! Odit perferendis libero esse et accusantium, commodi vero?',
      ],
      textForTypeRU: [
        'Мама я гей!',
      ],
      ready: false,
      UserInput: '',
      placeholderInput: 'Вы еще не узнали скорость своей печати. Приступим!',
      resultText: '',
      isShowResult: false
    }
  },

  methods: {
    setFocus() {
      this.isShowResult = false
      this.ready = true
      this.$refs.textArea.focus()
      console.log(this.$refs.textArea)
    },
    letterSetClass (letter, letterId) {
      const UserInputLength = this.UserInput.length
      if (letterId === UserInputLength) return 'letter-duration letter--cursor'
      if (letterId > UserInputLength - 1) return 'letter-duration letter--default'

      /*  
        TODO:
          - Заменять пробелы на цвет, либо |, что бы было ясно что куда откуда
          - Кидать варну если неверная раскладка
          - Доделать нормальный вывод результата
      */

      this.bu()
      if (letter === this.UserInput[letterId]) return 'letter-duration letter--success text-decoration-line-through'
      else return 'letter-duration letter--danger text-decoration-line-through'
    },
    timerStart() {
      let starttime = Date.now()
      setInterval(() => {
        if (
          (this.UserInput.length > 0) &
          (this.textForTypeRU[0].toLowerCase() !=
            this.UserInput.toLowerCase() ||
            this.textForTypeEN[0].toLowerCase() != this.UserInput.toLowerCase())
        ) {
          this.time = Date.now() - starttime
          this.timePretty =
            `${Math.floor((Date.now() - starttime) / 1000)}` +
            '.' +
            `${Math.floor((Date.now() - starttime) % 1000)}`
        }
        if (this.UserInput == '') {
          this.timePretty = '0.00'
          this.time = Date.now()
          starttime = Date.now()
          clearInterval()
          return
        }
      }, 100)
    },
    bu () {
      if (this.textForTypeRU[0].toLowerCase() == this.UserInput.toLowerCase() || this.textForTypeEN[0].toLowerCase() == this.UserInput.toLowerCase()) {
        switch (this.lang) {
          case 'RU':
            this.placeholderInput =
              Math.floor(this.textForTypeRU[0].length / (this.time / 60000)) +
              ' знаков в минуту!'
              this.resultText = 'Тест завершен! Ваша скорость печати = ' + this.textForTypeEN[0].length / (this.time / 60000) + ' знаков в минуту!'
            break
          case 'EN':
            this.placeholderInput =
              Math.floor(this.textForTypeEN[0].length / (this.time / 60000)) +
              ' знаков в минуту!'

            this.resultText = 'Тест завершен! Ваша скорость печати = ' + this.textForTypeEN[0].length / (this.time / 60000) + ' знаков в минуту!'
            break
        }
        
        this.isShowResult = true
        this.ready = false
        return (this.UserInput = '')
      }
    }
  }
}
</script>

<style>
  .text {
    width: -webkit-fill-available;
  }
  .console {
    cursor: pointer;
    min-height: 25vh;
  }
  .isUserReady {
    min-height: 25vh;
  }
  .letter-duration {
    transition-property: background-color, color, border-color !important;
    transition-duration: 0.1s !important;
  }
  .letter--cursor {
    color: #1266F1 !important;
  }
  .letter--default {
    color: #262626 !important;
  }
  .letter--success {
    color: #00B74A !important;
  }
  .letter--danger {
    color: #F93154 !important;
  }
</style>