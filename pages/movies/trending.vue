<template>
	<ComponentWithApiCall media-type="movie" api-call-type="trending" />
</template>

<script>
import ComponentWithApiCall from '~/components/ComponentWithApiCall';

export default {
	name: 'TrendingMovies',
	components: {
		ComponentWithApiCall
	},
	head: {
		titleTemplate: 'Trending Movies'
	}
};
</script>
