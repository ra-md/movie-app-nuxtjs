<template>
	<div>
		<div class="mb-4 flex flex-col lg:py-6 lg:flex-row">
			<div class="lg:w-2/5 lg:ml-8 lg:order-last">
				<div class="relative overlay">
					<img class="w-full min-h-48 md:min-h-64 lg:hidden" :src="`https://image.tmdb.org/t/p/w500/${detail.backdrop_path}`">
					<img
						class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 h-40 lg:rounded-md lg:h-auto lg:static lg:translate-x-0 lg:translate-y-0"
						:src="`https://image.tmdb.org/t/p/w500/${detail.poster_path}`"
					>
				</div>
			</div>
			<div class="bg-white shadow-md p-4 flex flex-col lg:w-3/5 lg:rounded-md lg:order-first">
				<div class="lg:my-0 lg:order-last">
					<div class="mb-1 md:my-1 flex items-center w-full justify-between">
						<h1>
							{{ detail.title || detail.name }} ({{ year }})
						</h1>
						<div class="text-2xl cursor-pointer">
							<font-awesome-icon
								:icon="[`${disableBookmark ? 'fas' : 'far'}`, 'bookmark']"
								@click="[disableBookmark ? removeFromWatchlist() : addToWatchlist()]"
							/>
						</div>
					</div>
					<div class="mb-1">
						<div>
							<font-awesome-icon icon="film" />
							<span v-for="genre in detail.genres" :key="genre.id" class="pr-2 text-lg">
								{{ genre.name }},
							</span>
							<span class="text-lg">{{ type }}.</span>
						</div>
					</div>
					<div class="mb-1">
						<div>
							<font-awesome-icon icon="hourglass" />
							<span class="ml-1 text-lg">
								{{ type === 'TV' ? detail.episode_run_time[0] : detail.runtime }} minutes
							</span>
						</div>
					</div>
					<div class="mb-1">
						<div>
							<font-awesome-icon class="text-yellow-400" icon="star" />
							<span class="text-lg">{{ detail.vote_average }}<span class="font-thin">/10</span></span>
						</div>
					</div>
					<div class="overflow-auto lg:h-24 lg:shadow-inner">
						<p class="p-2">
							{{ detail.overview }}
						</p>
					</div>
				</div>
				<div class="h-48 md:h-64 lg:order-first lg:h-3/5">
					<div class="h-full">
						<iframe
							v-if="trailer"
							class="w-full h-full mb-4 shadow-md lg:rounded-md lg:min-h-3/5"
							:src="`https://www.youtube.com/embed/${trailer.key}`"
						/>
					</div>
				</div>
			</div>
		</div>
		<client-only>
			<div v-if="cast.length !== 0" class="px-2">
				<h1>
					Cast
				</h1>
				<vue-horizontal-list class="mb-4" :items="cast" :options="options">
					<template v-slot:default="{ item }">
						<div class="rounded-md h-full bg-white shadow-md overflow-hidden">
							<img class="rounded-t-md" :alt="item.title||item.name" :src="`https://image.tmdb.org/t/p/w500/${item.profile_path}`">
							<div class="white-space-shadow relative px-2 whitespace-no-wrap">
								<p class="font-medium">
									{{ item.name }}
								</p>
								<p>
									{{ item.character }}
								</p>
							</div>
						</div>
					</template>
				</vue-horizontal-list>
			</div>
		</client-only>
		<div v-if="similar.length !== 0" class="px-2">
			<h1>
				Similar Movies
			</h1>
			<HorizontalList :items="similar" />
		</div>
	</div>
</template>

<script>
import HorizontalList from '~/components/HorizontalList';
import db from '~/utils/db';

export default {
	name: 'Detail',
	components: {
		HorizontalList
	},
	props: {
		type: {
			type: String,
			required: true
		},
		detail: {
			type: Object,
			required: true
		},
		cast: {
			type: Array,
			required: true
		},
		trailer: {
			type: [Object, null],
			default() {
				return null;
			}
		},
		similar: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			disableBookmark: false,
			options: {
				list: {
					padding: 3
				},
				responsive: [
					{ end: 576, size: 2 },
					{ start: 576, end: 1024, size: 5 },
					{ size: 7 }
				]
			}
		};
	},
	computed: {
		year() {
			if (this.type === 'TV') {
				const firstAirDate = this.detail.first_air_date.split('-')[0];
				const lastAirDate = this.detail.last_air_date.split('-')[0];
				const status = this.detail.status;

				return `${firstAirDate}-${status === 'Ended' ? lastAirDate : ''}`;
			} else {
				const year = this.detail.release_date.split('-')[0];
				return year;
			}
		}
	},
	async created() {
		const item = await db.getById(this.detail.id);

		if (item) {
			this.disableBookmark = true;
		} else {
			this.disableBookmark = false;
		}
	},
	methods: {
		addToWatchlist() {
			db.set({
				id: this.detail.id,
				mediaType: this.type
			});
			this.disableBookmark = !this.disableBookmark;
		},
		removeFromWatchlist() {
			db.delete(this.detail.id);
			this.disableBookmark = !this.disableBookmark;
		}
	}
};
</script>

<style scoped>
	.overlay::before {
		opacity: 0.7;
		background-color: black;
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
	}

	@media (min-width: 1024px) {
		.overlay::before {
			display: none;
		}
	}
</style>
