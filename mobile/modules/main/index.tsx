// withHooks

import { useSafeState } from 'esoftplay';
import { LibIcon } from 'esoftplay/cache/lib/icon/import';
import { LibNavigation } from 'esoftplay/cache/lib/navigation/import';
import { LibObject } from 'esoftplay/cache/lib/object/import';
import { LibSlidingup } from 'esoftplay/cache/lib/slidingup/import';
import { LibStyle } from 'esoftplay/cache/lib/style/import';
import { LibTextstyle } from 'esoftplay/cache/lib/textstyle/import';
import { MainDatatable } from 'esoftplay/cache/main/datatable/import';
import { MainInput } from 'esoftplay/cache/main/input/import';
import useGlobalState from 'esoftplay/global';
import React, { useEffect, useRef } from 'react';
import { FlatList, Pressable, View } from 'react-native';


export interface MainIndexArgs {

}
export interface MainIndexProps {

}

const state = useGlobalState<any[]>([], { persistKey: 'main/index' })
const selected = useGlobalState<any>(undefined)
function combine(options: any, optionIndex = 0, results: any[] = [], current: any = {}) {
  let allKeys = Object.keys(options);
  let optionKey = allKeys[optionIndex];
  let vals = options[optionKey];
  // console.log('optionKey', optionKey, vals);
  if (vals)
    for (let i = 0; i < vals.length; i++) {
      current[optionKey] = vals[i];
      if (optionIndex + 1 < allKeys.length) {
        combine(options, optionIndex + 1, results, current);
      } else {
        let res = JSON.parse(JSON.stringify(current));
        results.push(res);
      }
    }
  return results;
}
export default function m(props: MainIndexProps): any {
  const [user, setUsers] = useSafeState([])
  const slidingRef = useRef<LibSlidingup>(null)
  const [selectedData] = selected.useState()
  const [data, setData] = state.useState()
  const [datatable, setDatatable] = useSafeState<any[]>([]);
  const [headers, setHeaders] = useSafeState([]);

  useEffect(() => {
    let obj: any = {}
    let title: any = []
    data.forEach((item) => {
      obj[item.title] = item.variant
      title.push(item.title)
    })
    setDatatable(combine(obj))
    setHeaders(title)
  }, [data])

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }} >
      <View style={{ flexDirection: 'row' }} >
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={() => {
                  selected.reset()
                  selected.set({ ...item, index })
                  console.log(selected.get())
                  slidingRef.current?.show()
                }}
                style={{ marginHorizontal: 16, flexDirection: 'row', borderWidth: 2, paddingHorizontal: 10, paddingTop: 10, paddingBottom: 8, marginVertical: 8, borderRadius: 5, backgroundColor: 'white', ...LibStyle.elevation(2) }} >
                <View style={{ flex: 1 }} >
                  <LibTextstyle textStyle='m_h5' text={item.title} />
                  <LibTextstyle textStyle='m_caption' text={JSON.stringify(item.variant)} />
                </View>
                <Pressable onPress={() => {
                  let x = LibObject.splice(state.get(), index, 1)()
                  state.set(x)
                }} >
                  <LibIcon name='close' />
                </Pressable>
              </Pressable>
            )
          }}
        />
      </View>
      <View style={{ flex: 1 }} >
        {
          data.length > 0 &&
          <MainDatatable headers={headers} data={datatable} />
        }
      </View>
      <View>
        <Pressable
          onPress={() => {
            LibNavigation.push('main/print')
            // selected.reset()
            // slidingRef?.current?.show()
          }}
          style={{ backgroundColor: '#2DA44E', height: 30, borderRadius: 5, minWidth: Math.min(600, LibStyle.width - 30), alignSelf: 'center', marginVertical: 40, marginHorizontal: 16, alignItems: 'center', justifyContent: 'center', padding: 20, ...LibStyle.elevation(4) }} >
          <LibTextstyle text='Add' textStyle='m_button' style={{ color: 'white' }} />
        </Pressable>
      </View>
      <LibSlidingup ref={slidingRef} >
        <View style={{ alignItems: 'center' }} >
          <View style={{ minWidth: Math.min(LibStyle.width, 600), backgroundColor: 'white', paddingVertical: 20, borderRadius: 10 }} >
            <MainInput defaultValue={selectedData} onSave={(title, variant) => {
              let x
              if (!selectedData) {
                x = LibObject.push(state.get(), { title: title, variant: variant })()
              } else {
                x = LibObject.set(state.get(), { title: title, variant: variant })(selectedData.index)
              }
              state.set(x)
              slidingRef.current?.hide()
            }} />
          </View>
        </View>
      </LibSlidingup>
    </View>
  )
}
