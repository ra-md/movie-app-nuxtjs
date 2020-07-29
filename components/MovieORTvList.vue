<template>
	<div>
		<div class="grid grid-cols-2 px-3 gap-4 mt-16 md:mt-8 lg:gap-6 md:grid-cols-3 xl:grid-cols-5">
			<div
				v-for="(item, index) in itemsLoading"
				:key="item.id"
				class="overflow-hidden rounded-md shadow-md bg-white transition-transform duration-300 ease-in-out transform hover:scale-105"
			>
				<MovieORTvItem :index="index+1" :item="item" />
			</div>
		</div>
		<div v-if="items.length !== 0 && page !== totalPages">
			<Loading height="h-32" />
			<Observer @intersec="$emit('intersec')" />
		</div>
	</div>
</template>

<script>
import MovieORTvItem from './MovieORTvItem';
import Loading from '~/components/Loading';
import Observer from '~/components/Observer';

export default {
	name: 'MovieORTvList',
	components: {
		MovieORTvItem,
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
		}
	},
	computed: {
		itemsLoading() {
			if (this.items.length === 0) {
				return [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
			} else {
				return this.items;
			}
		}
	}
};
</script>
