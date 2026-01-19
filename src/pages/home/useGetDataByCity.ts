import { fetchWAQI } from '@/api/fetchWAQI';
import { useQuery } from '@tanstack/react-query';

export const useGetDataByCity = (city: string) => {
    return useQuery({
        queryKey: ['city data', city],
        queryFn: () => fetchWAQI(city),
    });
};
