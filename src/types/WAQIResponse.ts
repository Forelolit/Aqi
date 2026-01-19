export interface WAQIResponse {
    status: 'ok' | 'error';
    data: WAQIData[];
}

export interface WAQIData {
    aqi: number;
    station: {
        name: string;
        geo: [number, number];
        country: string;
        url: string;
    };
    time: {
        stime: string;
        tz: string;
        vtime: number;
    };
    uid: string;
}
