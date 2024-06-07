import { jwtDecode } from "jwt-decode";

export function decodeOtp(jwt: string) {
  const decodeJWT = jwtDecode(jwt) as { OTP: string };
  return decodeJWT.OTP;
}
