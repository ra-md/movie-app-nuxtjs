<template>
	<div>
		<header class="md:hidden shadow-md bg-blue-400 fixed top-0 left-0 right-0 py-2 px-3 z-30">
			<div class="container mx-auto flex justify-between">
				<button @click="openSidebar">
					<font-awesome-icon class="text-md" icon="bars" />
				</button>
				<nuxt-link to="/">
					<h1 :class="{'text-left': $route.path === '/search'}" class="font-bold">
						Movie App
					</h1>
				</nuxt-link>
				<button @click="openSearchBar">
					<font-awesome-icon class="text-md" icon="search" />
				</button>
			</div>
			<Search
				v-if="searchBar"
				class="absolute left-0 top-0 h-full w-full"
				@close-search-bar="closeSearchBar"
			/>
		</header>
		<SideBar ref="sidebar" />
	</div>
</template>

<script>
import SideBar from './SideBar';
import Search from './Search';

export default {
	name: 'AppHeader',
	components: {
		SideBar,
		Search
	},
	data() {
		return {
			searchBar: false
		};
	},
	methods: {
		openSidebar() {
			this.$refs.sidebar.openSidebar();
		},
		openSearchBar() {
			this.searchBar = true;
			document.body.style.overflow = 'hidden';
		},
		closeSearchBar() {
			this.searchBar = false;
			document.body.style.overflow = 'auto';
		}
	}
};
</script>
