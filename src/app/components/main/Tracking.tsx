import { AuthContext } from "@/app/contexts/AuthContext";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const Tracking = () => {
  const { userInfo } = useContext(AuthContext);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("admin")) {
      // Send pageview event
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }

    // Send user or guest event
    if (userInfo && userInfo.accountID) {
      ReactGA.set({ userId: userInfo.accountID });
      ReactGA.event({
        category: "User",
        action: "Logged in User",
        label: `User ID: ${userInfo.accountID}`,
        value: 1,
      });
    } else {
      ReactGA.event({
        category: "Guest",
        action: "Visiting",
        label: "Guest User",
        value: 1,
      });
    }
  }, [userInfo]);
  return null;
};

export default Tracking;
