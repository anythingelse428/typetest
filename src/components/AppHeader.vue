<template>
  <div id="nav" class="d-flex w-100 justify-content-between border-bottom mb-5">
    <router-link class="d-flex align-items-center justify-content-center navbar-brand text-dark" to="/">TypeTest</router-link>
    <div class="themeToggler d-flex align-items-center justify-content-center ms-1 fs-1">
      <span class="text mx-2">Themes:</span>
      <i @click="switchTheme('blue')" class="bi bi-circle-fill text-primary mx-2"></i>
      <i @click="switchTheme('red')" class="bi bi-circle-fill text-danger mx-2"></i>
      <i @click="switchTheme('dark')" class="bi bi-circle-fill text-dark mx-2"></i>
      <i @click="switchTheme('default')" class="bi bi-bootstrap-reboot text-dark mx-3"></i>
    </div>
  </div>
</template>

<script>
import Themes from '@/mixins/themes'

export default {
  name: 'AppHeader',
  mounted () {
    Themes.init()
  },
  methods:{
    switchTheme(themeName){
      Themes.set(themeName)
    }
  }
}
</script>