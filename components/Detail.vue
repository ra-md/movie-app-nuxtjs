<template>
	<div>
		<div v-if="!detail.id">
			<h1>Loading...</h1>
		</div>
		<div v-else class="">
			<div class="max-h-screen py-4 flex">
				<div class="w-2/5">
					<img class="h-full rounded-md" :src="`https://image.tmdb.org/t/p/w500/${detail.poster_path}`">
				</div>
				<div class="bg-white w-3/5 shadow-md p-4 rounded-md">
					<iframe v-if="trailer" class="rounded-md h-3/5 w-full mb-4 shadow-md" :src="`https://www.youtube.com/embed/${trailer.key}`" />
					<div class="mb-1">
						<h1>
							{{ detail.title || detail.name }} ({{ year }})
						</h1>
					</div>
					<div class="mb-1">
						<font-awesome-icon icon="film" />
						<span v-for="(genre, index) in detail.genres" :key="genre.id" class="pr-2 text-lg">
							{{ genre.name }}{{ index !== detail.genres.length - 1 ? ',' : '' }}
						</span>
					</div>
					<div class="mb-1">
						<font-awesome-icon icon="hourglass" />
						<span class="ml-1 text-lg">
							{{ type === 'tv-series' ? detail.episode_run_time[0] : detail.runtime }} minutes
						</span>
					</div>
					<div class="mb-1">
						<font-awesome-icon class="text-yellow-400" icon="star" />
						<span class="text-lg">{{ detail.vote_average }}<span class="font-thin">/10</span></span>
					</div>
					<div class="h-20 shadow-inner overflow-auto">
						<p class="p-2">
							{{ detail.overview }}
						</p>
					</div>
				</div>
			</div>
			<client-only v-if="credits.length !== 0">
				<h1>Cast</h1>
				<vue-horizontal-list :items="filteredCast" :options="options">
					<template v-slot:default="{ item }">
						<div class="rounded-md bg-white shadow-md overflow-hidden">
							<img class="rounded-t-md" :src="`https://image.tmdb.org/t/p/w500/${item.profile_path}`">
							<div class="item relative px-2 whitespace-no-wrap">
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
			</client-only>
			<h1>Similar Movies</h1>
			<HorizontalList :items="similar" />
		</div>
	</div>
</template>

<script>
import HorizontalList from '~/components/HorizontalList';

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
		credits: {
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
			options: {
				responsive: [
					{ end: 576, size: 3 },
					{ start: 576, end: 1024, size: 5 },
					{ size: 7 }
				]
			}
		};
	},
	computed: {
		year() {
			if (this.type === 'tv-series') {
				const firstAirDate = this.detail.first_air_date.split('-')[0];
				const lastAirDate = this.detail.last_air_date.split('-')[0];
				const status = this.detail.status;

				return `${firstAirDate}-${status === 'Ended' ? lastAirDate : ''}`;
			} else {
				const year = this.detail.release_date.split('-')[0];
				return year;
			}
		},
		filteredCast() {
			return this.credits.filter((cast) => {
				return cast.profile_path !== null;
			});
		}
	}
};
</script>

<style scoped>
	.item::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: linear-gradient(90deg, transparent 70%, white);
	}
</style>
