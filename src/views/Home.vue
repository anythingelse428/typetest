<template>
  <div>
    <HelloWorld />
    <div class="timer">
      <span class="me-1">{{ timePretty }}</span> <span><b>секунд</b></span>
    </div>
    <hr class=" w-100">
    <div class="home" @click="ready = 1">
      <div v-if="lang == 'RU'" class="textContainer d-flex mb-3">
        <div v-if="!ready" class="isUserReady text py-3">
          <p class="text-light my-0">Жми на меня, когда будешь готов!</p>
        </div>
        <div id="text">
          <span :id="index" v-for="(letter, index) in textForTypeRU[0]" :key="textForTypeRU[0][letter]">{{ letter }}</span>
        </div>
      </div>

      <div v-if="lang == 'EN'" class="textContainer d-flex mb-3">
        <div v-if="!ready" class="isUserReady text py-3">
          <p class="text-light my-0">Жми на меня, когда будешь готов!</p>
        </div>
        <div id="text">
          <span :id="index" v-for="(letter, index) in textForTypeEN[0]" :key="textForTypeEN[0][letter]">{{ letter }}</span>
        </div>
      </div>
      <div class="typing mb-3">
        <textarea
          @input="test()"
          @keypress.once="timerStart()"
          v-model="UserInput"
          :placeholder="placeholderInput"
          class="form-control border-dark"
          id="floatingTextarea"
        ></textarea>
      </div>

      <KeyBoard :UserInput="UserInput" />
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
  data () {
    return {
      lang: "RU",
      time: 0,
      timePretty: "0.00",
      textForTypeEN: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quae inventore, nam, impedit ad veritatis neque ex atque perspiciatis quo, dicta cupiditate! Odit perferendis libero esse et accusantium, commodi vero?",
      ],
      textForTypeRU: [
        "Таким образом начало повседневной работы по формированию позиции играет важную роль в формировании соответствующий условий активизации",
      ],
      ready: 0,
      UserInput: "",
      placeholderInput: "Вы еще не узнали скорость своей печати. Приступим!",
    };
  },

  methods: {
    change(val) {
      console.log("change", val);
    },

    test() {
      function replaceAll(string, search, replace) {
        return string.toLowerCase().split(search.toLowerCase()).join(replace);
      }
      function tagSelected($el, search, selectedClass, replaceTag = "span") {
        const content = $el.textContent;

        $el.innerHTML = replaceAll(
          content,
          search,
          `<${replaceTag} class="${selectedClass}">${search}</${replaceTag}>`
        );
      }
      let $tag = document.getElementById(this.UserInput.length - 1);

      if (
        this.textForTypeRU[0][this.UserInput.length - 1].toLowerCase() ==
        this.UserInput[this.UserInput.length - 1].toLowerCase()
      ) {
        tagSelected(
          $tag,
          document.querySelector("#text").textContent[
            this.UserInput.length - 1
          ],
          "text-primary",
          "span"
        );
        return $tag;
      } else if (
        this.textForTypeEN[0][this.UserInput.length - 1].toLowerCase() ==
        this.UserInput[this.UserInput.length - 1].toLowerCase()
      ) {
        tagSelected(
          $tag,
          document.querySelector("#text").textContent[
            this.UserInput.length - 1
          ],
          "text-primary",
          "span"
        );
        return $tag;
      } else {
        tagSelected(
          $tag,
          document.querySelector("#text").textContent[
            this.UserInput.length - 1
          ],
          "text-danger",
          "span"
        );
        return $tag;
      }
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
      }, 1);
    },
  },

  beforeUpdate: function () {
    if (
      this.textForTypeRU[0].toLowerCase() == this.UserInput.toLowerCase() ||
      this.textForTypeEN[0].toLowerCase() == this.UserInput.toLowerCase()
    ) {
      switch (this.lang) {
        case "RU":
          this.placeholderInput =
            Math.floor(this.textForTypeRU[0].length / (this.time / 60000)) +
            " знаков в минуту!";
          alert(
            "Тест завершен! Ваша скорость печати = " +
              this.textForTypeRU[0].length / (this.time / 60000) +
              " знаков в минуту!"
          );
          break;
        case "EN":
          this.placeholderInput =
            Math.floor(this.textForTypeEN[0].length / (this.time / 60000)) +
            " знаков в минуту!";
          alert(
            "Тест завершен! Ваша скорость печати = " +
              this.textForTypeEN[0].length / (this.time / 60000) +
              " знаков в минуту!"
          );
          break;
      }

      return (this.UserInput = "");
    }
  },
};
</script>


  

