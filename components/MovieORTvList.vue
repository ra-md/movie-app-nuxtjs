<template>
	<div>
		<h1 v-if="noResults" class="text-center">
			No results
		</h1>
		<div v-else>
			<div class="grid grid-cols-2 px-3 gap-4 mb-4 lg:gap-6 md:grid-cols-3 xl:grid-cols-5">
				<div v-for="(item, index) in itemsLoading" :key="item.id">
					<Item :index="index+1" :item="item" :loading="loading" skeleton-loading-height="h-48" />
				</div>
			</div>
			<div v-if="page !== totalPages && !isTrending && !loading">
				<Observer @intersec="$emit('intersec')">
					<Loading height="h-32" />
				</Observer>
			</div>
		</div>
	</div>
</template>

<script>
import Item from './Item';
import Loading from '~/components/Loading';
import Observer from '~/components/Observer';

export default {
	name: 'MovieORTvList',
	components: {
		Item,
		Loading,
		Observer
	},
	props: {
		items: {
			type: Array,
			required: true
		},
		page: {
			type: Number,
			required: true
		},
		totalPages: {
			type: Number,
			required: true
		},
		isTrending: {
			type: Boolean,
			default: false
		},
		noResults: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		itemsLoading() {
			if (this.loading) {
				return [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
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
