import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'c73e688d3dc273ea17737c4fca5714b4';

const movies = {
	popular: (page) => {
		return axios(`${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
	},
	trending: () => {
		return 'trending movie';
	}
};

const tv = {
	popular: (page) => {
		return axios(`${API_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
	}
};

function trending(mediaType, time) {
	return axios(`${API_URL}/trending/${mediaType}/${time}?api_key=${API_KEY}`);
}

export default { movies, tv, trending };
