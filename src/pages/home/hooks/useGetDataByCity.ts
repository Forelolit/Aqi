import { useQuery } from '@tanstack/react-query';
import { fetchWAQI } from '@/api/fetchWAQI';

export const useGetDataByCity = (city: string) => {
    return useQuery({
        queryKey: ['city data', city],
        queryFn: () => fetchWAQI(city),
        retry: false,
    });
};
