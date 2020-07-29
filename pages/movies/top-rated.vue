<template>
	<ComponentWithApiCall media-type="movie" api-call-type="topRated" />
</template>

<script>
import ComponentWithApiCall from '~/components/ComponentWithApiCall';

export default {
	name: 'TopRatedMovies',
	components: {
		ComponentWithApiCall
	}
};
</script>
