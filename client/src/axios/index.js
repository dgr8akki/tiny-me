import axios from 'axios';

const instance = axios.create();

export const { CancelToken } = axios;
export default instance;
