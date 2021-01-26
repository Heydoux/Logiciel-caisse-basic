<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/slpv-logo.jpg" />
    <HelloWorld msg="Sous les paves le vintage Caisse" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
img {
  max-height: 40vh;
}
</style>
