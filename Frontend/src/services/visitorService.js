import Api from "./Api";

export const AddVisitor = async (data) => {
    return await Api.post("/v2/visitor/addvisitor", data);
}

export const UploadPhoto = async (data) => {
    return await Api.post("/v2/visitor/uploadphoto", data, {
        headers: {
            "Content-Type": undefined,
        },
    });
}
export const GetVisitors = async () => {
    return await Api.get("/v2/visitor/viewvisitor");
}

export const FilterVisitors = async (timePeriod) => {
    return await Api.get(`/v2/visitor/filter?timePeriod=${timePeriod}`);
}

export const ApproveVisitor = async (data) => {
    return await Api.post("/v2/visitor/approvevisitor", data);
}
