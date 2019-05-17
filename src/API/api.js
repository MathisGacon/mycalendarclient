import axios from "axios";

const APIURL = process.env.REACT_APP_SERVER_URL;

export const postEvent = eventInfos =>
  axios.post(APIURL + "/create-event", eventInfos);

export const postLongEvent = longEventInfos =>
  axios.post(APIURL + "/create-long-event", longEventInfos);

export const getEvents = q => axios.get(APIURL + "/my-events" + q);
export const getLongEvents = () => axios.get(APIURL + "/my-long-events");
