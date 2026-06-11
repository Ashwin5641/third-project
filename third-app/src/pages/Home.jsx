import { useState } from "react";
import Topbar from "../shared/components/topbar/Topbar";
import Navbar from "../shared/components/navbar/Navbar";
import Hero from "../shared/components/hero/Hero";
import BottomBar from "../shared/components/bottomBar/BottomBar";

export default function Home() {
    return (
        <div>
            <Topbar />
            <Navbar />
            <Hero />
            <BottomBar />
        </div>
    )
}