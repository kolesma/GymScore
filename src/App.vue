<template>
  <RouterView></RouterView>
</template>
<style>
h1{
  color: red;
}

</style>
<script>
export default{
  name:"App",
  data: function (){
    return {count:0}
  },
  methods: {
    add: function (){
      this.count++
    }
  }
}
</script>