import { Container, LeafletMap, Spinner } from '@/components';
import { useGetDataByCity } from '../hooks/useGetDataByCity';
import { useEffect, useState } from 'react';
import type { MarkerData } from '@/components/leafletMap/types/types';
import { Search } from '@/components/search';

export const Home = () => {
    const [cityName, setCityName] = useState('');
    const [city, setCity] = useState('bishkek');
    const { data, isError, error, isLoading } = useGetDataByCity(city);

    useEffect(() => {
        if (data) {
            console.log('Данные обновились:', data);
        }
    }, [data]);

    const handleCityNameSet = () => {
        setCity(cityName);
    };

    const stationPosition: [number, number] | null = data?.data?.[0]?.station?.geo
        ? [data.data[0].station.geo[0], data.data[0].station.geo[1]]
        : null;

    if (!stationPosition)
        return (
            <div className="flex flex-col gap-5 justify-center items-center min-h-screen">
                Загрузка координат...
                <Spinner className="scale-200" />
            </div>
        );
    if (isError) return <div className="text-red-400">Ошибка {error.message}</div>;
    if (isLoading) return <Spinner />;

    const stationMarkers =
        data?.data?.map<MarkerData>((marker) => ({
            uid: marker.uid,
            position: marker.station.geo,
            popup: `${marker.station.name}, AQI: ${marker.aqi}`,
        })) ?? [];

    return (
        <section className="relative overflow-hidden">
            <div className="border-2 border-blue-500 h-300 w-300 rounded-full -z-10 absolute -top-120 -left-100" />
            <div className="border-2 border-blue-500 h-300 w-300 rounded-full -z-10 absolute -bottom-120 -right-100" />

            <Container>
                <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
                    <Search
                        onChange={(e) => {
                            setCityName(e.target.value);
                        }}
                        value={cityName}
                        placeholder="Введите город"
                        disabled={cityName.trim() === ''}
                        onClick={handleCityNameSet}
                    />

                    <div className="px-10 py-4 bg-neutral-600/30 backdrop-blur-sm rounded-[17px]">
                        <div className="flex flex-col justify-center gap-2 mb-5 text-2xl font-black">
                            <span>
                                AQI: {String(data?.data[0].aqi) === '-' ? 'Данные отсутствуют' : data?.data[0].aqi}
                            </span>
                            <span>Станция: {data?.data[0].station.name}</span>
                        </div>

                        <LeafletMap
                            currentPosition={stationPosition}
                            markers={stationMarkers}
                            className="h-120 w-250 rounded-[15px]"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};
