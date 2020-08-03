<template>
	<div class="px-1 py-3 md:px-4 md:py-1 rounded-lg shadow-lg my-8">
		<h1 class="text-center">
			{{ name }}
		</h1>
		<section>
			<h2 class="title">
				Popular
			</h2>
			<HorizontalList :items="popular" />
		</section>
		<section>
			<h2 class="title">
				Trending
			</h2>
			<HorizontalList :items="trending" />
		</section>
		<section>
			<h2 class="title">
				Top Rated
			</h2>
			<HorizontalList :items="topRated" />
		</section>
	</div>
</template>

<script>
export default {
	name: "MovieOrTvSection",
	props: {
		name: {
			type: String,
			required: true
		},
		popular: {
			type: Array,
			required: true
		},
		trending: {
			type: Array,
			required: true
		},
		topRated: {
			type: Array,
			required: true
		}
	}
}
</script>

<style scoped>
	.title {
		@apply pt-4 pl-4;
	}

	@screen md {
		.title {
			@apply p-1;
		}
	}
</style>
