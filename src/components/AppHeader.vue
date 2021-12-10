<template>
  <div id="nav" class="d-flex w-100 justify-content-between border-bottom mb-3">
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
   
  </div>
</template>

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