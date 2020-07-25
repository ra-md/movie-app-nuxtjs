<template>
	<div>
		<button
			class="inline-flex h-full items-center capitalize font-medium text-sm hover:text-primary focus:outline-none"
			@click="toggleDropdown"
		>
			{{ mediaType }}
			<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
			</svg>
		</button>
		<div v-show="dropdown" class="bg-white shadow-md rounded-md right-0 m-2 absolute">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'Dropdown',
	props: {
		mediaType: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			dropdown: false
		};
	},
	methods: {
		toggleDropdown() {
			this.dropdown = !this.dropdown;
		}
	}
};
</script>
