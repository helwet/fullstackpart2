import axios from "axios";
axios.defaults.validateStatus = (status) => {
  return status >= 200 && status < 500;
};

const baseUrl = "https://fhevm.sse.codesandbox.io/api/persons";
//const baseUrl = "https://part3server.herokuapp.com/api/persons";
const getAll = () =>
  axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
/*
const get = async () => {
  //console.log("getting shit");
  const reply = await axios.get(baseUrl);
  console.log("exists : " + JSON.stringify(reply.data.length));
  console.log(reply.status);
  return reply.data;
};
*/
const create = async (person) => {
  return await axios.post(baseUrl, person);
};

const update = async (id, person) => {
  return await axios.put(`${baseUrl}/${id}`, person);
};

const remove = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`);
};
export default {
  //  get,
  create,
  update,
  remove,
  getAll
};
