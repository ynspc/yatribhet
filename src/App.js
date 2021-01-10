import React from "react";
import { ThemeProvider } from "@material-ui/core";
import "tailwindcss/tailwind.css"

import Csv from './components/testing/Csv';
import PlaceImageUpload from "./components/testing/PlaceImageUpload";

export default function App() {
    return (
        <ThemeProvider >
            <section className="flex justify-center">
                <div className="w-1/2">
                    <div className="text-center">
                        <div className="my-4 font-bold">
                            Trip Advisor
                        </div>
                        <div>
                            <button className="bg-green-300 px-3 py-1 rounded-full text-white font-bold">Advice</button>
                        </div>
                        <Csv />
                        <PlaceImageUpload />
                    </div>
                </div>
            </section>
        </ThemeProvider>
        
    );
}
