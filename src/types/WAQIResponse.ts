export interface WAQIResponse {
    status: 'ok' | 'error';
    data: WAQIData;
}

export interface WAQIData {
    aqi: number;
    idx: number;
    attributions: Attribution[];
    city: City;
    dominentpol: string; // Основной загрязнитель, например "o3" или "pm25"
    iaqi: IndividualAQI;
    time: TimeInfo;
    forecast: Forecast;
    debug: {
        sync: string;
    };
}

interface Attribution {
    url: string;
    name: string;
}

interface City {
    geo: [number, number]; // [latitude, longitude]
    name: string;
    url: string;
    location: string;
}

// Поля в iaqi могут меняться в зависимости от станции
interface IndividualAQI {
    co?: { v: number }; // Угарный газ
    h?: { v: number }; // Влажность (humidity)
    no2?: { v: number }; // Диоксид азота
    o3?: { v: number }; // Озон
    p?: { v: number }; // Давление
    pm10?: { v: number }; // Взвешенные частицы < 10мкм
    pm25?: { v: number }; // Взвешенные частицы < 2.5мкм
    so2?: { v: number }; // Диоксид серы
    t?: { v: number }; // Температура
    w?: { v: number }; // Ветер
    [key: string]: { v: number } | undefined;
}

interface TimeInfo {
    s: string; // Локальное время
    tz: string; // Таймзона
    v: number; // Epoch time
    iso: string; // ISO 8601
}

interface Forecast {
    daily: {
        o3?: ForecastItem[];
        pm10?: ForecastItem[];
        pm25?: ForecastItem[];
        uvi?: ForecastItem[]; // Ультрафиолетовый индекс
        [key: string]: ForecastItem[] | undefined;
    };
}

interface ForecastItem {
    avg: number;
    day: string; // ГГГГ-ММ-ДД
    max: number;
    min: number;
}
