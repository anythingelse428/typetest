<template>
  <div v-if="showHello" class="hello"> 
    <i @click="close()" class="bi bi-x-lg"></i>
    <h1>Привет! Хочешь узнать свою скорость печати?</h1>
    
    <ul>
      <li>Всё очень просто, если не хочешь знать всех фичей - закрывай это окно и приступай!</li>
      <li>Меняй темы оформления кнопками сверху справа</li>
      <li>Кастомизируй оформление кнопками над виртуальной клавиатурой</li>
      <li>Тест закончится автоматически сразу после точного ввода текста</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      showHello: false,
    }
  },
  mounted () {
    // показываем только однажды
    const isShowHello = localStorage.getItem('showHello') || 'false'
    if (isShowHello === 'false') this.showHello = true
  },
  methods: {
    close () {
      localStorage.setItem('showHello', 'true')
      this.showHello = false
    }
  }
}
</script>

<style scoped>
.hello {
  font-size:1.5em ;
  position: absolute;
  z-index: 100500;
  top:10vh;
  color: aliceblue;
  background-color: #112871f7
}
i {
  cursor: pointer;
  font-size: 2em;
  color: aliceblue!important;;
  margin-left: 95%;
}
ul {
  margin-top: 2em;
  text-align: left;
}
</style>
