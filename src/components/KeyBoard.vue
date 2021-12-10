<template>
  <div class="settings">
    <i class="bi bi-gear text-dark" @click="showSettings = !showSettings"></i>
    <div class="settings__container" v-show="showSettings">
      <div class="volumeSettigs">
        <div class="settigLine">
          <label for="Iphone">Iphone sound</label
          ><input
            type="radio"
            name=""
            value="Iphone"
            id="Iphone"
            v-model="choosnSound"
          />
        </div>
        <div class="settigLine">
          <label for="Mech">Mech sound</label
          ><input
            type="radio"
            name=""
            value="Mech"
            id="Mech"
            v-model="choosnSound"
          />
        </div>
        <div class="settigLine">
          <label for="noSound">No sound</label
          ><input
            type="radio"
            name=""
            value=""
            id="noSound"
            v-model="choosnSound"
          />
        </div>
        <div class="settigLine flex-column align-items-start">
          <label for="volume">Громкость</label
          ><input
            v-model="choosnSoundVol"
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="1"
            step=".01"
          />
        </div>
      </div>
      <div class="keyColorSettings">
        <p class="keyColorSettings__text">Цветовая схема  клавиатуры</p>
        <div class="keyColorSettings__themes">
          <i
            @click="switchTheme('blue')"
            class="bi bi-circle-fill text-primary mx-2"
            :class="{ active: activeTheme == 'blue' }"
          ></i>
          <i
            @click="switchTheme('red')"
            class="bi bi-circle-fill text-danger mx-2"
            :class="{ active: activeTheme == 'red' }"
          ></i>
          <i
            @click="switchTheme('dark')"
            class="bi bi-circle-fill text-dark mx-2"
            :class="{ active: activeTheme == 'dark' }"
          ></i>
          <i
            @click="switchTheme('default')"
            class="bi bi-bootstrap-reboot text-dark mx-3"
          ></i>
        </div>
      </div>
      <div class="keyboardSettings">
        <p class="keyboardSettings__text">
          настроек пока нема спать хочу
        </p>
      </div>
    </div>
  </div>
  <div class="qwerty align-items-center" v-if="lang == 'RU'">
    <div class="line" id="line1">
      <span
        class="letter border rounded-circle btnFix"
        :class="[pressed == ruButtons1 ? 'clicked' : 'default']"
        @click="$emit('customChange', $event.target)"
        ref="ruButtons1"
        :id="ruButtons1"
        v-for="ruButtons1 in QWERTYru1"
        :key="ruButtons1.QWERTYru1"
      >
        {{ ruButtons1 }}
      </span>
    </div>
    <div class="line" id="line2">
      <span
        class="letter border rounded-circle btnFix"
        :class="[pressed == ruButtons2 ? 'clicked' : 'default']"
        @click="$emit('customChange', $event.target)"
        :id="ruButtons2"
        v-for="ruButtons2 in QWERTYru2"
        :key="ruButtons2.QWERTYru2"
      >
        {{ ruButtons2 }}
      </span>
    </div>
    <div class="line" id="line3">
      <i
        @click="switchLang(), $emit('whatLang', lang)"
        class="bi bi-globe langBTN"
      ></i>
      <span
        class="letter border rounded-circle btnFix"
        :class="[pressed == ruButtons3 ? 'clicked' : 'default']"
        @click="$emit('customChange', $event.target)"
        :id="ruButtons3"
        v-for="ruButtons3 in QWERTYru3"
        :key="ruButtons3.QWERTYru3"
      >
        {{ ruButtons3 }}
      </span>
      <span
        class="letter border rounded-circle btnFix bi bi-backspace"
        @click="$emit('backspase', $event.target)"
      >
      </span>
    </div>
    <div
      class="spaceBtn flex letter border rounded-2"
      :class="[pressed == 'space' ? 'clicked' : 'default']"
      id=" "
      @click="$emit('customChange', $event.target)"
    ></div>
  </div>

  <div class="qwerty align-items-center" v-if="lang == 'EN'">
    <div class="line" id="line1">
      <span
        :class="[pressed == enButtons1 ? 'clicked' : 'default']"
        class="letter border rounded-circle btnFix"
        @click="$emit('customChange', $event.target)"
        :id="enButtons1"
        v-for="enButtons1 in QWERTYen1"
        :key="enButtons1.QWERTYen1"
      >
        {{ enButtons1 }}
      </span>
    </div>

    <div class="line" id="line2">
      <span
        class="letter border rounded-circle btnFix"
        @click="$emit('customChange', $event.target)"
        :class="[pressed == enButtons2 ? 'clicked' : 'default']"
        :id="enButtons2"
        v-for="enButtons2 in QWERTYen2"
        :key="enButtons2.QWERTYen2"
      >
        {{ enButtons2 }}
      </span>
    </div>

    <div class="line" id="line3">
      <i
        @click="switchLang(), $emit('whatLang', lang)"
        class="bi bi-globe langBTN"
      ></i>
      <span
        :class="[pressed == enButtons3 ? 'clicked' : 'default']"
        class="letter border rounded-circle btnFix"
        @click="$emit('customChange', $event.target)"
        :id="enButtons3"
        v-for="enButtons3 in QWERTYen3"
        :key="enButtons3.QWERTYen3"
      >
        {{ enButtons3 }}
      </span>
      <span
        class="letter border rounded-circle btnFix bi bi-backspace"
        @click="$emit('backspase', $event.target)"
      >
      </span>
    </div>
    <div
      :class="[pressed == 'space' ? 'clicked' : 'default']"
      class="spaceBtn flex letter border rounded-2"
      @click="$emit('customChange', $event.target)"
      id=" "
    ></div>
  </div>
