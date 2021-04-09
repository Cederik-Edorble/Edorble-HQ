import React, {useState, useEffect} from 'react';
import {Button, Drawer} from "antd";
import Navbar from "../../components/navbar";

import Head from 'next/head'
import DownloadEdorble from "../../components/download-edorble";
import DashboardNav from "../../components/dashboard-nav";
import DashboardWorlds from "../../components/dashboard-worlds";

function Index(props) {

    const logout = async () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    // --organisation management--
    // User has Many worlds
    //
    // User has many maps
    //
    // -- map management --
    // Maps has many Regions
    // Region has many screens
    // Screen has 5 content slots
    //
    // -- world management --
    // World has one access code
    //
    // World has one Map (but can select from multiple options)
    //
    // -- content management --
    // Per world a map is selected, this reads #regions and #screens from the 'map configuration' and determines the content screens
    //     -> 1 content slot holds 1 content entry consiting out of title, type, url and description
    //
    // Example
    // Cederik has world 1 and 2
    // World 1 is configured to use 'Greenscene', World 2 is configured to use 'the matrix'
    // Greenscene has 4 regions (Fisherman's house, The Rocks, Campfire, Ocean side)
    // Fisherman's house has 3 screens, Campfire has 3 screens, The Rocks has 4 screens, Ocean side has 2 screens
    // Rock screen 1 holds title 'intro' a 'video' and url 'youtube.com/somevideo description; introduction video that explains edorble(edited)
    //     [7:22 PM]
    // There's no map management screen if i recall correctly, those we configured manually in the db
    // March 24, 2021

    const [showModal, setShowModal] = useState(null);
    const [activeWorld, setActiveWorld] = useState();
    const [activeTab, setActiveTab] = useState('worlds');

    return (
        <>
            <Navbar />
            <Head>
                <link rel="stylesheet"
                      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                      integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
                      crossOrigin="anonymous" />
            </Head>

            <div className={'grid grid-cols-12 gap-4 p-2'}>
                <DownloadEdorble />
                <div className={'col-span-12 md:col-span-8 border border-edorble-400 rounded'}>
                    <DashboardNav activeWorld={activeWorld}
                                  activeTab={activeTab}
                                  setActiveTab={setActiveTab}
                                  setActiveWorld={setActiveWorld} />
                    <div className={'p-10'}>
                        <div className={'grid grid-cols-12 gap-4'}>
                            <DashboardWorlds setActiveWorld={setActiveWorld}
                                             activeTab={activeTab}
                                             setActiveTab={setActiveTab}
                                             activeWorld={activeWorld} />
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Index;
