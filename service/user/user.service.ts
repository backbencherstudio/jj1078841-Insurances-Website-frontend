import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../lib/Fetch";
import nookies from "nookies";
 
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
 
type profile = {
  full_name: string
  email: string
  phone_number: string
  date_of_birth: string
  country: string
  state: string
  city: string
  address: string
  zip_code: string
  password: string
  confirm_password: string
  avatar: string
}
 
export const UserService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const data = {
      email: email,
      password: password,
    };
    return await Fetch.post("/auth/login", data, config);
  },
 
  register: async ({
    first_name,
    last_name,
    phone_number,
    email,
    password,
  }: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
  }) => {
    const data = {
      first_name,
      last_name,
      phone_number,
      email,
      password,
    };
    return await Fetch.post("/auth/register", data, config);
  },
 
  logout: (context = null) => {
    CookieHelper.destroy({ key: "token", context });
  },
  // get user details
  getUserDetails: async (context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });
    // const token = nookies.get(null).token;
    // const userToken = token;
 
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
 
    return await Fetch.get(`/auth/me`, _config);
  },
 
 
  updateProfile: async (data: FormData, context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });
 
    const _config = {
      headers: {
        // Let Axios/browser set the correct multipart boundary automatically
        Authorization: "Bearer " + userToken,
      },
    };
    return await Fetch.patch(`/dashboard/user-profile`, data, _config);
  },

  verifyEmail: async({token, email},context=null)=>{
    const userToken = CookieHelper.get({ key: "token", context });
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
    return await Fetch.post("/auth/verify-email", {token:token,email:email}, config);
  },
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  findAll: async (context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });
 
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
 
    return await Fetch.get(`/user`, _config);
  },
 
  findOne: async (id: number, context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });
 
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
 
    return await Fetch.get(`/user/${id}`, _config);
  },
 
  findOneByUsername: async ({
    username,
    token = "",
    context = null,
  }: {
    username: string;
    token?: string;
    context?: any;
  }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
    const userToken = token || CookieHelper.get({ key: "token", context });
 
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
 
    return await Fetch.get(`/user/profile/${username}`, _config);
  },
 
  update: async (
    {
      fname,
      lname,
      date_of_birth,
      city,
      country,
      organization,
      recipient_name,
      recipient_zip_code,
      recipient_country,
      recipient_state,
      recipient_city,
      recipient_address,
      recipient_phone_number,
    }: {
      fname: string;
      lname: string;
      date_of_birth: string;
      city: string;
      country: string;
      organization: string;
      recipient_name: string;
      recipient_zip_code: string;
      recipient_country: string;
      recipient_state: string;
      recipient_city: string;
      recipient_address: string;
      recipient_phone_number: string;
    },
    context = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });
 
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
 
    const data = {
      fname: fname,
      lname: lname,
      date_of_birth: date_of_birth,
      city: city,
      country: country,
      organization: organization,
      recipient_name: recipient_name,
      recipient_zip_code: recipient_zip_code,
      recipient_country: recipient_country,
      recipient_state: recipient_state,
      recipient_city: recipient_city,
      recipient_address: recipient_address,
      recipient_phone_number: recipient_phone_number,
    };
 
    return await Fetch.patch(`/user`, data, _config);
  },
 
  updateAvatar: async (data: any, context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });
 
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
        "content-type": "multipart/form-data",
      },
    };
 
    return await Fetch.patch(`/user/avatar`, data, _config);
  },
 
  //
  create: async (
    {
      fname,
      lname,
      username,
      email,
      role_id,
    }: {
      fname: string;
      lname: string;
      username: string;
      email: string;
      role_id: number;
    },
    context: any = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });
 
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
    const data = {
      fname: fname,
      lname: lname,
      username: username,
      email: email,
      role_id: role_id,
    };
 
    return await Fetch.post(`/user`, data, _config);
  },
 
  // TODO
  confirm: async (
    {
      id,
      token,
      email,
      password,
    }: { id: number; token: string; email: string; password: string },
    context: any = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });
 
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
 
    const data = {
      id: id,
      token: token,
      email: email,
      password: password,
    };
 
    return await Fetch.patch(`/user/${id}/password`, data, _config);
  },
};