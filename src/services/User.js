import { getOrCreateStore } from "@utils/with-redux-store";
export class UserServices {
  constructor() {}

  async getBookins() {
    const store = getOrCreateStore().getState();
    try {
      const url = `${process.env.NEXT_PUBLIC_URL_API}/rest/user/${auth.dataUser.email}/bookings?current=true`;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
