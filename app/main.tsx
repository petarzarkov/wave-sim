import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "@toplo/components";
import { TbWaveSine } from "react-icons/tb";

import App from "./App";
import "./index.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<React.StrictMode>
    <HashRouter>
        <ThemeProvider
            routes={{
                "/": {
                    name: "WaveSim",
                    icon: TbWaveSine
                }
            }}
            footer={{
                gitHubLink: "https://github.com/petarzarkov/wave-sim"
            }}
        >
            <App />
        </ThemeProvider>
    </HashRouter>
</React.StrictMode>,
);
