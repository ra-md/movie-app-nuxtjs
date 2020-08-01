<template>
	<div class="mt-4 mx-4 md:my-4">
		<h1 v-if="noResults">
			No results
		</h1>
		<div v-else>
			<div
				class="grid grid-cols-2 gap-3 lg:gap-4"
				:class="[items.length === 1 ? 'lg:grid-cols-1' : 'lg:grid-cols-5']"
			>
				<div v-for="item in itemsLoading" :key="item.id">
					<Item :item="item" :loading="loading" skeleton-loading-height="h-48" skeleton-loading-width="w-64" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Item from './Item';

export default {
	name: 'SearchList',
	components: {
		Item
	},
	props: {
		items: {
			type: Array,
			required: true
		},
		noResults: {
			type: Boolean,
			required: true
		}
	},
	computed: {
		itemsLoading() {
			if (this.loading) {
				return [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
			} else {
				return this.items;
			}
		},
		loading() {
			if (this.items.length === 0) {
				return true;
			} else {
				return false;
			}
		}
	}
};
</script>
