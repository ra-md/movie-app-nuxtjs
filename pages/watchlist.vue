<template>
	<div class="my-16 md:my-8">
		<MovieORTvList :no-results="noResults" :items="watchlist" :page="0" :total-pages="0" />
	</div>
</template>

<script>
import MovieORTvList from '~/components/MovieORTvList';
import db from '~/utils/db';
import api from '~/api';

export default {
	name: 'Watchlist',
	components: {
		MovieORTvList
	},
	data() {
		return {
			watchlist: [],
			noResults: false
		};
	},
	computed: {
		loading() {
			if (this.watchlist.length === 0) {
				return true;
			} else {
				return false;
			}
		}
	},
	async mounted() {
		const watchlistData = await db.get();
		if (watchlistData.length !== 0) {
			this.noResults = false;
			for (const item of watchlistData) {
				const { data } = await api.details(item.mediaType.toLowerCase(), item.id);
				this.watchlist.push(data);
			}
		} else {
			this.noResults = true;
		}
	}
};
</script>
