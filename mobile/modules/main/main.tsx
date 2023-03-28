// withHooks

import React, { useEffect } from 'react';
import { Pressable } from 'react-native';

import { Printer, render, Text } from 'react-thermal-printer';

export interface MainMainArgs {

}
export interface MainMainProps {

}

export default function m(props: MainMainProps): any {

  useEffect(() => {
    // (async () => {
    //   const data = await render(
    //     <Printer type="epson">
    //       <Text>Hello World</Text>
    //     </Printer>
    //   );

    //   console.log(await window.navigator.serial.requestPort)

    // window.navigator.serial.requestPort().then((port) => { 
    //   console.log("2")
    //   port.open({ baudRate: 9600 }).then(()=>{
    //     console.log("1")
    //   })

    // }).catch((x) => console.log(x))

    //   const writer = port.writable?.getWriter();
    //   if (writer != null) {
    //     await writer.write(data);
    //     writer.releaseLock();
    //   }
    // })();
  }, [])

  async function start() {
    // Prompt user to select any serial port.
    const data = await render(
      <Printer type="epson">
        <Text>Hello World</Text>
      </Printer>
    );
    
    const port = await window.navigator.serial.requestPort({usbVendorId:"RS"});
    await port.open({ baudRate: 9600 });
    
    const writer = port.writable?.getWriter();
    if (writer != null) {
      await writer.write(data);
      writer.releaseLock();
    }
  }

  if ("serial" in navigator) {
    alert("Your browser supports Web Serial API!");
  }
  else {
    alert("Your browser does not support Web Serial API, the latest version of Google Chrome is recommended!");
  };

  return (
    <Pressable onPress={start} >
      <Text>SSS</Text>
    </Pressable>
  )
}