<template>
	<div>
		<slot />
	</div>
</template>

<script>
export default {
	name: 'Observer',
	data() {
		return {
			observer: null
		};
	},
	mounted() {
		this.observer = new IntersectionObserver(([entry]) => {
			if (entry && entry.isIntersecting) {
				this.$emit('intersec');
			}
		});

		this.observer.observe(this.$el);
	},
	destroyed() {
		this.observer.disconnect();
	}
};
</script>
