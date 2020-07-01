<template>
  <div>
    <AppHeader />
    <div class="padding-left mt-16 md:mt-0 container mx-auto md:bg-blue-600">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader';

export default {
  components: {
    AppHeader
  }
};
</script>

<style>
html {
  font-family: sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .padding-left {
    padding-left: 12.5em;
  }
}
</style>
