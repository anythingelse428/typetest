<template>
<div class="timer">
  {{timePretty}} <span><b> секунд</b></span> <br>
</div>
  <div class="home" @click="ready=1">
   <div v-if="lang=='RU'" class="textContainer d-flex border ">
     <div v-if="!ready" class="isUserReady text"> <p class="text-light">Жми на меня, когда будешь готов! </p></div>
     <div id="text" class=""><span :id="index" v-for="(letter,index) in textForTypeRU[0]" :key="textForTypeRU[0][letter]"> 
              {{letter}}
</span></div>
   </div>

  <div v-if="lang=='EN'" class="textContainer d-flex border ">
     <div v-if="!ready" class="isUserReady text"> <p class="text-light">Жми на меня, когда будешь готов! </p></div>
     <div id="text" class=""><span :id="index" v-for="(letter,index) in textForTypeEN[0]" :key="textForTypeEN[0][letter]"> 
              {{letter}}
</span></div>
   </div>
   <div class="typing ">
       
  <textarea @input="test()" @keypress.once="timerStart()"  v-model="UserInput" class="form-control border-dark" id="floatingTextarea"></textarea>

   </div>
 

<KeyBoard :UserInput="UserInput"/>
  </div>

</template>

<script>

// import {Howl} from 'howler';
import KeyBoard from '../components/KeyBoard.vue'
export default {
  name: 'Home',
components:{
  KeyBoard
},
  data:function(){
    return{
      lang:'RU',
      time:0,
      timePretty:'0.00',
       textForTypeEN:["Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quae inventore, nam, impedit ad veritatis neque ex atque perspiciatis quo, dicta cupiditate! Odit perferendis libero esse et accusantium, commodi vero?"],
       textForTypeRU:["Таким образом начало повседневной работы по формированию позиции играет важную роль в формировании соответствующий условий активизации"],
       ready:0,
       UserInput:'',
    }
  },
 
 
  methods:{
    change (val) {
      console.log('change', val)
    },
     
    test(){
      function replaceAll(string, search, replace) {
        return string.toLowerCase().split(search.toLowerCase()).join(replace); 
      }
      function tagSelected ($el, search, selectedClass, replaceTag = 'span') {
        const content = $el.textContent

          $el.innerHTML = replaceAll(content, search, `<${replaceTag} class="${selectedClass}">${search}</${replaceTag}>`)

      }
        let $tag = document.getElementById(this.UserInput.length-1)

    if(this.textForTypeRU[0][this.UserInput.length-1].toLowerCase()==this.UserInput[this.UserInput.length-1].toLowerCase()){
            tagSelected($tag, document.querySelector('#text').textContent[this.UserInput.length-1], 'text-primary', 'span')
        }
    else if(this.textForTypeEN[0][this.UserInput.length-1].toLowerCase()==this.UserInput[this.UserInput.length-1].toLowerCase()){
      tagSelected($tag, document.querySelector('#text').textContent[this.UserInput.length-1], 'text-primary', 'span')
    }
    else{
        tagSelected($tag, document.querySelector('#text').textContent[this.UserInput.length-1], 'text-danger', 'span')
        }
        
    },
  timerStart(){
    let starttime = Date.now()
    setInterval(() => {
       if(this.UserInput.length>0&(this.textForTypeRU[0].toLowerCase()!=this.UserInput.toLowerCase()||this.textForTypeEN[0].toLowerCase()!=this.UserInput.toLowerCase())){
          this.time = Date.now()-starttime
          this.timePretty = `${Math.floor((Date.now()-starttime)/1000)}`+'.'+ `${Math.floor((Date.now()-starttime)%1000)}`
        }
      if (this.UserInput==''){
              this.timePretty="0.00"
              this.time= Date.now()
              starttime=Date.now()
              clearInterval()
              return
        }
      }, 1)
      
         
  },
  
  },

  beforeUpdate: function(){

      if(this.textForTypeRU[0].toLowerCase()==this.UserInput.toLowerCase()||this.textForTypeEN[0].toLowerCase()==this.UserInput.toLowerCase()){
          switch (this.lang){
              case 'RU':
              alert('Тест завершен! Ваша скорость печати = '+this.textForTypeRU[0].length/(this.time/60000)+' знаков в минуту!')
              break
              case 'EN':
              alert('Тест завершен! Ваша скорость печати = '+this.textForTypeEN[0].length/(this.time/60000)+' знаков в минуту!')
              break
            }
        return this.UserInput=''
}
  }
}
</script>
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");
@import url('https://fonts.googleapis.com/css2?family=Tourney:ital,wght@0,400;1,100;1,800;1,900&display=swap');
   textarea{
     width: 100%;
     height: 100%;
     resize: none;
   }
  .timer{
    font-weight: 900;
    font-family: 'Tourney', cursive;
    font-size: 2em;
    font-style: italic;
  }
      .timer span{
        font-size: .8em;
        font-family: 'Comfortaa', cursive;
        text-transform: uppercase;
      }
 
 
  .home{
    font-family: 'Comfortaa', cursive;
    width: 75vw;
    height: 50vh;
    color: aliceblue;
    display: flex;
    flex-direction:column;
  }
  .textContainer{
    width: 100%;
    position: relative;
    z-index: 1;
    font-size: 1.666em;
    color: black;
  }
  .isUserReady {
      font-size: 1.777em;
      height: 100%;
      width: 100%;
      z-index: 10;
      position: absolute;
      background: rgba(64, 6, 199, 0.95);
      display: flex;
      justify-content: space-around;
      align-content: space-around;
      flex-wrap: wrap;
      align-items: center;
  }
  .typing {
      display: flex;
      position: relative;

      width: 100%;
      height: 10vh;
  }
  .input{
    width: 100%;
    height: 100%;
  }

   @media screen  and (max-width: 600px){
    .isUserReady {
    font-size: 1em;
    height: 100%;
    width: 100%;
    z-index: 10;
    position: absolute;
    background: rgba(64, 6, 199, 0.95);
    display: flex;
    justify-content: space-around;
    align-content: space-around;
    flex-wrap: wrap;
    align-items: center;
}
     .textContainer {
    width: 100%;
    position: relative;
    z-index: 1;
    font-size: 0.777em;
    color: black;
}
 }
 @media screen  and (max-width: 768px) and (min-width: 600px){
     .isUserReady {
    font-size: 1.337em;
    height: 100%;
    width: 100%;
    z-index: 10;
    position: absolute;
    background: rgba(64, 6, 199, 0.95);
    display: flex;
    justify-content: space-around;
    align-content: space-around;
    flex-wrap: wrap;
    align-items: center;
}
 }
</style>>

  

