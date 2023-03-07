
import Axios from 'axios';



const tesloApi = Axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

tesloApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {

    // const message =
    //   error.response?.data?.message || error.message;
    // notificationsStore.getState().showNotification({
    //   type: 'error',
    //   title: 'Error',
    //   duration: 5000,
    //   message,
    // });

    return Promise.reject(error);
  }
);



export default tesloApi;


