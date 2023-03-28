// withHooks

import * as Print from 'expo-print';
import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';


export interface PrintViewArgs {

}
export interface PrintViewProps {

}

export interface PrintTextJustify extends PrintViewProps {
  title: string
  value?: string
}

function TextJustify(props: PrintTextJustify) {
  return (
    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text allowFontScaling={false} style={{ fontFamily: "Ubuntu Mono", fontSize: 15, fontStyle: "normal", letterSpacing: 0, color: "#4b4b4b" }}>{props.title}</Text>
      {
        props.value &&
        <Text allowFontScaling={false} style={{ fontFamily: "Ubuntu Mono", fontSize: 15, fontStyle: "normal", letterSpacing: 0, color: "#4b4b4b" }}>{props.value}</Text>
      }
    </View>
  )
}

export interface PrintTextNormal {
  title: string
}

function TextNormal(props: PrintTextNormal) {
  return (
    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
      <Text allowFontScaling={false} style={{ fontFamily: "Ubuntu Mono", fontSize: 15, fontStyle: "normal", letterSpacing: 0, color: "#4b4b4b" }}>{props.title}</Text>
    </View>
  )
}

function Line() {
  return (
    <View style={{ marginVertical: 10, borderWidth: 0.5, borderStyle: 'dashed', backgroundColor: '#666', width: '100%' }} />
  )
}


export default function m(props: PrintViewProps): any {
  const items = new Array(6).fill('')

  useEffect(() => {
    setTimeout(() => {
      Print.printAsync({})
      // LibNavigation.back()
    }, 1000);
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <View style={{ margin: 15 }}>
          <TextNormal title='Outlet 1' />
          <TextNormal title='Kudus' />
          <TextNormal title='085848348760' />

          <Line />

          <TextJustify title='CASHIER' value='Muhammad Bagus' />
          <TextJustify title='28 Des 1523' value='17:14:11' />
          <TextJustify title='INVOICE' value='INV1234567' />

          <Line />
          <TextNormal title='ORDER DETAIL' />
          <Line />

          {
            items?.map((item: any, i: number) => {
              return (
                <View key={i}>
                  <TextJustify title={'Nasi Goreng ' + (i + 1)} />
                  <TextJustify title='1 x 10000' value='10.000' />
                </View>
              )
            })
          }

          <Line />
          <TextJustify title='SUBTOTAL' value='150.000' />
          <Line />
          <TextJustify title='TOTAL' value='150.000' />
          <Line />
          <TextJustify title='Cash' value='150.000' />
          <TextJustify title='Charge' value='50.000' />
          <Line />
          <TextNormal title='TERIMA KASIH' />
          <TextNormal title=' ' />
          

        </View>
      </ScrollView>
    </View>
  )
}