import React, { useEffect, useState } from "react";
import { getAllVehicles, deleteVehicle, addVehicle, updateVehicle } from "../services/vehicleService";
import { GetResidents } from "../services/ownerTenantService";
import { toast } from "react-hot-toast";
import plus from "../assets/images/plus.svg";
import edit from "../assets/images/edit.svg";
import trash from "../assets/images/trash.svg";
import searchIcon from "../assets/images/search.svg";
import { Loader } from "../utils/Loader";

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [residents, setResidents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formData, setFormData] = useState({
    vehicle_type: "",
    vehicle_name: "",
    vehicle_number: "",
    owner_id: "",
    wing: "",
    unit: "",
    parking_slot: "",
    notes: "",
  });

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

  const fetchResidents = async () => {
    try {
      const response = await GetResidents();
      setResidents(response.data.Residents);
    } catch (error) {
      console.error("Error fetching residents:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
    fetchResidents();
  }, []);

  const handleOpenModal = (vehicle = null) => {
    if (vehicle) {
      setIsEditMode(true);
      setSelectedVehicle(vehicle);
      setFormData({
        vehicle_type: vehicle.vehicle_type,
        vehicle_name: vehicle.vehicle_name,
        vehicle_number: vehicle.vehicle_number,
        owner_id: vehicle.owner_id?._id || "",
        wing: vehicle.wing,
        unit: vehicle.unit,
        parking_slot: vehicle.parking_slot || "",
        notes: vehicle.notes || "",
      });
    } else {
      setIsEditMode(false);
      setFormData({
        vehicle_type: "",
        vehicle_name: "",
        vehicle_number: "",
        owner_id: "",
        wing: "",
        unit: "",
        parking_slot: "",
        notes: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-fill wing and unit if owner is selected
    if (name === "owner_id") {
      const selectedOwner = residents.find((r) => r._id === value);
      if (selectedOwner) {
        setFormData((prev) => ({
          ...prev,
          owner_id: value,
          wing: selectedOwner.Wing,
          unit: selectedOwner.Unit,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateVehicle(selectedVehicle._id, formData);
        toast.success("Vehicle updated successfully");
      } else {
        await addVehicle(formData);
        toast.success("Vehicle added successfully");
      }
      fetchVehicles();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await deleteVehicle(id);
        toast.success("Vehicle deleted successfully");
        fetchVehicles();
      } catch (error) {
        toast.error("Failed to delete vehicle");
      }
    }
  };

  const filteredVehicles = vehicles.filter((v) =>
    v.vehicle_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.wing.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.unit.toString().includes(searchTerm)
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {isLoading && <Loader />}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Vehicle Management</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <img src={plus} alt="" className="w-5 h-5" />
          Add Vehicle
        </button>
      </div>

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search by vehicle number, wing, unit..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={searchIcon} alt="" className="absolute left-3 top-2.5 w-5 h-5 opacity-50" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3">Vehicle</th>
              <th className="p-3">Owner</th>
              <th className="p-3">Location</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle) => (
              <tr key={vehicle._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      {vehicle.vehicle_type === "Two Wheeler" ? "🏍️" : "🚗"}
                    </div>
                    <div>
                      <div className="font-semibold">{vehicle.vehicle_name}</div>
                      <div className="text-sm text-gray-500">{vehicle.vehicle_number}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div>{vehicle.owner_id?.Full_name || "Unknown"}</div>
                  <div className="text-xs text-gray-400">{vehicle.owner_id?.Resident_status || "Resident"}</div>
                </td>
                <td className="p-3">
                  <div>{vehicle.wing} - {vehicle.unit}</div>
                  <div className="text-xs text-gray-400">Slot: {vehicle.parking_slot || "N/A"}</div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${vehicle.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {vehicle.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenModal(vehicle)} className="p-1 hover:bg-gray-200 rounded">
                      <img src={edit} alt="Edit" className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(vehicle._id)} className="p-1 hover:bg-red-100 rounded">
                      <img src={trash} alt="Delete" className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">{isEditMode ? "Edit Vehicle" : "Add New Vehicle"}</h3>
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
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Vehicle Number *</label>
                  <input
                    type="text"
                    name="vehicle_number"
                    required
                    className="w-full p-2 border rounded"
                    value={formData.vehicle_number}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Owner *</label>
                  <select
                    name="owner_id"
                    required
                    className="w-full p-2 border rounded"
                    value={formData.owner_id}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Owner</option>
                    {residents.map((r) => (
                      <option key={r._id} value={r._id}>
                        {r.Full_name} ({r.Wing}-{r.Unit})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Wing</label>
                  <input
                    type="text"
                    name="wing"
                    readOnly
                    className="w-full p-2 border rounded bg-gray-50"
                    value={formData.wing}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Unit</label>
                  <input
                    type="text"
                    name="unit"
                    readOnly
                    className="w-full p-2 border rounded bg-gray-50"
                    value={formData.unit}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Parking Slot</label>
                  <input
                    type="text"
                    name="parking_slot"
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
                  {isEditMode ? "Update Vehicle" : "Add Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
