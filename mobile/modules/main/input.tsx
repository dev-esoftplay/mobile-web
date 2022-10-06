// withHooks

import { LibInput } from 'esoftplay/cache/lib/input/import';
import { LibStyle } from 'esoftplay/cache/lib/style/import';
import { LibTextstyle } from 'esoftplay/cache/lib/textstyle/import';
import { LibToastProperty } from 'esoftplay/cache/lib/toast/import';
import React, { useRef } from 'react';
import { Pressable, View } from 'react-native';


export interface MainInputArgs {

}
export interface MainInputProps {
  onSave: (title: string, variant: any[]) => void
  defaultValue: any
}
export default function m(props: MainInputProps): any {
  const variantRef = useRef<LibInput>(null)
  const titleRef = useRef<LibInput>(null)

  return (
    <View>
      <LibTextstyle textStyle='largeTitle' text='Combinator' style={{ margin: 16 }} />
      <LibInput
        ref={titleRef}
        label='Name'
        defaultValue={props?.defaultValue?.title}
        autoCapitalize='characters'
      />
      <LibInput
        ref={variantRef}
        label={'Variant (Pisahkan dengan enter)'}
        multiline
        defaultValue={props?.defaultValue?.variant?.join('\n')}
        style={{ height: 200 }}
      />
      <Pressable
        onPress={() => {
          if (!titleRef.current?.getText()) {
            LibToastProperty.show("Title tidak boleh kosong")
            return
          }
          if (!variantRef.current?.getText()) {
            LibToastProperty.show("Variant tidak boleh kosong")
            return
          }
          props.onSave(titleRef?.current?.getText(), variantRef.current?.getText().split('\n'))
        }}
        style={[{ backgroundColor: 'green', height: 34, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginHorizontal: 16, padding: 20 }, LibStyle.elevation(4)]} >
        <LibTextstyle textStyle='m_button' text='Save' style={{ color: 'white' }} />
      </Pressable>
    </View>
  )
}