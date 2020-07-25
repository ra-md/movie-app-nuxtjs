<template>
	<button
		class="w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
	>
		<slot />
	</button>
</template>

<script>
export default {
	name: 'DropdownItem'
};
</script>
