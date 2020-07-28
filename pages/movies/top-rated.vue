<template>
	<PageWithApiCall media-type="movie" api-call-type="topRated" />
</template>

<script>
import PageWithApiCall from '~/components/PageWithApiCall';

export default {
	name: 'TopRatedMovies',
	components: {
		PageWithApiCall
	}
};
</script>