</template>
<script>
import { Howl } from "howler";
import Themes from "@/mixins/themes";
export default {
  name: "KeyBoard",
  emits: ["customChange", "backspase", "whatLang"],
  props: {
    UserInput: String,
  },
  data() {
    return {
      activeTheme: "blue",
      activeColor: "",
      showSettings: false,
      QWERTYen1: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      QWERTYen2: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      QWERTYen3: ["z", "x", "c", "v", "b", "n", "m", ".", ","],
      QWERTYru1: ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
      QWERTYru2: ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж"],
      QWERTYru3: ["э", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", ","],
      lang: "RU",
      pressed: "",
      letterHov: "#7e7cec",
      BGcolor1: "#ef7b79",
      BGcolor2: "#edef79",
      BGcolor3: "#79edef",
      letterBorder: "#9cdfcb",
      letterSize: "5",
      textClr: "#000000",
      opacityLine: 1,
      choosnSound: "Iphone",
      choosnSoundVol: 0.7,
    };
  },
  mounted() {
    Themes.init(".qwerty");
    console.log("Keybard: " + Themes.init());
  },
  methods: {
    switchTheme(themeName) {
      Themes.set(themeName);
      this.activeTheme = themeName;
    },
    playButtonSound() {
      let sound1 = new Howl({
        src: [require("../assets/1.mp3")],
        volume: this.choosnSoundVol,
      });
      let sound2 = new Howl({
        src: [require("../assets/2.mp3")],
        volume: this.choosnSoundVol,
      });
      let IphoneSounds = [sound1, sound2];
      let MechSnd = new Howl({
        src: [require("../assets/click.mp3")],
        volume: this.choosnSoundVol,
      });
      switch (this.choosnSound) {
        case "Iphone": {
          IphoneSounds[Math.floor(Math.random() * 2)].play();
          break;
        }
        case "Mech": {
          MechSnd.play();
          break;
        }
      }
    },

    switchLang() {
      switch (this.lang) {
        case "RU":
          this.lang = "EN";
          break;
        default:
          this.lang = "RU";
      }
      console.log(this.lang);
    },
  },

  watch: {
    activeTheme(newActiveTheme) {
      localStorage.activeTheme = newActiveTheme;
    },
    UserInput(newInput, oldInput) {
      this.pressed = newInput.replace(oldInput, "");
      this.playButtonSound();
      if (this.pressed == " ") this.pressed = "space";
      setTimeout(() => {
        this.pressed = "";
      }, 400);
      console.log("Old: " + oldInput);
      console.log("key: " + newInput.replace(oldInput, ""));
    },
  },
};
</script>
<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
}
[scheme="default"] {
  --letter-hover: #7e7cec;
  --letter-background1: #ef7b79;
  --letter-background2: #edef79;
  --letter-background3: #79edef;
  --letterBorder: #9cdfcb;
  --keyboard-color: #080514;
}

