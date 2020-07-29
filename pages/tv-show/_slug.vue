<template>
	<div>
		<Detail
			type="TV"
			:detail="tvShow"
			:cast="credits"
			:trailer="trailer"
			:similar="similarShow"
		/>
	</div>
</template>

<script>
import api from '~/api';
import Detail from '~/components/Detail';

export default {
	name: 'TvShowDetail',
	components: {
		Detail
	},
	data() {
		return {
			tvShow: {},
			credits: [],
			trailer: {},
			similarShow: []
		};
	},
	created() {
		const slug = this.$route.params.slug.split('-');
		const showId = slug[slug.length - 1];

		api.details('tv', showId)
		.then((res) => {
			this.tvShow = res.data;
		});

		api.credits('tv', showId)
		.then((res) => {
			this.credits = res.data.cast;
		});

		api.trailer('tv', showId)
		.then((res) => {
			this.trailer = res.data.results[0];
		});

		api.similar('tv', showId)
		.then((res) => {
			this.similarShow = res.data.results;
		});
	},
	head() {
		return {
			titleTemplate: this.tvShow.name
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
