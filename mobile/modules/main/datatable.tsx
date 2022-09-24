// withHooks

import { useSafeState } from 'esoftplay';
import { LibIcon } from 'esoftplay/cache/lib/icon/import';
import { LibStyle } from 'esoftplay/cache/lib/style/import';
import { LibUtils } from 'esoftplay/cache/lib/utils/import';
import React from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';


export interface LibDatatableArgs {

}
export interface LibDatatableProps {

}


const datas = [
  {
    id: 1,
    nama: "Munawar Kholil",
    phone: "081234566789",
    age: 1234567
  },
  {
    id: 2,
    nama: "Munawar Masmun",
    phone: "081234566789",
    age: 1234567
  },
  {
    id: 3,
    nama: "Munawar Cholil",
    phone: "081234566789",
    age: 1234567
  },
  {
    id: 4,
    nama: "Munawar Aja",
    phone: "081234566789",
    age: 1234567
  },
  {
    id: 4,
    nama: "Munawar Aja",
    phone: "081234566789",
    age: 1234567
  },
  {
    id: 4,
    nama: "Munawar Aja",
    phone: "081234566789",
    age: 1234567
  },
  {
    id: 4,
    nama: "Munawar Aja",
    phone: "081234566789",
    age: 1234567
  },
  {
    id: 4,
    nama: "Munawar Aja",
    phone: "081234566789",
    age: 1234567
  },
  {
    id: 4,
    nama: "Munawar Aja",
    phone: "081234566789",
    age: 1234567
  },
  {
    id: 4,
    nama: "Munawar Aja",
    phone: "081234566789",
    age: 1234567
  }
]

export interface HeaderProps {
  title: string,
  numeric?: boolean,
  size?: number
}


const Header = {
  Text: (props: HeaderProps) => {
    const [sort, setSort] = useSafeState(0)
    return (
      <View style={{ borderWidth: 1, width: 70 * (props.size || 1), borderColor: "#a9a9a9", paddingHorizontal: 11, paddingVertical: 10, borderLeftWidth: 0, flexDirection: props.numeric ? 'row-reverse' : 'row', backgroundColor: '#efefef', justifyContent: 'flex-start', alignItems: 'center' }} onPress={() => { setSort(sort < 2 ? sort + 1 : 0) }} >
        <Text style={{ fontSize: 20, textAlign: props.numeric ? 'right' : 'left', textAlignVertical: 'center', fontWeight: 'bold', marginHorizontal: 5 }} >{props.title}</Text>
      </View>
    )
  },
  TextSortable: (props: HeaderProps) => {
    const [sort, setSort] = useSafeState(0)
    return (
      <Pressable style={{ borderWidth: 1, width: 70 * (props.size || 1), borderColor: "#a9a9a9", paddingHorizontal: 11, paddingVertical: 10, borderLeftWidth: 0, flexDirection: props.numeric ? 'row-reverse' : 'row', backgroundColor: '#efefef', justifyContent: 'flex-start', alignItems: 'center' }} onPress={() => { setSort(sort < 2 ? sort + 1 : 0) }} >
        <Text selectable={false} style={{ fontSize: 20, textDecorationLine: 'underline', textAlign: props.numeric ? 'right' : 'left', textAlignVertical: 'center', fontWeight: 'bold', marginHorizontal: 5 }} >{props.title}</Text>
        {
          sort == 1 ?
            <LibIcon.FontAwesome name={'sort-asc'} size={16} style={{ marginTop: 4 }} /> :
            sort == 2 ?
              <LibIcon.FontAwesome name={'sort-desc'} size={16} style={{ marginTop: 4 }} />
              : <LibIcon.FontAwesome name={'sort'} size={16} style={{ marginTop: 4, opacity: 0 }} />
        }
      </Pressable>
    )
  },
  Checkbox: (props: any) => {
    const [sort, setSort] = useSafeState(0)
    return (
      <Pressable style={{ borderWidth: 1, width: 70 * (props.size || 1), borderColor: "#a9a9a9", paddingHorizontal: 11, paddingVertical: 10, borderLeftWidth: 0, flexDirection: props.numeric ? 'row-reverse' : 'row', backgroundColor: '#efefef', justifyContent: 'flex-start', alignItems: 'center' }} onPress={() => { setSort(sort < 2 ? sort + 1 : 0) }} >
        <LibIcon name='checkbox-blank-outline' style={{ marginTop: 5 }} />
        <Text style={{ fontSize: 20, textAlign: props.numeric ? 'right' : 'left', textAlignVertical: 'center', fontWeight: 'bold', marginHorizontal: 5 }} >{props.title}</Text>
      </Pressable>
    )
  }
}

