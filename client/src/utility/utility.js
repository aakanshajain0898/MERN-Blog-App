import M from 'materialize-css';

export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

export const uploadPic = (image) => {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', 'insta-clone');
  data.append('cloud_name', 'aakansha');
  return new Promise((resolve, reject) => {
    fetch('https://api.cloudinary.com/v1_1/aakansha/image/upload', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resolve(data.url);
      })
      .catch((err) => reject(err));
  });
};

export const fetchData = (url) =>
  new Promise((resolve, reject) => {
    fetch(url, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((err) => reject(err));
  });

export const postData = (url, data, headers = {}) =>
  new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((err) => reject(err));
  });

export const updateData = (url, data) =>
  new Promise((resolve, reject) => {
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((err) => reject(err));
  });

export const deleteData = (url) =>
  new Promise((resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((err) => reject(err));
  });

export const showToast = (data) => {
  if (data.error) {
    M.toast({ html: data.error, classes: '#c62828 red darken-3' });
  } else {
    M.toast({ html: data.message, classes: '#43a047 green darken-1' });
  }
};
