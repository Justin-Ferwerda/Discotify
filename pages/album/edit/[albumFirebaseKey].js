import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleAlbum } from '../../../api/albumData';
import AlbumForm from '../../../components/forms/AlbumForm';

export default function EditAlbum() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { albumFirebaseKey } = router.query;

  useEffect(() => {
    getSingleAlbum(albumFirebaseKey).then(setEditItem);
  }, [albumFirebaseKey, editItem]);

  return (<AlbumForm obj={editItem} />);
}
