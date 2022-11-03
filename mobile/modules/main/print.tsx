// withHooks

import { useSafeState } from 'esoftplay';
import { LibIcon } from 'esoftplay/cache/lib/icon/import';
import * as Print from 'expo-print';
import React, { useEffect } from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';


export interface PrintArgs {

}
export interface PrintProps {

}

export default function m(props: PrintProps): any {
  const [show, setShow] = useSafeState(0)

  useEffect(() => {
    if (show == 0) {
      setTimeout(() => {
        Print.printAsync({})
        setShow(1)
      }, 500);
    }
  }, [show])

  return (
    <View style={{ flex: 1 }}>
      <RenderIf show={show == 1} >
        <Pressable style={{ margin: 16, position: 'absolute', top: 20, right: 20, width: '20mm', height: '20mm', backgroundColor: 'orange', borderRadius: '10mm', padding: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => { setShow(0) }} >
          <LibIcon name='printer' color='white' size={'10mm'} />
        </Pressable>
      </RenderIf>
      <PrintA5 />
      <PrintA5 />
      <PrintA5 />
      <PrintA5 />
      <PrintA5 />
      <PrintA5 />
      <PrintA5 />
      <PrintA5 />
      <PrintA5 />
      <PrintA5 />
    </View>
  )
}

function RenderIf(props: any): any {
  if (props.show) {
    return props.children
  }
  return null
}

function PrintA5() {
  return (
    <ImageBackground source={{ uri: 'httpss://bbo.co.id/images/modules/bigbang/event/197/ticket/62fb1154ba827.png' }} style={{ width: '148mm', height: '209.8mm' }} >
      <View style={{ position: 'absolute', top: '32.5mm', left: '12mm', right: '12mm', height: '51mm', padding: '1mm', }} >
        <View style={{ flex: 1, flexDirection: 'row' }} >
          <View style={{ width: '79mm', paddingRight: '2mm' }} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
              <Text>Tiket Onsite</Text>
              <Text>IDR 20.000</Text>
            </View>
            <Text style={{ fontSize: 20, marginVertical: '1mm', fontWeight: '500' }} >LAMPUNG FAIR</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
              <Text>1 November 2022</Text>
              <Text>10:00 - 11:00</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
              <Text style={{ fontSize: 25, marginVertical: '1mm', fontWeight: '500', textAlign: 'center' }} >Tiket Onsite</Text>
            </View>
            <Text style={{ fontSize: 13, color:'#666' }} >*Tiket untuk masuk ke dalam area pameran dan konser.</Text>
          </View>
          <View style={{ marginLeft: '4mm', flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <QRCode value="1234567890" size={100} />
            <Text style={{ marginTop: 10, fontSize: 12, fontWeight: '500' }} >SMAHDUYIHAJKIK</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}