import api from "./Api";

// create new SecurityGuard
export const CreateSecurityGuard = async (data) => {
  const response = await api.post("/v2/security/addsecurity", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

// get all SecurityGuard
export const GetSecurityGuards = async () =>
  await api.get("/v2/security/viewguard");

// get single SecurityGuard by id
export const GetSecurityGuard = async (id) =>
  await api.get(`/v2/security/guard/${id}`);

// delete SecurityGuard by id
export const DeleteSecurityGuard = async (id) =>
  await api.delete(`/v2/security/guard/${id}`);

//update SecurityGuard by id
export const UpdateSecurityGuard = async (id, data) => {
  const response = await api.patch(`/v2/security/guard/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// visitor Logs

// get all Visitors
export const GetVisitors = async () => await api.get("/v2/visitor/viewvisitor");

// add visitor detail by security Guard
export const createVisitor = async (data) =>
  await api.post("/v2/visitor/addvisitor", data);

// filter visitor data
export const filterVisitor = async () => await api.get("/v2/visitor/filter");
