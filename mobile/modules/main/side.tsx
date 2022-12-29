// withHooks

import React from 'react';
import { Dimensions, View } from 'react-native';


export interface MainSideArgs {

}
export interface MainSideProps {
  children: any
}

export function getSideWidth(): number {
  return Dimensions.get('window').width > 800 ? 450 : 0
}

export default function m(props: MainSideProps): any {
  return (
    /* SIDEBAR */
    <View style={{ flex: 1, flexDirection: 'row' }} >
      <View style={{ width: getSideWidth(), backgroundColor: 'orange', height: '100%' }} >

      </View>
      {props.children}
    </View>
  )
}