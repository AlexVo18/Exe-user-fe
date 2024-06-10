import requests from "../requests";

const Otp = {
  getOTP: (email: string) =>
    requests.baseApiPost(
      `/api/register/send-email-verification-code/?email=${email}`,
      null
    ),
  getOTPUsername: (username: string) =>
    requests.baseApiPost(
      `/api/register/send-email-otp-reset-password?username=${username}`,
      null
    ),
};
export default Otp;
