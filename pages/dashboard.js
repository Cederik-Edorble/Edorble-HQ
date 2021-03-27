import React from 'react';

function Dashboard(props) {
    return (
        <>
            <div className={'flex align-center justify-center w-full top-60 absolute z-50 mt-10'} style={{zIndex: `1000`}}>
                <div className={'text-center text-6xl md:text-8xl font-bold text-edorble-500'}>
                    ed<span>
                <img className={'inline animate-spin-slow w-1/6 md:w-min'} src="https://uploads-ssl.webflow.com/55aa9b26d5a90967531209a8/55e4db7b10c87b29299f26aa_Edorble-LogoOnly.png" alt=""/>
            </span>rble

                    <br/>
                    <h2 className={'text-4xl'}>Dashboard Work in Progress</h2>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
