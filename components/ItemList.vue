<template>
	<div>
		<div class="grid grid-cols-2 px-2 gap-4 mt-16 md:mt-8 lg:grid-cols-5 lg:gap-6">
			<div
				v-for="(item, index) in itemsLoading"
				:key="item.id"
				class="overflow-hidden rounded-md shadow-md bg-white transition-transform duration-300 ease-in-out transform hover:scale-105"
			>
				<Item :index="index+1" :item="item" />
			</div>
		</div>
		<div v-if="items.length !== 0">
			<Observer @intersec="$emit('intersec')" />
			<Loading height="h-32" />
		</div>
	</div>
</template>

<script>
import Item from './Item';
import Loading from '~/components/Loading';
import Observer from '~/components/Observer';

export default {
	name: 'ItemList',
	components: {
		Item,
		Loading,
		Observer
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
				return [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
			} else {
				return this.items;
			}
		}
	}
};
</script>
