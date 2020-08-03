<template>
	<div>
		<div class="relative z-30 h-full w-full bg-white shadow-md md:shadow-none md:pt-4">
			<div class="flex text-black h-full w-full relative bg-white border-gray-300 focus-within:border-primary md:rounded-md md:border-2">
				<button class="md:hidden px-3" @click="closeSearchBar" aria-label="close">
					<font-awesome-icon class="text-md" icon="times" />
				</button>
				<input
					class="w-full px-2 outline-none md:w-32 md:h-10 md:rounded-md"
					type="input"
					placeholder="Search..."
					:value="searchValue"
					@input="e => searchValue = e.target.value"
				>
				<Dropdown ref="dropdown" :dropdown-value="mediaType">
					<div @click="changeMediaType('movie'); toggleDropdown();">
						<DropdownItem>Movie</DropdownItem>
					</div>
					<div @click="changeMediaType('tv show'); toggleDropdown();">
						<DropdownItem>Tv Show</DropdownItem>
					</div>
				</Dropdown>
			</div>
		</div>
		<QuickSearchList
			:search-value="searchValue"
			:media-type="mediaType"
			@close-search-bar="closeSearchBar"
			@delete-search-value="deleteSearchValue"
		/>
	</div>
</template>

<script>
import Dropdown from '~/components/Dropdown';
import DropdownItem from '~/components/DropdownItem';

export default {
	name: 'SearchBar',
	components: {
		Dropdown,
		DropdownItem
	},
	data() {
		return {
			searchValue: '',
			mediaType: 'movie'
		};
	},
	methods: {
		deleteSearchValue() {
			this.searchValue = '';
		},
		closeSearchBar() {
			this.$emit('close-search-bar');
		},
		toggleDropdown() {
			this.$refs.dropdown.toggleDropdown();
		},
		changeMediaType(mediaType) {
			this.mediaType = mediaType;
		}
	}
};
</script>
