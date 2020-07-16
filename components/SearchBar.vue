<template>
	<div class="flex h-full w-full bg-white md:h-10 md:relative">
		<button class="md:hidden px-3" @click="$emit('close-search-bar')">
			<font-awesome-icon class="text-md" icon="times" />
		</button>
		<input
			v-model="search"
			class="border-gray-200 w-full md:pl-2 md:pr-8 md:border-2 md:rounded-md md:absolute md:h-full"
			type="input"
			placeholder="Search..."
		>
		<button class="px-3 md:absolute md:h-full md:right-0">
			<font-awesome-icon class="text-md" icon="search" />
		</button>
	</div>
</template>

<script>
export default {
	name: 'SearchBar',
	data() {
		return {
			search: ''
		};
	}
};
</script>
