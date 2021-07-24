<template>
 
    <div id="nav" class="d-flex w-100 justify-content-between  ">
      <router-link to="/">Home</router-link>
      <div class="themeToggler ms-3 fs-1 ">
        <i @click="switchTheme('blue')" class="bi bi-circle-fill text-primary"></i>
        <i @click="switchTheme('red')" class="bi bi-circle-fill text-danger"></i>
        <i @click="switchTheme('dark')" class="bi bi-circle-fill text-dark"></i>
        <i @click="switchTheme('default')" class="bi bi-bootstrap-reboot text-dark"></i>
  </div>
    </div>
  <router-view/>
</template>

<script>
export default {
  data:function(){
    return{
     
    }
  },
  methods:{
    cssModify(cssVar,change){
        document.documentElement.style.setProperty(cssVar, change)
    },

    switchTheme(color){
      switch (color){
        case ('default'):
            this.cssModify("--letterHov", '#7e7cec')
            this.cssModify("--letterBg1", '#ef7b79')
            this.cssModify("--letterBg2", '#edef79')
            this.cssModify("--letterBg3", '#79edef')
            this.cssModify("--letterBorder", '#9cdfcb')
            this.cssModify("--text", 'rgb(8, 5, 20)')
            this.cssModify("--isUserReadyBg","#5b13fff2")
          break
        case ('blue'):
            this.cssModify("--letterHov", '#58e8ff')
            this.cssModify("--letterBg1", '#84aaff')
            this.cssModify("--letterBg2", '#6493fe')
            this.cssModify("--letterBg3", '#3270fd')
            this.cssModify("--letterBorder", '#3270fd')
            this.cssModify("--text", '#ffffff')
            this.cssModify("--isUserReadyBg","#5b13fff2")
          break

        case ('red'):
            this.cssModify("--letterHov", '#ff953b')
            this.cssModify("--letterBg1", '#f84444')
            this.cssModify("--letterBg2", '#ff0018')
            this.cssModify("--letterBg3", '#ff162c')
            this.cssModify("--letterBorder", '#ffb94f')
            this.cssModify("--text", '#ffffff')
            this.cssModify("--isUserReadyBg","#f23d3df2")

          break
        case ('dark'):
            this.cssModify("--letterHov", '#949494')
            this.cssModify("--letterBg1", '#000')
            this.cssModify("--letterBg2", '#000')
            this.cssModify("--letterBg3", '#000')
            this.cssModify("--letterBorder", '#545454')
            this.cssModify("--text", '#ffffff')
            this.cssModify("--isUserReadyBg","#0e0e0ef2")
          break
      }
    }
  },
}
</script>