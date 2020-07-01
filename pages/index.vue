<template>
  <div>
		<div class="my-4 mx-2 p-4 bg-white rounded-md shadow-sm">
			<!-- <h3>Popular movies</h3> -->
			<HorizontalList />
		</div>
  </div>
</template>

<script>
// import api from '~/api';
import HorizontalList from '~/components/Horizontal-list.vue';

export default {
	components: {
		HorizontalList
	}
	// mounted() {
	// 	api.movies.popular(1)
	// 	.then((res) => {
	// 		console.log(res);
	// 	});
	// }
};
</script>

<style>
</style>
