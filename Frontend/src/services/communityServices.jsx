import api from "./Api";

// ask question
export const AddNewQuestion = async (data) =>
  await api.post("/v2/question/createquestion", data);

// get all question list
export const GetQuestionList = async () =>
  await api.get("/v2/question/questions");

// post answer
export const PostAnswer = async (id, data) =>
  await api.post(`/v2/question/questions/${id}/answers`, data);

// get answer by question id
export const GetQuestionAnswers = async () => await api.get("/");
