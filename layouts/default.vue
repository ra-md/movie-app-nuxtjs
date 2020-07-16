<template>
  <div>
    <AppHeader />
    <div class="padding-left mt-12 md:mt-0 container mx-auto">
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
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  box-sizing: border-box;
}

body {
  max-width: 100vw;
  background-color: #f7fafc;
}

h1 {
  @apply text-2xl font-semibold;
}

h2 {
  @apply text-xl font-semibold;
}

h3 {
  @apply text-lg font-semibold;
}

@media (min-width: 768px) {
  .padding-left {
    padding-left: 11.5em;
  }
}

@media (max-width: 768px) {
  .vue-horizontal-list .vhl-container {
    margin-right: 0!important;
    margin-left: 0!important;
  }
}
</style>
