<template>
	<div class="mt-16 mx-4 grid grid-cols-1 gap-3 md:my-4 lg:gap-4 lg:grid-cols-2">
		<div v-for="item in items" :key="item.id">
			<SearchItem :item="item" />
		</div>
	</div>
</template>

<script>
import SearchItem from './SearchItem';

export default {
	name: 'SearchList',
	components: {
		SearchItem
	},
	props: {
		items: {
			type: Array,
			required: true
		}
	}
};
</script>
