import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { setAxiosDefaultBaseUrl } from "auth/utils.ts";
import "react-datepicker/dist/react-datepicker.css";

setAxiosDefaultBaseUrl();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
