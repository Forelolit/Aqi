export interface MarkerData {
    position: [number, number];
    popup: string;
}

export interface LeafletMapProps {
    currentPosition: [number, number];
    className?: string;
    markers?: MarkerData[];
}
