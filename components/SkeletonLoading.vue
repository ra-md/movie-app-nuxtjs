<template>
	<div :class="`${height} ${width} ${rounded} relative overflow-hidden`">
		<div class="skeleton-bg" />
		<div class="skeleton" />
	</div>
</template>

<script>
export default {
	name: 'SkeletonLoading',
	props: {
		height: {
			type: String,
			required: true
		},
		width: {
			type: String,
			default() {
				return 'w-full';
			}
		},
		rounded: {
			type: String,
			default() {
				return 'none';
			}
		}
	}
};
</script>

<style scopde>
	.skeleton-bg {
		height: inherit;
    width: inherit;
    background-color: rgb(238, 238, 238);
	}

	.skeleton {
		height: inherit;
    width: inherit;
    position: absolute;
    top: 0;
    transform: translateX(-100%);
		background: linear-gradient(90deg, transparent, #f7f7f7, transparent);
		animation: skeleton-animation 1s infinite;
	}

	@keyframes skeleton-animation {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(100%);
		}
	}
</style>
