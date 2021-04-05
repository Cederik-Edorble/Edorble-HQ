import React from 'react';
import {Button} from "antd";

function DownloadEdorble(props) {
    return (
        <>
            <div className={'col-span-12 md:col-span-4 border border-edorble-400 rounded'}>
                <div className={'flex justify-center'}>
                    {/*<img className={'w-2/3  pl-20 pr-20 pt-10'} src="https://www.bluecircle.foundation/s3/uploads/7d9278da-685f-4179-ad11-df54d19ac178_eb.svg" alt=""/>*/}
                    <img style={{width: '75%'}} className={'pl-20 pr-20 pt-10'} src="https://www.bluecircle.foundation/s3/uploads/7d9278da-685f-4179-ad11-df54d19ac178_eb.svg" alt=""/>
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
        </>
    );
}

export default DownloadEdorble;
