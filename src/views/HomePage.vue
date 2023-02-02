<template>
  <div class="m-container">
    <div class="navigation-drawer-wrapper">
      <navigation-drawer/>
    </div>
    <div class="m-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavigationDrawer from "../components/NavigationDrawer.vue";
</script>

<style scoped>

.m-container{
  display: flex;
  height: 100%;
  width: 100%;
}

.m-content{
  display: flex;
  flex-direction: column;
  padding: 64px;
  width: 100%;
}
.navigation-drawer-wrapper{
  display: flex;
  height: 100%;
  background-color: #222;
  width: 160px;
  max-width: 160px;
}
</style>
