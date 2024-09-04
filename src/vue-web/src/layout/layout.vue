<template>
  <div>
    <HeaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style>
/* 移除全局边距和内边距 */
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Arial', sans-serif; /* 你可以根据需要调整字体 */
}

header-component {
  flex: 0 0 80px; /* 头部组件的高度 */
}

router-view {
  flex: 1; /* 主组件的高度 */
}

footer-component {
  flex: 0 0 80px; /* 底部组件的高度 */
}
</style>