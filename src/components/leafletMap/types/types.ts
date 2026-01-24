export interface MarkerData {
    position: [number, number];
    popup: string;
    uid: string;
    aqi: number;
}

export interface LeafletMapProps {
    currentPosition: [number, number];
    className?: string;
    markers?: MarkerData[];
}
