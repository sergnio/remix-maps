import mapboxgl, { Map } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import mapStyles from "~/styles/map.css";

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css",
    },
    { rel: "stylesheet", href: mapStyles },
  ];
};

export default () => {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2VyZ25pbyIsImEiOiJja3lycWxzMTYwcXB3MnZwaDNlcmUzdjBnIn0.p_keTCOK0DTltJmYTBtLaA";
  const mapContainer = useRef();
  const map = useRef<Map>();
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <main>
      <h1>Map root page</h1>
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </main>
  );
};
