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
  const [lng, setLng] = useState(-93.2496);
  const [lat, setLat] = useState(44.98);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <main>
      <h1>Map root page</h1>
      <div>
        <div ref={mapContainer} className="map-container">
          <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
        </div>
      </div>
    </main>
  );
};
