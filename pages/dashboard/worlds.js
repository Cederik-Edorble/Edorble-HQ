import React, {useState, useEffect} from 'react';
import {Button, Drawer} from "antd";
import Navbar from "../../components/navbar";

import Head from 'next/head'
import DownloadEdorble from "../../components/download-edorble";
import DashboardNav from "../../components/dashboard-nav";
import DashboardWorlds from "../../components/dashboard-worlds";

function Worlds(props) {

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
                    <DashboardNav />
                    <div className={'p-10'}>
                        <div className={'grid grid-cols-12 gap-4'}>
                            <DashboardWorlds />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Worlds;
