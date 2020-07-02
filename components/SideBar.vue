<template>
	<div>
		<div :class="{'openOverlay': sidebar}" class="overlay" @click="toggleSidebar" />
		<div :class="{'openSidebar': sidebar}" class="sidebar fixed top-0 h-full z-50 bg-white">
			<ul>
				<li>
					Home
				</li>
				<li>
					menu
				</li>
				<li>
					menu
				</li>
				<li>
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
		toggleSidebar() {
			this.sidebar = !this.sidebar;
		}
	}
};
</script>

<style scoped>
	.sidebar {
		transition: left .3s;
		left: -15em;
	}

	.openOverlay {
		display: block!important;
	}

	.openSidebar {
		left: 0!important;
	}

	li {
		@apply px-20 py-2 text-left;
	}

	.overlay {
		@apply fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50 hidden z-40;
	}

	@media (min-width: 768px) {
		.sidebar {
			left: 0em;
		}
	}
</style>
