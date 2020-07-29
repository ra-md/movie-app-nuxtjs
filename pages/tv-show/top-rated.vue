<template>
	<ComponentWithApiCall media-type="tv" api-call-type="topRated" />
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
