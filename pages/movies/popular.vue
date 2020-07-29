<template>
	<ComponentWithApiCall media-type="movie" api-call-type="popular" />
</template>

<script>
import ComponentWithApiCall from '~/components/ComponentWithApiCall';

export default {
	name: 'PopularMovies',
	components: {
		ComponentWithApiCall
	},
	head: {
		titleTemplate: 'Popular Movies'
	}
};
</script>
