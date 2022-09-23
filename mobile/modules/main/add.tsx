// withHooks

import { LibInput } from 'esoftplay/cache/lib/input/import';
import { LibTextstyle } from 'esoftplay/cache/lib/textstyle/import';
import React from 'react';
import { View } from 'react-native';


export interface MainAddArgs {

}
export interface MainAddProps {

}
export default function m(props: MainAddProps): any {
  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: 'white', borderRadius:28 }} >
      <LibTextstyle textStyle='largeTitle' text='Tambah' style={{ marginHorizontal: 16, marginBottom: 50 }} />
      <LibInput label='Nama' />
    </View>
  )
}