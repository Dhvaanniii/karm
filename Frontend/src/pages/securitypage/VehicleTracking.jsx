import React, { useEffect, useState } from "react";
import { getAllVehicles } from "../../services/vehicleService";
import { toast } from "react-hot-toast";
import searchIcon from "../../assets/images/search.svg";
import { Loader } from "../../utils/Loader";

export default function VehicleTracking() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchVehicles = async () => {
    try {
      setIsLoading(true);
      const response = await getAllVehicles();
      setVehicles(response.data);
    } catch (error) {
      toast.error("Failed to fetch vehicles");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((v) =>
    v.vehicle_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.wing.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.unit.toString().includes(searchTerm)
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {isLoading && <Loader />}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Vehicle Tracking</h2>
      </div>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search by vehicle number, wing, unit..."
          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={searchIcon} alt="" className="absolute left-3 top-3.5 w-6 h-6 opacity-50" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4">Vehicle Details</th>
              <th className="p-4">Owner Information</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <tr key={vehicle._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-full text-2xl">
                        {vehicle.vehicle_type === "Two Wheeler" ? "🏍️" : "🚗"}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{vehicle.vehicle_name}</div>
                        <div className="text-sm font-mono bg-gray-100 px-2 py-0.5 rounded text-blue-700 mt-1">
                          {vehicle.vehicle_number}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-gray-700">{vehicle.owner_id?.Full_name || "Unknown"}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                      {vehicle.owner_id?.Resident_status || "Resident"}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">Wing {vehicle.wing} - Unit {vehicle.unit}</span>
                      <span className="text-xs text-gray-500 mt-1">Parking Slot: {vehicle.parking_slot || "Not Assigned"}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      vehicle.status === "Active" 
                        ? "bg-green-100 text-green-700 border border-green-200" 
                        : "bg-red-100 text-red-700 border border-red-200"
                    }`}>
                      {vehicle.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-500 italic">
                  No matching vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
