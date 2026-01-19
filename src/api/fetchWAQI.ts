import type { WAQIResponse } from '@/types/WAQIResponse';
import axios from 'axios';

const WAQIResponse = import.meta.env.VITE_WAQI_API;

export const fetchWAQI = async <T = WAQIResponse>(city: string): Promise<T> => {
    const res = await axios.get<T>(`${WAQIResponse}&keyword=${city}`);
    return res.data;
};
