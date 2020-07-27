<template>
	<div class="mt-4 mx-4 md:my-4">
		<div
			class="grid grid-cols-1 gap-3 lg:gap-4"
			:class="[items.length === 1 ? 'lg:grid-cols-1' : 'lg:grid-cols-2']"
		>
			<div v-for="item in itemsLoading" :key="item.id">
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
	},
	computed: {
		itemsLoading() {
			if (this.items.length === 0) {
				return [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
			} else {
				return this.items;
			}
		}
	}
};
</script>
