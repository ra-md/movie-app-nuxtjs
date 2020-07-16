<template>
	<div>
		<header class="md:hidden shadow-md bg-blue-400 fixed top-0 left-0 right-0 py-2 px-3 z-30">
			<div class="container mx-auto flex justify-between">
				<button @click="openSidebar">
					<font-awesome-icon class="text-md" icon="bars" />
				</button>
				<nuxt-link to="/">
					<h1 class="font-bold">
						Movie App
					</h1>
				</nuxt-link>
				<button @click="toggleSearchBar">
					<font-awesome-icon class="text-md" icon="search" />
				</button>
			</div>
			<transition name="transition">
				<SearchBar
					v-if="search"
					class="absolute left-0 top-0"
					@close-search-bar="toggleSearchBar"
					@click="toggleSearchBar"
				/>
			</transition>
		</header>
		<SideBar ref="sidebar" />
	</div>
</template>

<script>
import SideBar from './SideBar';
import SearchBar from './SearchBar';

export default {
	name: 'AppHeader',
	components: {
		SideBar,
		SearchBar
	},
	data() {
		return {
			search: false
		};
	},
	methods: {
		openSidebar() {
			this.$refs.sidebar.openSidebar();
		},
		toggleSearchBar() {
			this.search = !this.search;
		}
	}
};
</script>

<style>
.transition-enter-active, .transition-leave-active {
  transition: transform .3s;
}
.transition-enter, .transition-leave-to {
	transform: translateY(-3em);
}
</style>
