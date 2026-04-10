import api from "./Api";
// for owner

// create new Owner
export const CreateOwner = async (data) => {
  const response = await api.post("/v2/resident/addowner", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// get all Owner
export const GetOwners = async () => await api.get("/v2/resident/viewowner");

// get single Owner by id
export const GetOwner = async (id) => await api.get(`/v2/resident/Owner/${id}`);

//update Owner by id
export const UpdateOwner = async (id, data) => {
  const response = await api.patch(`/v2/resident/Owner/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

//update Tenant by id
export const UpdateTenant = async (id, data) => {
  const response = await api.put(`/v2/resident/tenante/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// for tenant

// create new Tenant
export const CreateTenant = async (data) => {
  const response = await api.post("/v2/resident/addtenante", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// get all Tenant
export const GetTenants = async () => await api.get("/v2/resident/viewtenante");

// get single Tenant by id
export const GetTenant = async (id) =>
  await api.get(`/v2/resident/tenante/${id}`);

// get all resident
export const GetResidents = async () =>
  await api.get("/v2/resident/allresident");

// get resident by id
export const GetResident = async (id) =>
  await api.get(`/v2/resident/resident/${id}`);

// delete resident by id
export const VacantResident = async (id) =>
  await api.put(`v2/resident/update/${id}`, {});
