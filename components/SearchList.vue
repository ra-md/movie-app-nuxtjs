<template>
	<div class="mt-4 mx-4 md:my-4">
		<div v-if="items.length === 0">
			<h1>No result</h1>
		</div>
		<div
			v-else
			class="grid grid-cols-1 gap-3 lg:gap-4"
			:class="[items.length === 1 ? 'lg:grid-cols-1' : 'lg:grid-cols-2']"
		>
			<div v-for="item in items" :key="item.id">
				<SearchItem :item="item" />
			</div>
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
