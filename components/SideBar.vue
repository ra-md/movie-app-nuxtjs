<template>
	<div>
		<div :class="{'openOverlay': sidebar}" class="overlay" @click="toggleSidebar" />
		<div :class="{'openSidebar': sidebar}" class="sidebar">
			<ul>
				<li
					v-for="(list, index) in navList"
					:key="index"
					class="cursor-pointer text-left my-2"
					:class="[{'bg-gray-200': $route.path === list.route}, list.style || 'px-12 font-normal']"
					@click="closeSidebar"
				>
					<nuxt-link class="inline-block w-full py-2" :to="list.route">
						{{ list.name }}
					</nuxt-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			sidebar: false,
			navList: [
				{ name: 'Home', route: '/', style: 'px-8 font-medium' },
				{ name: 'Movies', route: '/movies', style: 'px-8 font-medium' },
				{ name: 'Top Rated', route: '/movies/top-rated' },
				{ name: 'Trending', route: '/movies/trending' },
				{ name: 'Popular', route: '/movies/popular' },
				{ name: 'Upcoming', route: '/movies/upcoming' },
				{ name: 'TV Series', route: '/movies/tv-series', style: 'px-8 font-medium' },
				{ name: 'Top Rated', route: '/tv-series/top-rated' },
				{ name: 'Trending', route: '/tv-series/trending' },
				{ name: 'Popular', route: '/tv-series/popular' },
				{ name: 'Upcoming', route: '/tv-series/upcoming' }
			]
		};
	},
	mounted() {
		axios.get('https://api.themoviedb.org/3/discover/movie?api_key=c73e688d3dc273ea17737c4fca5714b4&language=en-US&page=1&with_genres=28')
		.then((res) => {
			console.log(res);
		});
	},
	methods: {
		toggleSidebar() {
			this.sidebar = !this.sidebar;
		},
		closeSidebar() {
			this.sidebar = false;
		}
	}
};
</script>

<style scoped>
	.sidebar {
		@apply px-2 py-2 shadow-lg;
		height: 100%;
		position: fixed;
		top: 0;
		z-index: 50;
		background-color: white;
		transition: left .3s;
		left: -15em;
	}

	.openOverlay {
		display: block!important;
	}

	.openSidebar {
		left: 0!important;
	}

	.links {
		@apply px-16 py-2 my-2;
		text-align: left;
		cursor: pointer;
	}

	li {
		@apply rounded-md;
		transition: background-color 0.3s;
	}

	li:hover {
		@apply bg-gray-200;
	}

	.overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0,0,0,0.5);
		display: none;
		z-index: 40;
	}

	@media (min-width: 768px) {
		.sidebar {
			left: 0em;
		}
	}
</style>
