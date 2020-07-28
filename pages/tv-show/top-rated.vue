<template>
	<PageWithApiCall media-type="tv" api-call-type="topRated" />
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
