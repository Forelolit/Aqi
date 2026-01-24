import { Container, LeafletMap, Search, Spinner } from '@/components/index';
import { useGetDataByCity } from '../hooks/useGetDataByCity';
import { useEffect, useState } from 'react';
import type { MarkerData } from '@/components/leafletMap/types/types';

import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    apiKey: import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY,
});

const initialPrompt =
    'Ты ии помощник который должен просчитать полученные данные AQI и выдать очень короткое сообщение (длина НЕ должна быть выше 280 символов) которое должно помочь юзеру по типу: сегодня на улице aqi в пределах нормы (значение), можно гулять и тд. Однако если данных нет далее, то просто скажи извините данных нет';

export const Home = () => {
    const [cityName, setCityName] = useState('');
    const [city, setCity] = useState('');
    const { data, isLoading, isError, error } = useGetDataByCity(city);

    const [aiResponse, setAiResponse] = useState('');

    const stationMarkers =
        data?.data?.map<MarkerData>((marker) => ({
            uid: marker.uid,
            position: marker.station.geo,
            popup: `${marker.station.name}, AQI: ${marker.aqi}`,
            aqi: marker.aqi,
        })) ?? [];

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

    useEffect(() => {
        if (stationMarkers.length > 0) {
            const getAnalysis = async () => {
                setAiResponse('Загрузка анализа...');
                const res = await askAI();
                setAiResponse(res ?? 'Ошибка анализа');
            };

            getAnalysis();
        } else {
            console.log('Data is missing');
        }
    }, [data?.data]);

    useEffect(() => {
        if (data) {
            console.log('Данные обновились:', data);
        }
    }, [data]);

    const stationPosition: [number, number] | null = data?.data?.[0]?.station?.geo
        ? [data.data[0].station.geo[0], data.data[0].station.geo[1]]
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

                    {isError && city && <span className="text-red-400 text-2xl">Ошибка {error.message}</span>}
                    {!city && <span className="text-2xl">Введите данные</span>}

                    {!isLoading && stationPosition && (
                        <>
                            <div className="px-10 py-4 border border-neutral-600/60 shadow-[inset_0_1px_2px_rgb(113,113,113)] bg-neutral-600/30 backdrop-blur-sm rounded-[17px]">
                                <div className="flex flex-col justify-center gap-2 mb-5 text-2xl font-black">
                                    <span>
                                        AQI:{' '}
                                        {String(data?.data[0].aqi) === '-' ? 'Данные отсутствуют' : data?.data[0].aqi}
                                    </span>
                                    <span>Станция: {data?.data[0].station.name}</span>
                                    <p className="break-normal max-w-200 text-sm">{aiResponse}</p>
                                </div>

                                <LeafletMap
                                    currentPosition={stationPosition}
                                    markers={stationMarkers}
                                    className="h-120 w-250 rounded-[15px]"
                                />
                            </div>
                        </>
                    )}
                </div>
            </Container>
        </section>
    );
};
