import { Button, Container, LeafletMap, Search, Spinner } from '@/components/index';
import { useGetDataByCity, useGetDataByIP } from '../hooks/index';
import { useEffect, useRef, useState } from 'react';
import type { MarkerData } from '@/components/leafletMap/types/types';
import { MapPinHouseIcon } from 'lucide-react';
import { initialPrompt } from '@/utils/constants';

import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    apiKey: import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY,
});

export const Home = () => {
    const [cityName, setCityName] = useState('');
    const [city, setCity] = useState('');
    const { data: cityBySearch, isLoading, isError, error } = useGetDataByCity(city);
    const { data: cityByIP } = useGetDataByIP();

    const [aiResponse, setAiResponse] = useState('');

    const stationMarkers =
        cityBySearch?.data?.map<MarkerData>((marker) => ({
            uid: marker.uid,
            position: marker.station.geo,
            popup: `${marker.station.name}, AQI: ${marker.aqi}`,
            aqi: marker.aqi,
        })) ?? [];

    const markersRef = useRef(stationMarkers);

    const askAI = async () => {
        try {
            const { text } = await generateText({
                model: google('gemini-2.0-flash'),
                prompt: `${initialPrompt} Данные: ${JSON?.stringify(
                    stationMarkers.slice(0, 10).map(({ popup }) => popup),
                    null,
                    2,
                )}`,
            });
            return text;
        } catch (error) {
            console.error('Ошибка: ' + error);
        }
    };

    const askAIRef = useRef(askAI);

    useEffect(() => {
        markersRef.current = stationMarkers;
        askAIRef.current = askAI;
    });

    useEffect(() => {
        if (markersRef.current.length > 0) {
            const getAnalysis = async () => {
                setAiResponse('Загрузка анализа...');
                const res = await askAIRef.current();
                setAiResponse(res ?? 'Ошибка анализа');
            };

            getAnalysis();
        } else {
            console.log('Data is missing');
        }
    }, [cityBySearch?.data]);

    const stationPosition: [number, number] | null = cityBySearch?.data?.[0]?.station?.geo
        ? [cityBySearch.data[0].station.geo[0], cityBySearch.data[0].station.geo[1]]
        : null;

    if (isLoading)
        return (
            <div className="flex flex-col gap-5 justify-center items-center min-h-screen">
                Загрузка координат...
                <Spinner className="scale-200" />
            </div>
        );

    const handleCityNameSet = () => {
        setCity(cityName);
    };

    const handleGeoPosition = () => {
        setCity(cityByIP?.data.city.name ?? '');
    };

    return (
        <section className="relative overflow-hidden">
            <div className="border-2 border-blue-500 h-300 w-300 rounded-full -z-10 absolute -top-120 -left-100" />
            <div className="border-2 border-blue-500 h-300 w-300 rounded-full -z-10 absolute -bottom-120 -right-100" />

            <Container>
                <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
                    <div className="flex items-center gap-8">
                        <Search
                            onChange={(e) => {
                                setCityName(e.target.value);
                            }}
                            value={cityName}
                            placeholder="Введите город"
                            disabled={cityName.trim() === ''}
                            onClick={handleCityNameSet}
                        />

                        <Button variant="outline" title="Геопозиция" onClick={handleGeoPosition}>
                            <MapPinHouseIcon />
                        </Button>
                    </div>

                    {isError && city && <span className="text-red-400 text-2xl">Ошибка {error.message}</span>}
                    {!city && <span className="text-2xl">Введите данные</span>}

                    {!isLoading && stationPosition && (
                        <div className="px-10 py-4 border border-neutral-600/60 shadow-[inset_0_1px_2px_rgb(113,113,113)] bg-neutral-600/30 backdrop-blur-sm rounded-[17px]">
                            <div className="flex flex-col justify-center gap-2 mb-5 text-2xl font-black">
                                <span>
                                    AQI:{' '}
                                    {String(cityBySearch?.data[0].aqi) === '-'
                                        ? 'Данные отсутствуют'
                                        : cityBySearch?.data[0].aqi}
                                </span>
                                <span className="break-normal max-w-200">
                                    Станция: {cityBySearch?.data[0].station.name}
                                </span>
                                <p className="break-normal max-w-200 text-sm">Рецензия: {aiResponse}</p>
                            </div>

                            <LeafletMap
                                currentPosition={stationPosition}
                                markers={stationMarkers}
                                className="h-120 w-250 rounded-[15px]"
                            />
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
};
