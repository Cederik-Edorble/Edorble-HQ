import React from 'react';
import {Button} from "antd";
import Navbar from "../components/navbar";

import Head from 'next/head'

function Dashboard(props) {

    const logout = async () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

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
                <div className={'col-span-12 md:col-span-4 border border-edorble-400 rounded'}>
                    <div className={'flex justify-center'}>
                        <img className={'w-2/3  pl-20 pr-20 pt-10'} src="https://www.bluecircle.foundation/s3/uploads/7d9278da-685f-4179-ad11-df54d19ac178_eb.svg" alt=""/>
                    </div>
                    <h1 className={'text-center text-2xl text-edorble-300 mt-5 font-bold'}>Access your world</h1>
                    <div className={'flex justify-center p-2 pb-0 pt-3'}>
                        <Button  className={'border-0 bg-edorble-yellow-500 hover:bg-edorble-yellow-600 hover:text-black w-1/2 rounded font-bold'}>Download Edorble</Button>
                    </div>

                    <h1 className={'text-center text-lg mt-0 text-edorble-300 mt-2 font-bold  pr-5 pl-5'}>Open the application and enter the world code</h1>

                    <p className={'text-center'}>
                        <i className={'fa fa-question text-center text-edorble-500 text-8xl'}></i>
                    </p>

                    <h2 className={'text-center text-edorble-400 font-bold pb-10'}>Need Help?</h2>
                </div>

                <div className={'col-span-12 md:col-span-8 border border-edorble-400 rounded'}>

                    <div className={'grid grid-cols-12 text-center bg-edorble-400'}>
                        <div className={'col-span-3 text-white font-bold cursor-pointer'}>
                            Worlds
                        </div>
                        <div className={'col-span-3 text-edorble-100 font-bold cursor-pointer'}>
                            Settings
                        </div>
                        <div className={'col-span-3 text-edorble-100 font-bold cursor-pointer'}>
                            Map
                        </div>
                        <div className={'col-span-3 text-edorble-100 font-bold cursor-pointer'}>
                            Content
                        </div>
                    </div>

                    <div className={'p-10'}>

                        <div className={'grid grid-cols-12 gap-4'}>
                            <div className={'col-span-6 md:col-span-3'}>
                                <img className={'w-12'} src="https://www.bluecircle.foundation/s3/uploads/55000efd-581f-47c2-ae9a-3980313cac68_icon_256x256.png" alt=""/>
                                <h2 className={'text-edorble-400 font-bold'}>World 39</h2>
                            </div>
                            <div className={'col-span-6 md:col-span-3'}>
                                <img className={'w-12'} src="https://www.bluecircle.foundation/s3/uploads/55000efd-581f-47c2-ae9a-3980313cac68_icon_256x256.png" alt=""/>
                                <h2 className={'text-edorble-400 font-bold'}>World 40</h2>
                            </div>
                            <div className={'col-span-6 md:col-span-3'}>
                                <img className={'w-12'} src="https://www.bluecircle.foundation/s3/uploads/55000efd-581f-47c2-ae9a-3980313cac68_icon_256x256.png" alt=""/>
                                <h2 className={'text-edorble-400 font-bold'}>World 41</h2>
                            </div>
                            <div className={'col-span-6 md:col-span-3'}>
                                {/*<i className={'fa fa-plus p-6 text-4xl text-green-800 rounded-full border'}></i>*/}
                                <img className={'w-16'} src="https://www.bluecircle.foundation/s3/uploads/0cad90e0-8edb-442c-b4e9-2b2f4a6134b6_AddWorld.png" alt=""/>
                            </div>

                        </div>

                    </div>


                </div>
            </div>


            {/*<div className={'flex align-center justify-center w-full top-60 absolute z-50 mt-10'} style={{zIndex: `1000`}}>*/}
            {/*    <div className={'text-center text-6xl md:text-8xl font-bold text-edorble-500'}>*/}
            {/*        ed<span>*/}
            {/*    /!*<img className={'inline animate-spin-slow w-1/6 md:w-min'} src="https://uploads-ssl.webflow.com/55aa9b26d5a90967531209a8/55e4db7b10c87b29299f26aa_Edorble-LogoOnly.png" alt=""/>*!/*/}
            {/*        <img className={'inline animate-spin-slow w-20 mr-1 ml-1'} src="https://www.bluecircle.foundation/s3/uploads/55000efd-581f-47c2-ae9a-3980313cac68_icon_256x256.png" alt=""/>*/}
            {/*</span>rble*/}

            {/*        <br/>*/}
            {/*        <h2 className={'text-4xl'}>Dashboard Work in Progress</h2>*/}
            {/*        <Button onClick={logout}>Logout</Button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
}

export default Dashboard;
