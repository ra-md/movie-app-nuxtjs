<template>
	<div>
		<h3>{{ item.title }}</h3>
	</div>
</template>

<script>
export default {
	name: 'SearchItem',
	props: {
		item: {
			type: Object,
			required: true
		}
	}
};
</script>
