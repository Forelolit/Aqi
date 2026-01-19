import 'leaflet/dist/leaflet.css';
import type { FC } from 'react';
import type { LeafletMapProps } from '../types/types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export const LeafletMap: FC<LeafletMapProps> = ({ className, currentPosition, markers }) => {
    return (
        <MapContainer center={currentPosition} zoom={13} className={className}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {markers?.map((m) => (
                <Marker key={m.uid} position={m.position}>
                    <Popup>{m.popup}</Popup>
                </Marker>
            )) ?? []}
        </MapContainer>
    );
};
