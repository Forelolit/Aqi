import type { WAQIResponse } from '@/types/WAQIResponse';
import axios from 'axios';

const WAQIResponse = import.meta.env.VITE_WAQI_API;

export const fetchWAQI = async <WAQIResponse>() => {
    const res = await axios.get<WAQIResponse>(WAQIResponse);
    return res.data;
};
