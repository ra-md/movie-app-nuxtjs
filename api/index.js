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
	trending() {
		return 'trending movie';
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
		return axiosInstance.get(`/movie/${id}/similar`, params());
	}
};

const tv = {
	popular: (page) => {
		return axiosInstance.get('tv/popular', params(page));
	},
	trending() {
		return 'trending movie';
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
	}
};

function trending(mediaType, time) {
	return axiosInstance.get(`trending/${mediaType}/${time}`, params());
}

function search(query) {
	return axiosInstance.get('search/movie', params(1, { query }));
}

export default { movie, tv, trending, search };
