// withHooks

import { useSafeState } from 'esoftplay';
import { MainDatatable } from 'esoftplay/cache/main/datatable/import';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Firestore from '../../libs/firestore';

export interface MainIndexArgs {

}
export interface MainIndexProps {

}

export default function m(props: MainIndexProps): any {
  const [user, setUsers] = useSafeState([])

  useEffect(() => {
    (async () => {
      Firestore.init()
      Firestore.db()
      Firestore.get.collection('users', (list) => {
        console.log(list)
      })
    })()

  }, [])


  return (
    <View style={{ flex: 1, backgroundColor: '#ccc'}} >
      <MainDatatable />
    </View>
  )
}