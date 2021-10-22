import axios from "axios";

export const setLoaded = (payload) => ({
  type: "SET_LOADED",
  payload,
});

export const setPhotos = (items) => ({
  type: "SET_PHOTOS",
  payload: items,
});

export const fetchPhotos = () => (dispatch) => {
  console.log(`Fetching fotos`);
  dispatch(setLoaded(false));
  const url = `url`;
  axios.get(url).then(({ data }) => dispatch(setPizzas(data)));
};
