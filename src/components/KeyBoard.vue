<template>
  <div class="line instrumental">
    <div class="btn-group dropend">
      <button
        class="btn btn-sm btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="bi bi-volume-up"></i>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <a class="dropdown-item" href="#" @click="choosnSound = 'Iphone'"
            >Iphone sound</a
          >
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="choosnSound = 'Mech'"
            >Mech sound</a
          >
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="choosnSound = ''"
            >No sound</a
          >
        </li>
        <li>
          <input
            v-model="choosnSoundVol"
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="1"
            step=".01"
          />
        </li>
      </ul>
    </div>

    <div class="btn-group dropend">
      <button
        class="btn btn-sm btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="bi bi-palette"></i>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
        <li class="dropdown-item">
          <input type="color" @input="cssRootAdd()" v-model="BGcolor1" /> Цвет
          кнопок на первой линии
        </li>
        <li class="dropdown-item">
          <input type="color" @input="cssRootAdd()" v-model="BGcolor2" /> Цвет
          кнопок на второй линии
        </li>
        <li class="dropdown-item">
          <input type="color" @input="cssRootAdd()" v-model="BGcolor3" /> Цвет
          кнопок на третьей линии
        </li>
        <li class="dropdown-item">
          <input type="color" @input="cssRootAdd()" v-model="hoverCLR" /> Цвет
          активации кнопок
        </li>
        <li class="dropdown-item">
          <input type="color" @input="cssRootAdd()" v-model="letterBorder" />
          Цвет обводки при активации
        </li>
        <li class="dropdown-item">
          <input type="color" @input="cssRootAdd()" v-model="textClr" /> Цвет
          текста
        </li>
      </ul>
    </div>
  </div>
  <div class="qwerty align-items-center" v-if="lang == 'RU'">
    <div class="line" id="line1">
      <span
        class="letter border rounded-circle btnFix"
        @click="addToIntput()"
        ref="ruButtons1"
        :id="ruButtons1"
        v-for="ruButtons1 in QWERTYru1"
        :key="ruButtons1.QWERTYru1"
      >
        {{ ruButtons1 }}
      </span>
    </div>
    <br />
    <div class="line" id="line2">
      <span
        class="letter border rounded-circle btnFix"
        @click="addToIntput()"
        :id="ruButtons2"
        v-for="ruButtons2 in QWERTYru2"
        :key="ruButtons2.QWERTYru2"
      >
        {{ ruButtons2 }}
      </span>
    </div>
    <br />
    <div class="line" id="line3">
      <i @click="switchLang()" class="bi bi-globe langBTN"></i>
      <span
        class="letter border rounded-circle btnFix"
        @click="addToIntput()"
        :id="ruButtons3"
        v-for="ruButtons3 in QWERTYru3"
        :key="ruButtons3.QWERTYru3"
      >
        {{ ruButtons3 }}
      </span>
    </div>

    <div class="spaceBtn flex letter border rounded-2" id=" "></div>
  </div>

  <div class="qwerty align-items-center" v-if="lang == 'EN'">
    <div class="line" id="line1">
      <span
        class="letter border rounded-circle btnFix"
        @click="addToIntput()"
        :id="enButtons1"
        v-for="enButtons1 in QWERTYen1"
        :key="enButtons1.QWERTYen1"
      >
        {{ enButtons1 }}
      </span>
    </div>
    <br />
    <div class="line" id="line2">
      <span
        class="letter border rounded-circle btnFix"
        @click="addToIntput()"
        :id="enButtons2"
        v-for="enButtons2 in QWERTYen2"
        :key="enButtons2.QWERTYen2"
      >
        {{ enButtons2 }}
      </span>
    </div>
    <br />
    <div class="line" id="line3">
      <i @click="switchLang()" class="bi bi-globe langBTN"></i>
      <span
        class="letter border rounded-circle btnFix"
        @click="addToIntput()"
        :id="enButtons3"
        v-for="enButtons3 in QWERTYen3"
        :key="enButtons3.QWERTYen3"
      >
        {{ enButtons3 }}
      </span>
    </div>
    <div
      class="spaceBtn flex letter border rounded-2"
      @click="addToIntput()"
      id=" "
    ></div>
  </div>
</template>
<script>
import { Howl } from "howler"

export default {
  name: "KeyBoard",
  props: {
    UserInput: String,
  },
  data: function () {
    return {
      QWERTYen1: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      QWERTYen2: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      QWERTYen3: ["z", "x", "c", "v", "b", "n", "m"],
      QWERTYru1: ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
      QWERTYru2: ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж"],
      QWERTYru3: ["э", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю"],
      lang: "RU",
      root: null,
      hoverCLR: "#7e7cec",
      BGcolor1: "#ef7b79",
      BGcolor2: "#edef79",
      BGcolor3: "#79edef",
      letterBorder: "#9cdfcb",
      textClr: "#000",
      opacityLine: 1,
      choosnSound: "Iphone",
      choosnSoundVol: 0.7,
    }
  },

  methods: {
    cssRootAdd: function () {
      this.$nextTick(() => {
        this.root.style.setProperty("--letterHov", this.hoverCLR)
        this.root.style.setProperty("--letterBg1", this.BGcolor1)
        this.root.style.setProperty("--letterBg2", this.BGcolor2)
        this.root.style.setProperty("--letterBg3", this.BGcolor3)
        this.root.style.setProperty("--letterBorder", this.letterBorder)
        this.root.style.setProperty("--text", this.textClr)
      })
    },

    changeButtonColor() {
      let currentBTN = this.UserInput[this.UserInput.length - 1]
      let beforeStyle = document.getElementById(currentBTN.toLowerCase()).style
        .cssText
      console.log(beforeStyle)

      document.getElementById(currentBTN.toLowerCase()).style.cssText =
        "background-color:var(--letterHov)!importanttop: 1px left: 1pxposition: relativeborder:3px solid var(--letterBorder)!important"
      setTimeout(() => {
        document.getElementById(currentBTN.toLowerCase()).style.cssText =
          beforeStyle
        return
      }, 112)

      let sound1 = new Howl({
        src: [require("../assets/1.mp3")],
        volume: this.choosnSoundVol,
      })
      let sound2 = new Howl({
        src: [require("../assets/2.mp3")],
        volume: this.choosnSoundVol,
      })
      let arrSound = [sound1, sound2]
      let MechSnd = new Howl({
        src: [require("../assets/click.mp3")],
        volume: this.choosnSoundVol,
      })

      // start shiting 4 iphone sound
      function getRandomInt(max) {
        return Math.floor(Math.random() * max)
      }
      function playing() {
        let a = getRandomInt(2)
        arrSound[a].play()
        return
      }
      // end shiting 4 iphone sound

      switch (this.choosnSound) {
        case "Iphone": {
          playing()
          break
        }
        case "Mech": {
          MechSnd.play()
          break
        }
      }

      // симпл мод: охуенно красивыо анимированные аки воллпапер жнжин фоны и простая кастомизируемая коавиатура
      // фоный можно крутить слайдером с желли эфектом
    },

    switchLang() {
      switch (this.lang) {
        case "RU":
          this.lang = "EN"
          break
        default:
          this.lang = "RU"
      }
      console.log(this.lang)
    },
    addToIntput() {
      console.log(this.$refs.ruButtons1)
    },
  },

  mounted () {
    this.root = document.documentElement
  },
  watch: {
    UserInput: function () {
      this.changeButtonColor()
    },
  },
}
</script>
