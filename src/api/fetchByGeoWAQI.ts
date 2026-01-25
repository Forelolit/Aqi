import axios from 'axios';
import { BASE_URL, TOKEN } from '@/utils/constants';
import type { WAQI_IP_Response } from '@/types/WAQI_IP_Response';

export const fetchByGeoWAQI = async (): Promise<WAQI_IP_Response> => {
    const res = await axios.get<WAQI_IP_Response>(`${BASE_URL}/feed/here/?token=${TOKEN}`);

    if (res.data.status === 'error') {
        throw new Error(typeof res.data.data === 'string' ? res.data.data : 'API Error');
    }

    if (Array.isArray(res.data.data) && res.data.data.length === 0) {
        throw new Error('Город не найден');
    }

    return res.data;
};
