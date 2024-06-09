import requests from "../requests";

const Otp = {
  getOTP: (email: string) =>
    requests.baseApiPost(
      `/api/register/send-email-verification-code/?email=${email}`,
      null
    ),
};
export default Otp;
