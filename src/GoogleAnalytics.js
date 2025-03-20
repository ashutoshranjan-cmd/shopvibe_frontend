import ReactGA from "react-ga4";

const TRACKING_ID = "G-EZJ4E111FT"; // Your Google Analytics tracking ID

export const initGA = () => {
  ReactGA.initialize(TRACKING_ID);
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};
