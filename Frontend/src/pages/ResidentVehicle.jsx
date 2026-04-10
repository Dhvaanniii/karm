import React, { useEffect, useState } from "react";
import { getMyVehicles, getWingVehicles, getAllVehicles, addResidentVehicle } from "../services/vehicleService";
import { toast } from "react-hot-toast";
import plus from "../assets/images/plus.svg";
import searchIcon from "../assets/images/search.svg";
import { Loader } from "../utils/Loader";

export default function ResidentVehicle() {
  const [activeTab, setActiveTab] = useState("my"); // 'my', 'wing', 'search'
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    vehicle_type: "",
    vehicle_name: "",
    vehicle_number: "",
    parking_slot: "",
    notes: "",
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      let response;
      if (activeTab === "my") {
        response = await getMyVehicles();
      } else if (activeTab === "wing") {
        response = await getWingVehicles();
      } else if (activeTab === "search") {
        response = await getAllVehicles();
      }
      setVehicles(response.data);
    } catch (error) {
      toast.error("Failed to fetch vehicles");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleOpenModal = () => {
    setFormData({
      vehicle_type: "",
      vehicle_name: "",
      vehicle_number: "",
      parking_slot: "",
      notes: "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // For resident, we get wing/unit from their profile on backend
      const residentInfo = JSON.parse(localStorage.getItem("user") || "{}");
      const submissionData = {
        ...formData,
        wing: residentInfo.Wing,
        unit: residentInfo.Unit,
        owner_id: residentInfo._id,
      };
      await addResidentVehicle(submissionData);
      toast.success("Vehicle added successfully");
      fetchData();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add vehicle");
    }
  };

  const filteredVehicles = vehicles.filter((v) =>
    v.vehicle_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.vehicle_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.wing.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.unit.toString().includes(searchTerm)
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {isLoading && <Loader />}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Vehicle Management</h2>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <img src={plus} alt="" className="w-5 h-5" />
          Add Vehicle
        </button>
      </div>

      <div className="flex border-b mb-6 overflow-x-auto">
        <button
          className={`px-6 py-2 whitespace-nowrap ${activeTab === "my" ? "border-b-2 border-blue-500 text-blue-500 font-semibold" : "text-gray-500"}`}
          onClick={() => setActiveTab("my")}
        >
          My Vehicles ({activeTab === "my" ? vehicles.length : "-"})
        </button>
        <button
          className={`px-6 py-2 whitespace-nowrap ${activeTab === "wing" ? "border-b-2 border-blue-500 text-blue-500 font-semibold" : "text-gray-500"}`}
          onClick={() => setActiveTab("wing")}
        >
          My Wing/Unit ({activeTab === "wing" ? vehicles.length : "-"})
        </button>
        <button
          className={`px-6 py-2 whitespace-nowrap ${activeTab === "search" ? "border-b-2 border-blue-500 text-blue-500 font-semibold" : "text-gray-500"}`}
          onClick={() => setActiveTab("search")}
        >
          Search All Vehicles
        </button>
      </div>

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search by vehicle number, name, wing, unit..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={searchIcon} alt="" className="absolute left-3 top-2.5 w-5 h-5 opacity-50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <div key={vehicle._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full text-xl">
                    {vehicle.vehicle_type === "Two Wheeler" ? "🏍️" : "🚗"}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{vehicle.vehicle_name}</h4>
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                      {vehicle.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Number:</span>
                  <span className="font-semibold text-gray-800">{vehicle.vehicle_number}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-semibold text-gray-800">{vehicle.vehicle_type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Owner:</span>
                  <span className="font-semibold text-gray-800">{vehicle.owner_id?.Full_name || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-semibold text-gray-800">{vehicle.wing} - {vehicle.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span>Parking:</span>
                  <span className="font-semibold text-gray-800">{vehicle.parking_slot || "N/A"}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No vehicles found
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Add New Vehicle</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Vehicle Type *</label>
                  <select
                    name="vehicle_type"
                    required
                    className="w-full p-2 border rounded"
                    value={formData.vehicle_type}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Type</option>
                    <option value="Two Wheeler">Two Wheeler</option>
                    <option value="Four Wheeler">Four Wheeler</option>
                  </select>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Vehicle Name *</label>
                  <input
                    type="text"
                    name="vehicle_name"
                    required
                    className="w-full p-2 border rounded"
                    value={formData.vehicle_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Vehicle Number *</label>
                  <input
                    type="text"
                    name="vehicle_number"
                    required
                    placeholder="GJ01AB1234"
                    className="w-full p-2 border rounded"
                    value={formData.vehicle_number}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Parking Slot</label>
                  <input
                    type="text"
                    name="parking_slot"
                    placeholder="A-101"
                    className="w-full p-2 border rounded"
                    value={formData.parking_slot}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Notes</label>
                  <textarea
                    name="notes"
                    className="w-full p-2 border rounded"
                    rows="3"
                    value={formData.notes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
