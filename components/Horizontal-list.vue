<template>
	<!-- <vue-horizontal-list :items="arrs" > -->
	<vue-horizontal-list :items="items" :options="{responsive: [{size: 1}]}">
		<template v-slot:default="{ item }">
			<div class="item">
				<h5>{{ item.title }}</h5>
				<p>{{ item.content }}</p>
			</div>
		</template>
	</vue-horizontal-list>
</template>

<script>
export default {
	data() {
		return {
			items: [{ title: 'abc', content: 'abc 123' }, { title: 'def', content: 'def 456' }, { title: 'ghi', content: 'ghi 789' }]
		};
	}
};
</script>
