import { Route, Routes } from "react-router";
import Pokemon from "../pages/Pokemon";

export default function PageRouter() {
    return (
        <Routes>
            <Route path="/" element={<Pokemon />} />
        </Routes>
    );
}