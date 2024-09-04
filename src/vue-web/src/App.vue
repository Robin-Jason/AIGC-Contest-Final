<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
</script>

<style>
/* 确保app组件充满整个视口 */
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>