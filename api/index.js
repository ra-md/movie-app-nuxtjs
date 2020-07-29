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

const api = {
	trending(mediaType, time) {
		return axiosInstance.get(`trending/${mediaType}/${time}`, params());
	},
	search(mediaType, page, query) {
		return axiosInstance.get(`search/${mediaType === 'tv show' ? 'tv' : 'movie'}`, params(page, { query }));
	},
	details(mediaType, id) {
		return axiosInstance.get(`${mediaType}/${id}`, params());
	},
	credits(mediaType, id) {
		return axiosInstance.get(`${mediaType}/${id}/credits`, params());
	},
	trailer(mediaType, id) {
		return axiosInstance.get(`${mediaType}/${id}/videos`, params());
	},
	similar(mediaType, id) {
		return axiosInstance.get(`${mediaType}/${id}/similar`, params());
	},
	topRated(mediaType, page) {
		return axiosInstance.get(`${mediaType}/top_rated`, params(page));
	},
	popular(mediaType, page) {
		return axiosInstance.get(`${mediaType}/popular`, params(page));
	}
};

export default api;
