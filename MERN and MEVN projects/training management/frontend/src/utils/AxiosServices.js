import { axInstance } from "hooks/useAxios";

const AxiosServices = {
  get: async function (url, parameter = {}) {
    return axInstance.get(url, {
      params: parameter,
    });
  },
  post: async function (url, body) {
    return axInstance.post(url, body, {
    });
  },
  update: async function (url, body, parameter = {}) {
    return axInstance.patch(url, body, {
      params: parameter,
    });
  },
  delete: async function (url, parameter = {}) {
    return axInstance.delete(url, {
      params: parameter,
    });
  }
};

export default AxiosServices;
