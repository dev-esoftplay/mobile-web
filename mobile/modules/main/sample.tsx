// withHooks

import { useSafeState } from 'esoftplay';
import { LibInput } from 'esoftplay/cache/lib/input/import';
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';

export interface MainSampleArgs {

}
export interface MainSampleProps {

}
export default function m(props: MainSampleProps): any {
  const _name = useRef<LibInput>(null)
  const [user, setUser] = useSafeState(undefined);
  const _phone = useRef<LibInput>(null);

  useEffect(() => {
    _name.current?.getText()
  }, [])

  return (
    <View style={{ backgroundColor: 'orange', flex: 1 }} >
      <LibInput
        base
        ref={_name}
        label={''}
      />
      <LibInput
        ref={_phone}
        label={'user'}
      />
    </View>
  )
}