<template>
	<client-only>
		<vue-carousel class="my-4" :data="data" indicator-trigger="hover" />
	</client-only>
</template>

<script>
export default {
  data() {
    return {
      data: [
        '<div class="example-slide">Slide 1</div>',
        '<div class="example-slide">Slide 2</div>',
        '<div class="example-slide">Slide 3</div>'
      ]
    };
  }
};
</script>

<style>
  .example-slide {
    @apply rounded-md;
    align-items: center;
    background-color: #666;
    color: #999;
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    min-height: 15rem;
  }
</style>
