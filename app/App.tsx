import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout, NotFound } from "@toplo/components";
import { Wave } from "@screens";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Wave />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
