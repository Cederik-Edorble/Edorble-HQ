import React from 'react';

function DashboardNav(props) {
    return (
        <>
            <div className={'grid grid-cols-12 text-center bg-edorble-400 p-2'}>
                <div className={'col-span-3 text-white font-bold cursor-pointer'} onClick={() => props.activeWorld && props.setActiveWorld(null)}>
                    {props.activeWorld ? 'Back to Worlds' : 'Worlds'}
                </div>
                <div onClick={() => props.setActiveTab('settings')} className={(props.activeWorld && props.activeTab=='settings') ? 'col-span-3 text-white font-bold cursor-pointer' : 'col-span-3 text-edorble-100 font-bold cursor-pointer'}>
                    Settings
                </div>
                <div onClick={() => props.setActiveTab('map')} className={(props.activeWorld && props.activeTab=='map') ? 'col-span-3 text-white font-bold cursor-pointer' : 'col-span-3 text-edorble-100 font-bold cursor-pointer'}>
                    Map
                </div>
                <div onClick={() => props.setActiveTab('content')} className={(props.activeWorld && props.activeTab=='content') ? 'col-span-3 text-white font-bold cursor-pointer' : 'col-span-3 text-edorble-100 font-bold cursor-pointer'}>
                    Content
                </div>
            </div>
        </>
    );
}

export default DashboardNav;
