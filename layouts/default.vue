<template>
  <div>
    <AppHeader />
    <div class="padding-left mt-16 md:mt-0 container mx-auto">
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
  box-sizing: border-box;
}

body {
  max-width: 100vw;
  background-color: #f7fafc;
}

h1 {
  @apply text-2xl;
}

h2 {
  @apply text-xl;
}

h3 {
  @apply text-lg;
}

@media (min-width: 768px) {
  .padding-left {
    padding-left: 12.5em;
  }
}
</style>
