<template>
	<div :class="`${height}`" class="justify-center flex items-center text-6xl">
		<font-awesome-icon class="loading" icon="circle-notch" />
	</div>
</template>

<script>
export default {
	name: 'Loading',
	props: {
		height: {
			type: String,
			default() {
				return 'h-screen';
			}
		}
	}
};
</script>

<style>
	.loading {
		@apply text-primary;
		animation: loading-keyframes 0.9s linear infinite;
	}

	@keyframes loading-keyframes {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
