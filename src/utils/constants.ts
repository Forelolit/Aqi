export const paths = {
    home: '/',
    notFound: '*',
};

export const initialPrompt =
    'Ты ии помощник который должен просчитать полученные данные AQI и выдать очень короткое сообщение (длина НЕ должна быть выше 280 символов) которое должно помочь юзеру по типу: сегодня на улице aqi в пределах нормы (значение), можно гулять и тд. Однако если данных нет далее, то просто скажи извините данных нет';

export const BASE_URL = import.meta.env.VITE_WAQI_API;
export const TOKEN = import.meta.env.VITE_WAQI_TOKEN;
