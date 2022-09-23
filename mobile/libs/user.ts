
export interface UserData {

}

export default {
   create<T>(user: T | UserData) {

   },
   delete(user: string) {

   },
   update: {
      password(oldPwd: string, newPwd: string) {

      },
      email(oldEmail: string, newEmail: string) {

      },
      data<T>(user: T | UserData) {

      }
   }
}