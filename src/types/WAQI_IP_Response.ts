export interface WAQI_IP_Response {
    status: 'ok' | 'error';
    data: WAQI_IP_Data;
}

export interface WAQI_IP_Data {
    aqi: number;
    idx: number;
    city: {
        geo: [number, number];
        location: string;
        name: string;
        url: string;
    };
    time: {
        iso: string;
        s: string;
        tz: string;
        v: number;
    };
    uid: string;
}
