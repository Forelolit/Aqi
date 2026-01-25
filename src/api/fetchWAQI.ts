import axios from 'axios';
import type { WAQIResponse } from '@/types/WAQIResponse';
import { BASE_URL, TOKEN } from '@/utils/constants';

export const fetchWAQI = async (city: string): Promise<WAQIResponse> => {
    const res = await axios.get<WAQIResponse>(`${BASE_URL}/search/?token=${TOKEN}&keyword=${city}`);

    if (res.data.status === 'error') {
        throw new Error(typeof res.data.data === 'string' ? res.data.data : 'API Error');
    }

    if (Array.isArray(res.data.data) && res.data.data.length === 0 && city) {
        throw new Error('Город не найден');
    }

    return res.data;
};
