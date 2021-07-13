<template>
<div class="timer">
  {{timePretty}} <span><b> секунд</b></span> <br>
</div>
  <div class="home" @click="ready=1">
   <div v-if="lang=='RU'" class="textContainer d-flex border">
     <div v-if="!ready" class="isUserReady text"> <p>Жми на меня, когда будешь готов! </p></div>
     <div id="text" class="text-dark"><span :id="index" v-for="(letter,index) in textForTypeRU[0]" :key="textForTypeRU[0][letter]"> 
              {{letter}}
</span></div>
   </div>

  <div v-if="lang=='EN'" class="textContainer d-flex border">
     <div v-if="!ready" class="isUserReady text"> <p>Жми на меня, когда будешь готов! </p></div>
     <div id="text" class="text-dark"><span :id="index" v-for="(letter,index) in textForTypeEN[0]" :key="textForTypeEN[0][letter]"> 
              {{letter}}
</span></div>
   </div>
   <div class="typing ">
       
  <textarea @input="test(),changeButtonColor()" @keypress.once="timerStart()"  v-model="UserInput" class="form-control border-dark" id="floatingTextarea"></textarea>

   </div>
 
<div class="qwerty" v-if="lang=='RU'">
  
<div class="line instrumental">

    <div class="dropdown rounded-circle chooseSnd">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      <img src="https://icons.iconarchive.com/icons/custom-icon-design/mono-general-4/256/sound-icon.png"  width="40" alt="" srcset="">
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li><a class="dropdown-item" href="#" @click="choosnSound='Iphone'">Iphone sound</a></li>
      <li><a class="dropdown-item" href="#" @click="choosnSound='Mech'">Mech sound</a></li>
      <li><a class="dropdown-item" href="#" @click="choosnSound=''">No sound</a></li>
      <li><input v-model="choosnSoundVol" type="range" id="volume" name="volume"
         min="0" max="1" step=".01"></li>
    </ul>
  </div>

    <div class="dropdown rounded-circle chooseClrBg">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      color
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li class="dropdown-item"><input type="color" v-model="BGcolor1"/> bgcolor line 1</li>
    <li class="dropdown-item"><input type="color" v-model="BGcolor2"/> bgcolor line 1</li>
    <li class="dropdown-item"><input type="color" v-model="BGcolor3"/> bgcolor line 1</li>

    </ul>
  </div>
</div>
   <div class="line" id="1">
     <span :style="{ backgroundColor: BGcolor1}" @mouseover="changeButtonColor()" class="text-dark letter border rounded-circle" :id="ruButtons1" v-for="ruButtons1 in QWERTYru1" :key="ruButtons1.QWERTYru1">
       {{ruButtons1}}
       </span>
       </div>
       <br>
   <div class="line" id="2">
     <span :style="{ backgroundColor: BGcolor2}" @mouseover="changeButtonColor()" class="text-dark letter border rounded-circle" :id="ruButtons2" v-for="ruButtons2 in QWERTYru2" :key="ruButtons2.QWERTYru2">
       {{ruButtons2}}
       </span>
       </div>
       <br>
   <div class="line" id="3">
     <img @click="switchLang()" src="../assets/Language.png" alt="" srcset="" width="60" class="langBTN">

     <span :style="{ backgroundColor: BGcolor3}" @mouseover="changeButtonColor()" class="text-dark letter border rounded-circle" :id="ruButtons3" v-for="ruButtons3 in QWERTYru3" :key="ruButtons3.QWERTYru3">
       {{ruButtons3}}
       </span>
       </div>
 </div>


 <div class="qwerty" v-if="lang=='EN'">
   <div class="line" id="1">
     <span @mouseover="changeButtonColor()" class="text-dark letter border rounded-circle" :id="enButtons1" v-for="enButtons1 in QWERTYen1" :key="enButtons1.QWERTYen1">
       {{enButtons1}}
       </span>
       </div>
       <br>
   <div class="line" id="2">
     <span @mouseover="changeButtonColor()" class="text-dark letter border rounded-circle" :id="enButtons2" v-for="enButtons2 in QWERTYen2" :key="enButtons2.QWERTYen2">
       {{enButtons2}}
       </span>
       </div>
       <br>
   <div class="line" id="3">
     <img @click="switchLang()" src="../assets/Language.png" alt="" srcset="" width="60" class="langBTN">

     <span @mouseover="changeButtonColor()" class="text-dark letter border rounded-circle" :id="enButtons3" v-for="enButtons3 in QWERTYen3" :key="enButtons3.QWERTYen3">
       {{enButtons3}}
       </span>
       </div>
 </div>
  </div>


</template>

<script>

import {Howl} from 'howler';

