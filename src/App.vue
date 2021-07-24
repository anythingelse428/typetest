<template>
  <div id="nav" class="d-flex w-100 justify-content-between">
    <router-link class="" to="/">TypeTest</router-link>
    <div class="themeToggler ms-3 fs-1 ">
      <span class="text">Themes:</span>
      <i @click="switchTheme('blue')" class="bi bi-circle-fill text-primary mx-2"></i>
      <i @click="switchTheme('red')" class="bi bi-circle-fill text-danger mx-2"></i>
      <i @click="switchTheme('dark')" class="bi bi-circle-fill text-dark mx-2"></i>
      <i @click="switchTheme('default')" class="bi bi-bootstrap-reboot text-dark mx-3"></i>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import Themes from '@/mixins/themes'

export default {
  name: 'App',
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
