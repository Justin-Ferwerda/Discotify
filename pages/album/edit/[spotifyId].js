import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import { getAlbum, spotify } from '../../../api/spotifyData';
import AlbumForm from '../../../components/forms/AlbumForm';

export default function EditPlayer() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { spotifyId } = router.query;

  const date = () => {
    const d = new Date();
    const dateValue = d.toLocaleString();
    return dateValue;
  };

  const getAlbumInfo = async () => {
    const token = await spotify();
    getAlbum(token, spotifyId).then((response) => {
      const object = {
        artistName: response.artists[0].name,
        albumName: response.name,
        release_date: response.release_date,
        recordImage: response.images[1].url,
        spotifyId,
        trackList: response.tracks.items,
        creatorName: user.displayName,
        creatorImage: user.photoURL,
        spins: 0,
        date: date(),
      };
      console.warn(object);
      setEditItem(object);
    });
  };

  useEffect(() => {
    getAlbumInfo();
  });

  return (<AlbumForm obj={editItem} />);
}
