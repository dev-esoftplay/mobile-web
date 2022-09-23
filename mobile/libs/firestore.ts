import _global from 'esoftplay/_global';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';


const Firestore = {
  init() {
    _global.firebaseApp = initializeApp({
      "apiKey": "AIzaSyB04JT4JJfFsArIccAjBEn1nwIlg8EVWx4",
      "authDomain": "bigbang-online.firebaseapp.com",
      "databaseURL": "https://bigbang-online.firebaseio.com/",
      "storageBucket": "gs://bigbang-online.appspot.com/",
      "projectId": "bigbang-online"
    })
  },
  db() {
    if (!_global.firebaseFirestore)
      _global.firebaseFirestore = getFirestore(_global.firebaseApp)
    return _global.firebaseFirestore
  },
  add: {
    doc() {

    },
    collection() {

    }
  },
  get: {
    doc() {

    },
    collection(path: string, cb: (arr: any[]) => void) {
      const colRef = collection(Firestore.db(), path)
      let datas: any[] = []
      getDocs(colRef).then((snap) => {
        snap.docs.forEach((doc) => {
          datas.push({ data: doc.data(), id: doc.id })
        })
        cb(datas)
      })
    }
  },
  listen: {
    collection() {

    },
    doc() {

    }
  },
  update: {
    collection() {

    },
    doc() {

    }
  },
  query() {

  },
  paginate() {

  }
}

export default Firestore