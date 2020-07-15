<template>
	<div>
		<Detail
			type="tv-series"
			:detail="tvSeries"
			:credits="credits"
			:trailer="trailer"
			:similar="similarSeries"
		/>
	</div>
</template>

<script>
import api from '~/api';
import Detail from '~/components/Detail';

export default {
	name: 'TvSeriesDetail',
	components: {
		Detail
	},
	data() {
		return {
			tvSeries: {},
			credits: [],
			trailer: {},
			similarSeries: []
		};
	},
	created() {
		const slug = this.$route.params.slug.split('-');
		const seriesId = slug[slug.length - 1];

		api.tv.details(seriesId)
		.then((res) => {
			this.tvSeries = res.data;
		});

		api.tv.credits(seriesId)
		.then((res) => {
			this.credits = res.data.cast;
		});

		api.tv.trailer(seriesId)
		.then((res) => {
			this.trailer = res.data.results[0];
		});

		api.tv.similar(seriesId)
		.then((res) => {
			this.similarSeries = res.data.results;
		});
	},
	head() {
		return {
			titleTemplate: this.tvSeries.name
		};
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
