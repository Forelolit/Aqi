import { useQuery } from '@tanstack/react-query';
import { fetchByGeoWAQI } from '@/api/fetchByGeoWAQI';

export const useGetDataByIP = () => {
    return useQuery({
        queryKey: ['city data by IP'],
        queryFn: fetchByGeoWAQI,
        retry: false,
    });
};