export default {
  name: 'Home',

  data:function(){
    return{
      BGcolor1:'rgb(255,255,255)',
      BGcolor2:'rgb(255,255,255)',
      BGcolor3:'rgb(255,255,255)',
      time:0,
      timePretty:'0.00',
      lang:'RU',
      choosnSound:'Iphone',
      choosnSoundVol:.7,
      QWERTYen1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],QWERTYen2:['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],QWERTYen3:['z', 'x', 'c', 'v', 'b', 'n', 'm'],
      QWERTYru1: ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'], QWERTYru2:['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж'], QWERTYru3:['э', 'я', 'ч', 'с','м','и','т','ь','б','ю'],
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
        const $tag = document.getElementById(`${this.UserInput.length-1}`)
      


    if(this.textForTypeRU[0][this.UserInput.length-1].toLowerCase()==this.UserInput[this.UserInput.length-1].toLowerCase()){
            tagSelected($tag, document.querySelector('#text').textContent[this.UserInput.length-1], 'blue', 'span')
        }
    else if(this.textForTypeEN[0][this.UserInput.length-1].toLowerCase()==this.UserInput[this.UserInput.length-1].toLowerCase()){
      tagSelected($tag, document.querySelector('#text').textContent[this.UserInput.length-1], 'blue', 'span')
    }
    else{
        tagSelected($tag, document.querySelector('#text').textContent[this.UserInput.length-1], 'red', 'span')
        }
        
    },

    changeButtonColor(){    
      let sound1 = new Howl({
        src: [require('../assets/1.mp3')],
        volume: this.choosnSoundVol,
      })
      let sound2 = new Howl({
        src: [require('../assets/2.mp3')],
        volume: this.choosnSoundVol,
      })
      let arrSound=[sound1,sound2]
      let MechSnd = new Howl({
        src: [require('../assets/click.mp3')],
        volume: this.choosnSoundVol,
      })
              // start shiting 4 iphone sound
      function getRandomInt(max) {
            return Math.floor(Math.random() * max)
               }
      function playing(){
            let a = getRandomInt(2)
            arrSound[a].play()
            return
        }
              // end shiting 4 iphone sound
            

      switch (this.choosnSound){
        case 'Iphone':{
            
            playing()
            break
        }
        case 'Mech':{
          MechSnd.play()
        break
        }
      }
      
// симпл мод: охуенно красивыо анимированные аки воллпапер жнжин фоны и простая кастомизируемая коавиатура 
// фоный можно крутить слайдером с желли эфектом
        
      let currentBTN = this.UserInput[this.UserInput.length-1]
          if (currentBTN==undefined||this.UserInput.length==0||document.getElementById(`${currentBTN.toLowerCase()}`)==null){
                return
          } 
      document.getElementById(`${currentBTN.toLowerCase()}`).style.cssText='background-color:#22abfe;top: 1px; left: 1px;position: relative;'
 
      setInterval(() => {
            document.getElementById(`${currentBTN}`).style.cssText='background-color:white;top: 0px; left: 0px;position: relative;'
          }, 300)
      
    },

    switchLang(){
      switch(this.lang){
        case 'RU':
          this.lang='EN'
          break
        default:
          this.lang='RU'
      }
      console.log(this.lang)
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
      
         
  }
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
<style>
   @import url('https://fonts.googleapis.com/css2?family=Tourney:ital,wght@0,400;1,100;1,800;1,900&display=swap');

   textarea{
     width: 100%;
     height: 100%;
     resize: none;
   }
   .instrumental{
     margin: 1em auto;
   }
   .chooseSnd{
     position: relative;
     right: 5vw;
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
  .qwerty {
    position: relative;
    display: flex;
    margin: 0 25vw;
    width: 50vw;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
}
.line {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}
  .letter {
    width: 1.5em;
    height: 1.5em;
    font-family: 'Roboto', sans-serif;
    font-size: 4rem;
    font-weight: 100;
    margin: 0 .5% .5% 0;
    line-height: 1.3em;
    text-align: center;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border: 1px solid #dee2e6;
}
      .letter:hover {
        position: relative;
        top: 1px;
        left: 1px;
        border-color: #e5e5e5;
        background-color: #1d7cb8;
        cursor: pointer;
        }

  .langBTN{
    cursor: pointer;
    margin-right: 1%;
  }
  .langBTN:hover{
    filter: contrast(10);
  }

  .blue{
    color: rgb(45, 6, 187);
  }
  .red{
    color: red;
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
    margin: 0 25%;
    font-size: 1.666em;
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
      margin: 1% 25%;
      width: 100%;
      height: 10vh;
  }
  .input{
    width: 100%;
    height: 100%;
  }
</style>
