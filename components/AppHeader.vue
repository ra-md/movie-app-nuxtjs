<template>
	<div>
		<header class="md:hidden shadow-md bg-blue-400 fixed top-0 left-0 right-0 p-3 z-30">
			<div class="container mx-auto flex justify-between">
				<button @click="openSidebar">
					open
				</button>
				<h1 class="font-bold">
					Movie App
				</h1>
				<button>
					search
				</button>
			</div>
		</header>
		<SideBar ref="sidebar" />
	</div>
</template>

<script>
import SideBar from './SideBar';

export default {
	name: 'AppHeader',
	components: {
		SideBar
	},
	data() {
		return {
		};
	},
	methods: {
		openSidebar() {
			this.$refs.sidebar.toggleSidebar();
		}
	}
};
</script>
