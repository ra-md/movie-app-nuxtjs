<template>
	<div>
		<Detail
			type="TV"
			:detail="tvShow"
			:cast="cast"
			:trailer="trailer"
			:similar="similarTv"
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
	async asyncData(context) {
		try {
			const slug = context.params.slug.split('-');
			const tvId = slug[slug.length - 1];

			const [credits, details, trailer, similar] = await Promise.all([
				api.credits('tv', tvId),
				api.details('tv', tvId),
				api.trailer('tv', tvId),
				api.similar('tv', tvId)
			]);

			return {
				tvShow: details.data,
				cast: credits.data.cast,
				trailer: trailer.data.results[0],
				similarTv: similar.data.results
			};
		} catch (error) {
			context.error({ statusCode: 404, message: 'Page Not Found' });
		}
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
