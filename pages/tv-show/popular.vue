<template>
	<ComponentWithApiCall media-type="tv" api-call-type="popular" />
</template>

<script>
import ComponentWithApiCall from '~/components/ComponentWithApiCall';

export default {
	name: 'PopularTVShow',
	components: {
		ComponentWithApiCall
	},
	head: {
		titleTemplate: 'Popular Tv Show'
	}
};
</script>
