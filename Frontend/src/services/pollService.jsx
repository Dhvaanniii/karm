import api from "./Api";

// create new poll
export const CreateNewPoll = async (data) =>
  await api.post("/v2/poll/createpoll", data);

// get all polls
export const GetPolls = async () => await api.get("/v2/poll/getpoll");

// poll voting count
export const PollVoting = async (data) =>
  await api.post("/v2/poll/polls/vote", data);
