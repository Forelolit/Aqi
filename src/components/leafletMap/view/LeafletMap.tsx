import 'leaflet/dist/leaflet.css';
import { Fragment, type FC } from 'react';
import type { LeafletMapProps } from '../types/types';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';

const aqiColor = (aqi: number) => {
    if (aqi <= 50) {
        return '#008000 ';
    } else if (aqi <= 100 && aqi > 50) {
        return '#FFFF00';
    } else if (aqi <= 150 && aqi > 100) {
        return '#FFA500';
    } else if (aqi <= 200 && aqi > 150) {
        return '#ff0000';
    } else if (aqi <= 300 && aqi > 200) {
        return '#800080';
    } else if (aqi > 300) {
        return '#800000';
    } else {
        return '#808080';
    }
};

export const LeafletMap: FC<LeafletMapProps> = ({ className, currentPosition, markers }) => {
    return (
        <MapContainer center={currentPosition} zoom={13} className={className}>
            <TileLayer
                attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png"
            />

            {markers?.map((m) => (
                <Fragment key={m.uid}>
                    <Marker position={m.position}>
                        <Popup>{m.popup}</Popup>
                    </Marker>
                    <Circle stroke={false} color={aqiColor(m.aqi)} radius={2000} center={m.position} />
                </Fragment>
            )) ?? []}
        </MapContainer>
    );
};
