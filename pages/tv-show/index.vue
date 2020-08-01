<template>
	<Discover media-type="tv" />
</template>

<script>
import Discover from '~/components/Discover';

export default {
	name: 'DiscoverMovie',
	components: {
		Discover
	},
	head: {
		titleTemplate: 'Discover Tv Show'
	}
};
</script>
