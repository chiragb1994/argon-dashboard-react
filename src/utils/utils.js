import {NotificationManager} from "react-notifications";
import config from "../config/config";

export const makeApiCall = (url, method, data, successCb = null) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));

  const requestOptions = {
    method: method,
    body: formData
  };
  fetch(url, requestOptions)
  .then(response => {
    // console.log(response);
    if (response.status >= 400) {
      if (response.body) {
        return response.json();
      }
      throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then(data => {
    // console.log(data);
    if (data && data.Response) {
      if (data.Response.status) {
        NotificationManager.success(data.Response.string_response);
        if (successCb) {
          successCb(data.Response);
        }
      }
      else {
        NotificationManager.error(data.Response.string_response);
      }
    }
    else {
      NotificationManager.error('Failure in api call');
    }
  })
  .catch(error => {
    console.log(error);
    NotificationManager.error(error.toString());
    this.setState({isSubmitClicked: false});
  });
};

export const isSuperUser = () => {
  return localStorage.getItem(config.accessTypeStorageKey) === config.superuserAccessKey;
};
