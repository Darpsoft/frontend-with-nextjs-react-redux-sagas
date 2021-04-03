import request, { getOptions } from "@utils/request";
import { getOrCreateStore } from "@utils/with-redux-store";
export class UserServices {
  constructor() {
    this.storage = getOrCreateStore().getState();
    this.URL_API = `${process.env.NEXT_PUBLIC_URL_API}/rest/user`;
  }

  async getBookins() {
    const email = "contacto@tuten.cl";
    try {
      const { auth } = this.storage;
      const url = `${this.URL_API}/${email}/bookings?current=true`;
      const options = getOptions("GET", { Adminemail: "testapis@tuten.cl" });
      return request(url, options);
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