[scheme="blue"] {
  --letter-hover: #58e8ff;
  --letter-background1: #84aaff;
  --letter-background2: #6493fe;
  --letter-background3: #3270fd;
  --letterBorder: #3270fd;
  --keyboard-color: #e2e2e2;
}

[scheme="red"] {
  --letter-hover: #ff953b;
  --letter-background1: #f84444;
  --letter-background2: #ff0018;
  --letter-background3: #ff162c;
  --letterBorder: #ffb94f;
  --keyboard-color: #ebebeb;
}

[scheme="dark"] {
  --letter-hover: #949494;
  --letter-background1: #000000;
  --letter-background2: #000000;
  --letter-background3: #000000;
  --letterBorder: #545454;
  --keyboard-color: #e4e4e4;
}
.settings{
    position: relative;
    right: 40%;
}
.settings__container {
display: flex;
    color: whitesmoke;
    background-color: rgb(60 20 62 / 48%);
    width: 40%;
    left: 60%;
    position: relative;
    padding: 1em;
    border-radius: 0.2em;

}
.volumeSettigs {
  width: 30%;
  display: flex;
  flex-direction: column;
}
.settigLine {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 2em;
}
.settigLine label {
  margin-right: 0.2em;
}
.settigLine input[type="radio"] {
  -webkit-appearance: none;
  appearance: none;
  -webkit-print-color-adjust: exact;
  background: rgba(0, 0, 0, 0);
  color: rgba(0, 0, 0, 0.76);
  font: inherit;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid;
  border-radius: 50%;
}
.settigLine input[type="radio"]:checked {
  background: rgba(22, 194, 94, 0.87);
  color: #00000000;
}
.keyColorSettings{
  width: 30%;
}
.keyColorSettings__text{
  font-size: medium;
  margin: 0;
}
.keyColorSettings__themes{
  display: flex;
  font-size: 2em;
}
.keyColorSettings__themes i{
  cursor: pointer;
}
.keyboardSettings{
  width: 30%;
}
.active {
  border-bottom: 2px solid blue;
  animation-duration: 400ms;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-name: activeAnime;
  position: sticky;
}
@keyframes activeAnime {
  from {
    border-bottom-color: var(--letter-background1);
  }
  to {
    border-bottom-color: rgb(218, 220, 230);
  }
}

#line3 i {
  font-size: calc(var(--letterSize) * 0.4) !important;
}

.qwerty {
  color: var(--keyboard-color) !important;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}

.line {
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

span,
textarea {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#line1 span {
  background-color: var(--letter-background1);
}

#line2 span {
  background-color: var(--letter-background2);
}

#line3 span {
  background-color: var(--letter-background3);
}

.letter {
  width: var(--letterSize);
  height: var(--letterSize);
  font-family: "Roboto", sans-serif;
  font-size: calc(var(--letterSize) * 0.45);
  font-weight: 100;
  margin: 0 0.5% 0.5% 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border: 1px solid #dee2e6;
}

.letter:hover {
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  background-color: var(--letter-hover) !important;
  top: 1px;
  left: 1px;
  position: relative;
  border: 3px solid var(--letterBorder) !important;
}

.clicked {
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  background-color: var(--letter-hover) !important;
  top: 1px;
  left: 1px;
  position: relative;
  border: 3px solid var(--letterBorder) !important;
}

.spaceBtn {
  width: 40%;
  margin: 0.2em auto;
  border-color: var(--letter-background3) !important;
}
</style>