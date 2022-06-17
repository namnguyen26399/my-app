<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HtmlPreview></HtmlPreview>
  </div>
</template>

<script>
import HtmlPreview from "./components/html-preview/HtmlPreview.vue";
export default {
  name: "app",
  components: {
    HtmlPreview
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
