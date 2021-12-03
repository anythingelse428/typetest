<template>
  <div id="nav" class="d-flex w-100 justify-content-between border-bottom mb-5">
    <router-link
      class="
        d-flex
        align-items-center
        justify-content-center
        navbar-brand
        text-dark
      "
      to="/"
      >TypeTest</router-link
    >
    <div
      class="
        themeToggler
        d-flex
        align-items-center
        justify-content-center
        ms-1
        fs-1
      "
    >
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
</template>
<style scoped>
.active {
  border-bottom: 2px solid var(--letterBg1);
  animation-duration: 400ms;
  margin-bottom: 0.1em;
  padding: 0;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-name: activeAnime;
  position: sticky;
}
@keyframes activeAnime {
  from {
    border-bottom-color: var(--letterBg1);
  }
  to {
    border-bottom-color: rgb(218, 220, 230);
  }
}
[class^="bi-"]::before,
[class*=" bi-"]::before {
  display: inline-block;
  font-family: bootstrap-icons !important;
  font-style: normal;
  font-weight: normal !important;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: -0.225em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<script>
import Themes from "@/mixins/themes";

export default {
  name: "AppHeader",
  data() {
    return {
      activeTheme: "blue",
      activeColor: "",
    };
  },
  mounted() {
    Themes.init();
    if (localStorage.activeTheme) this.activeTheme = localStorage.activeTheme;
  },
  watch: {
    activeTheme(newActiveTheme) {
      localStorage.activeTheme = newActiveTheme;
    },
  },
  methods: {
    switchTheme(themeName) {
      Themes.set(themeName);
      this.activeTheme = themeName;
    },
  },
};
</script>