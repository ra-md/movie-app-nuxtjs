<template>
	<div>
		<div :class="{'openOverlay': sidebar}" class="overlay" @click="closeSidebar" />
		<div :class="{'openSidebar': sidebar}" class="sidebar fixed left-0 top-0 h-full z-50 bg-white">
			<ul>
				<li class="px-20 py-2 text-left">
					menu
				</li>
				<li class="px-20 py-2 text-left">
					menu
				</li>
				<li class="px-20 py-2 text-left">
					menu
				</li>
				<li class="bg-red-500 px-20 py-2 text-left">
					menu
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			sidebar: false
		};
	},
	methods: {
		openSidebar() {
			this.sidebar = true;
		},
		closeSidebar() {
			this.sidebar = false;
		}
	}
};
</script>

<style>
	.openOverlay {
		display: block!important;
	}

	.openSidebar {
		left: 0!important;
	}

	.overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0,0,0,0.6);
		transition: display .5s;
		display: none;
		z-index: 49;
	}

	@media (max-width: 768px) {
		.sidebar {
			transition: left .5s;
			left: -15em;
		}
	}
</style>
