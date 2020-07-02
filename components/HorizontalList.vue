<template>
	<client-only>
		<vue-horizontal-list
			:items="items"
			:options="{
				responsive: [
					{end: 576, size: 3},
					{start: 576, end: 992, size: 5},
					{size: 7}
				]
			}"
		>
			<template v-slot:default="{ item }">
				<div class="bg-white rounded-md shadow-md cursor-pointer transform transition-scale duration-200 hover:scale-105 ease-in-out">
					<img class="rounded-t-md aspect" :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`">
					<p class="whitespace-no-wrap overflow-hidden">
						{{ item.title }}
					</p>
				</div>
			</template>
		</vue-horizontal-list>
	</client-only>
</template>

<script>
export default {
	name: 'HorizontalList',
	props: {
		items: {
			type: Array,
			required: true
		}
	}
};
</script>

<style>
	.vue-horizontal-list .vhl-container {
		margin-right: 0!important;
		margin-left: 0!important;
	}
</style>
