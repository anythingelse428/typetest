<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
  </div>
  <router-view/>
</template>

<style>
:root{
  --letterHov:#7e7cec;
  --letterBg1:#ef7b79;
  --letterBg2:#edef79;
  --letterBg3:#79edef;
}
#app {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
