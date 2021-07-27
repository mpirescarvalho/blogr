import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://blogrdev.herokuapp.com',
});