const Cell = {
  View: (props: any) => {
    return (
      <View style={{ borderWidth: 1, width: 70 * (props.size || 1), borderColor: "transparent", paddingHorizontal: 11, paddingVertical: 5, borderRightWidth: 1, borderRightColor: '#a9a9a9', flexDirection: 'row', justifyContent: props.numeric ? 'flex-end' : 'flex-start', alignItems: 'center' }} >
        {props.children}
      </View>
    )
  },
  Text: (props: any) => {
    return (
      <View style={{ borderWidth: 1, width: 70 * (props.size || 1), borderColor: "transparent", paddingHorizontal: 11, paddingVertical: 10, borderRightWidth: 1, borderRightColor: '#a9a9a9', flexDirection: 'row', justifyContent: props.numeric ? 'flex-end' : 'flex-start', alignItems: 'center' }} >
        <Text style={{ fontSize: 18, color: '#232323', textAlign: props.numeric ? 'right' : 'left', textAlignVertical: 'center', marginHorizontal: 5 }} >{props.numeric ? LibUtils.number(props.title) : props.title}</Text>
      </View>
    )
  },
  Button: (props: any) => {
    return (
      <View style={{ borderWidth: 1, width: 70 * (props.size || 1), borderColor: "transparent", paddingHorizontal: 11, paddingVertical: 5, borderRightWidth: 1, borderRightColor: '#a9a9a9', flexDirection: 'row', justifyContent: props.numeric ? 'flex-end' : 'flex-start', alignItems: 'center' }} >
        <Pressable style={{ padding: 6,  borderRadius: 5, backgroundColor: 'indigo', ...LibStyle.elevation(3) }} >
          <Text selectable={false } style={{ color: 'white', textAlign: 'center', fontWeight: "bold", paddingHorizontal: 10 }} >{props.title}</Text>
        </Pressable>
      </View>
    )
  },
  Input: (props: any) => {
    return (
      <View style={{ borderWidth: 1, width: 70 * (props.size || 1), borderColor: "transparent", paddingHorizontal: 11, paddingVertical: 5, borderRightWidth: 1, borderRightColor: '#a9a9a9', flexDirection: 'row', justifyContent: props.numeric ? 'flex-end' : 'flex-start', alignItems: 'center' }} >
        <TextInput placeholder={props.title.toString()} placeholderTextColor={"#aaa"} style={{ flex: 1, padding: 5, borderRadius: 10, borderWidth: 1, borderColor: '#a9a9a9', outlineWidth: 0 }} />
      </View>
    )
  },
  Checkbox: (props: any) => {
    return (
      <Pressable style={{ borderWidth: 1, width: 70 * (props.size || 1), borderColor: "transparent", paddingHorizontal: 11, paddingVertical: 5, borderRightWidth: 1, borderRightColor: '#a9a9a9', flexDirection: 'row', justifyContent: props.numeric ? 'flex-end' : 'flex-start', alignItems: 'center' }} >
        <LibIcon name='checkbox-blank-outline' style={{ marginTop: 5 }} />
        <Text style={{ fontSize: 18, color: '#232323', textAlign: props.numeric ? 'right' : 'left', textAlignVertical: 'center', marginHorizontal: 5 }} >{props.numeric ? LibUtils.number(props.title) : props.title}</Text>
      </Pressable>
    )
  }
}

const Footer = {
  Paginate: (props: any) => {
    return (
      <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginHorizontal: 16, marginVertical: 10, alignItems: 'center' }} >
        <Text style={{ marginRight: 10, color: '#555' }} >Page 1 of 6</Text>
        <Pressable style={{ borderRadius: 2, height: 40, width: 40, alignItems: 'center', justifyContent: 'center', marginLeft: 2 }} >
          <LibIcon name={'page-first'} />
        </Pressable>
        <Pressable style={{ borderRadius: 2, height: 40, width: 40, alignItems: 'center', justifyContent: 'center', marginLeft: 2 }} >
          <LibIcon name={'chevron-left'} />
        </Pressable>
        <Pressable style={{ borderRadius: 2, height: 40, width: 40, alignItems: 'center', justifyContent: 'center', marginLeft: 2 }} >
          <LibIcon name={'chevron-right'} />
        </Pressable>
        <Pressable style={{ borderRadius: 2, height: 40, width: 40, alignItems: 'center', justifyContent: 'center', marginLeft: 2 }} >
          <LibIcon name={'page-last'} />
        </Pressable>
      </View>
    )
  }
}

export default function m(props: LibDatatableProps): any {

  const [data, setData] = useSafeState(datas)

  return (
    <View style={{ flex: 1, paddingTop: LibStyle.STATUSBAR_HEIGHT + 20, backgroundColor: '#f6f6f6' }} >
      <ScrollView horizontal style={{ backgroundColor: 'white' }} >
        <View>
          <View style={{ flexDirection: 'row', overflow: 'hidden', borderLeftWidth: 1, borderColor: "#a9a9a9", marginHorizontal: 16 }} >
            <Header.TextSortable title={'ID'} numeric />
            <Header.TextSortable title={'Nama'} size={5} />
            <Header.Text title={'Handphone'} size={3} />
            <Header.Text title={'Button'} size={2} />
            <Header.Checkbox title={'Action'} size={2} />
          </View>
          <ScrollView>
            <View style={{ overflow: 'hidden', marginHorizontal: 16, borderLeftWidth: 1, borderColor: "#a9a9a9", borderBottomWidth: 1 }} >
              {
                data.map((row, idx) => {
                  const colors = idx % 2 != 0 ? '#f9f9ff' : "white"
                  return (
                    <View key={idx.toString()} style={{ flexDirection: 'row', backgroundColor: colors }} >
                      <Cell.Text title={idx + 1} numeric />
                      <Cell.Text title={row.nama} size={5} />
                      <Cell.Text title={row.phone} size={3} />
                      <Cell.Button title={row.age} size={2} />
                      <Cell.Checkbox title={"Update"} size={2} />
                    </View>
                  )
                })
              }
            </View>
            <Footer.Paginate />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}