<template>
	<div>
		<header class="shadow-md bg-primary text-white fixed top-0 left-0 right-0 py-2 px-3 z-30 md:hidden">
			<div class="container mx-auto flex justify-between">
				<button aria-label="bars" @click="openSidebar">
					<font-awesome-icon class="text-md" icon="bars" />
				</button>
				<nuxt-link to="/">
					<h1 :class="{'text-left': $route.path === '/search'}" class="font-bold">
						Watchlist
					</h1>
				</nuxt-link>
				<button aria-label="search" @click="openSearchBar">
					<font-awesome-icon class="text-md" icon="search" />
				</button>
			</div>
			<SearchBar
				v-if="search"
				class="absolute left-0 top-0 h-full w-full"
				@close-search-bar="closeSearchBar"
			/>
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
		openSearchBar() {
			this.search = true;
			document.body.style.overflow = 'hidden';
		},
		closeSearchBar() {
			this.search = false;
			document.body.style.overflow = 'auto';
		}
	}
};
</script>
