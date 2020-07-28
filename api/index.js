import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'c73e688d3dc273ea17737c4fca5714b4';

const axiosInstance = axios.create({ baseURL: API_URL });

function params(page = 1, option = {}) {
	return {
		params: {
			...option,
			api_key: API_KEY,
			page,
			language: 'en-US'
		}
	};
}

const movie = {
	popular(page) {
		return axiosInstance.get('movie/popular', params(page));
	},
	details(id) {
		return axiosInstance.get(`movie/${id}`, params());
	},
	credits(id) {
		return axiosInstance.get(`movie/${id}/credits`, params());
	},
	trailer(id) {
		return axiosInstance.get(`movie/${id}/videos`, params());
	},
	similar(id) {
		return axiosInstance.get(`movie/${id}/similar`, params());
	},
	topRated(page) {
		return axiosInstance.get('movie/top_rated', params(page));
	}
};

const tv = {
	popular: (page) => {
		return axiosInstance.get('tv/popular', params(page));
	},
	details(id) {
		return axiosInstance.get(`tv/${id}`, params());
	},
	credits(id) {
		return axiosInstance.get(`tv/${id}/credits`, params());
	},
	trailer(id) {
		return axiosInstance.get(`tv/${id}/videos`, params());
	},
	similar(id) {
		return axiosInstance.get(`/tv/${id}/similar`, params());
	},
	topRated(page) {
		return axiosInstance.get('tv/top_rated', params(page));
	}
};

function trending(mediaType, time) {
	return axiosInstance.get(`trending/${mediaType}/${time}`, params());
}

function search(mediaType, page, query) {
	return axiosInstance.get(`search/${mediaType === 'tv show' ? 'tv' : 'movie'}`, params(page, { query }));
}

export default { movie, tv, trending, search };
