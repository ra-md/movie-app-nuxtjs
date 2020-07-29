<template>
  <div>
    <AppHeader />
    <div class="md:pl-56 mt-12 md:mt-0 container mx-auto">
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

.btn {
  @apply font-bold py-2 px-4 rounded;
}

.white-space-shadow::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 10%;
  background: linear-gradient(90deg, transparent, white);
}

@media (max-width: 768px) {
  .vue-horizontal-list .vhl-container {
    margin-right: 0!important;
    margin-left: 0!important;
  }
}
</style>
