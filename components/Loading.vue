<template>
	<div class="h-screen justify-center flex items-center text-6xl">
		<font-awesome-icon class="loading" icon="circle-notch" />
	</div>
</template>

<style>
	.loading {
		@apply text-blue-500;
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
