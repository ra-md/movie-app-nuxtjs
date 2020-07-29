<template>
	<ComponentWithApiCall media-type="tv" api-call-type="trending" />
</template>

<script>
import ComponentWithApiCall from '~/components/ComponentWithApiCall';

export default {
	name: 'TrendingTVShow',
	components: {
		ComponentWithApiCall
	},
	head: {
		titleTemplate: 'Trending Tv Show'
	}
};
</script>
