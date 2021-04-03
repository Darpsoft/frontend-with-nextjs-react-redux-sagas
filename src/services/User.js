import { storage } from "../pages/_app";

export class UserServices {
  constructor() {}

  async getBookins() {
    const store = storage.getState();
    console.log("🚀 ~ file: User.js ~ line 10 ~ UserServices ~ getBookins ~ storage", store);
    try {
      const url = `${process.env.NEXT_PUBLIC_URL_API}/rest/user/${auth.dataUser.email}/bookings?current=true`;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
