import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'c73e688d3dc273ea17737c4fca5714b4';

const axiosInstance = axios.create({ baseURL: API_URL });

function params(page = 1) {
	return {
		params: {
			api_key: API_KEY,
			page,
			language: 'en-US'
		}
	};
}

const movies = {
	popular: (page) => {
		return axiosInstance.get('movie/popular', params(page));
	},
	trending: () => {
		return 'trending movie';
	}
};

const tv = {
	popular: (page) => {
		return axiosInstance.get('tv/popular', params(page));
	}
};

function trending(mediaType, time) {
	return axiosInstance.get(`trending/${mediaType}/${time}`, params());
}

export default { movies, tv, trending };
