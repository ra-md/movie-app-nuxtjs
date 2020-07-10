<template>
	<div>
		<div
			:class="{'openOverlay': sidebar}"
			class="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 hidden z-40"
			@click="closeSidebar"
		/>
		<div :class="{'openSidebar': sidebar}" class="sidebar">
			<ul>
				<li
					v-for="(list, index) in navList"
					:key="index"
					@click="closeSidebar"
				>
					<nuxt-link
						class="links"
						:to="list.route"
						:class="[{'bg-gray-200': $route.path === list.route}, list.style || 'px-12 font-normal']"
					>
						{{ list.name }}
					</nuxt-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SideBar',
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
		// axios.get('https://api.themoviedb.org/3/discover/movie?api_key=c73e688d3dc273ea17737c4fca5714b4&language=en-US&page=1&with_genres=28')
		// .then((res) => {
		// 	console.log(res);
		// });
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
		@apply rounded-md my-1 py-2;
		display: inline-block;
		width: 100%;
		cursor: pointer;
		text-align: left;
		transition: background-color 0.3s;
	}

	.links:hover {
		@apply bg-gray-200;
	}

	@media (min-width: 768px) {
		.sidebar {
			left: 0em;
		}
	}
</style>
