import React from 'react';

function ContentScreen(props) {
    return (
        <>

            <div className={'col-span-12 border border-gray-200 bg-gray-100 p-2 rounded'}>
                <div className={'grid grid-cols-12'}>
                    <div className={'col-span-2 md:col-span-1 p-1 text-center h-10 flex justify-center'}>
                        <div className={'rounded h-full w-1/2  border bg-white'}>
                            <i className={'fa fa-hand-paper-o text-gray-400  text-xl'}/>
                        </div>

                    </div>
                    <div className={'col-span-8 md:col-span-10 border-gray-200 '}>
                        <input type="url" className={'h-10 border-gray-200 focus:outline-none rounded focus:ring-1 focus:ring-gray-300 focus:border-transparent w-full m-none p-none'}/>

                    </div>
                    <div className={'col-span-2 md:col-span-1 p-1 text-center h-10 flex justify-center'}>
                        <div className={'rounded h-full w-1/2  border bg-white'}>
                            <i className={'fa fa-refresh text-gray-400  text-xl'}/>
                        </div>
                    </div>
                    {/*<div className={'col-span-2 md:col-span-1 p-1 text-center'}>*/}
                    {/*    <i className={'fa fa-refresh text-gray-400  text-xl'}/>*/}
                    {/*</div>*/}




                    <div className={'col-span-1 p-2 text-center h-96 mt-2'}>
                        <div className={'grid grid-cols-12 border-2 border-edorble-100 bg-white rounded h-full'}>
                            <div className={'col-span-12 mt-2'}>
                                <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700'}></i>
                            </div>
                            <div className={'col-span-12 mt-4'}>
                                <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700'}></i>
                            </div>
                            <div className={'col-span-12 mt-4'}>
                                <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700'}></i>
                            </div>
                            <div className={'col-span-12 mt-4'}>
                                <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700'}></i>
                            </div>
                            <div className={'col-span-12 mt-4'}>
                                <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700'}></i>
                            </div>
                        </div>


                    </div>
                    <div className={'col-span-9 p-2 text-center h-96 mt-2'}>
                        <div className={'border-2 border-edorble-100 rounded bg-white h-full'}>

                        </div>
                    </div>

                    <div className={'col-span-2 p-2 text-center h-96 mt-2'}>
                        <div className={'border-2 border-edorble-100 rounded h-full bg-white'}>

                        </div>

                    </div>


                </div>


            </div>


        </>
    );
}

export default ContentScreen;
