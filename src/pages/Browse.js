import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Gallery } from "../components";

import { fetchPhotos } from "../redux/actions/photos";

function Browse() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchPhotos()), [dispatch]);
  const items = useSelector(({ photos }) => photos.items);

  return <Gallery itemData={items} />;
}

export default Browse;
