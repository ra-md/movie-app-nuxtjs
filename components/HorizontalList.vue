<template>
	<client-only>
		<vue-horizontal-list :items="itemsLoading" :options="options">
			<template v-slot:default="{ item }">
				<Item :item="item" :loading="loading" />
			</template>
		</vue-horizontal-list>
	</client-only>
</template>

<script>
import Item from './Item';
import convertToSlug from '~/utils/convertToSlug';
import generateArrayOfObjects from '~/utils/generateArrayOfObjects';

export default {
	name: 'HorizontalList',
	components: {
		Item
	},
	props: {
		items: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			options: {
				list: {
					padding: 3
				},
				responsive: [
					{ end: 576, size: 3 },
					{ start: 576, end: 1024, size: 5 },
					{ size: 7 }
				]
			}
		};
	},
	computed: {
		itemsLoading() {
			if (this.loading) {
				return generateArrayOfObjects(8);
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
	},
	methods: {
		slug(item) {
			if (item.id) {
				const slug = convertToSlug(item.title || item.name, item.id);
				return slug;
			}
		}
	}
};
</script>
