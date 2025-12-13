import { useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import coverageData from "./coverage.json";

const Coverage = () => {
  const mapRef = useRef(null);
  const [searchText, setSearchText] = useState("");

  // Center of Bangladesh
  const centerPosition = [23.685, 90.3563];

  const handleSearch = (e) => {
    e.preventDefault();

    const district = coverageData.find((area) =>
      area.district.toLowerCase().includes(searchText.toLowerCase())
    );

    if (district && mapRef.current) {
      mapRef.current.flyTo([district.latitude, district.longitude], 14);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-red-800">
          Delivery Coverage Area
        </h2>
        <p className="text-gray-500 mt-2">
          BookCourier delivers books across major cities and districts
        </p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search district (e.g. Dhaka, Chattogram)"
          className="border rounded-l px-4 py-2 w-72 focus:outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-800 text-white px-5 rounded-r hover:bg-red-900"
        >
          Search
        </button>
      </form>

      {/* Map */}
      <div className="h-[600px] rounded-xl overflow-hidden shadow-md">
        <MapContainer
          center={centerPosition}
          zoom={7}
          scrollWheelZoom={false}
          className="h-full w-full"
          ref={mapRef}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {coverageData.map((area, index) => (
            <Marker key={index} position={[area.latitude, area.longitude]}>
              <Popup>
                <h3 className="font-semibold text-red-800">{area.district}</h3>
                <p className="text-sm">Covered Areas:</p>
                <p className="text-xs text-gray-600">
                  {area.covered_area.join(", ")}
                </p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default Coverage;
