import React, {useState, useEffect} from 'react';
import {Button} from "antd";

function ContentScreen(props) {

    const [url, setUrl] = useState('');
    const [currentUrl, setCurrentUrl] = useState('');

    const onEnter = async (ev) => {
        if(ev.keyCode==13){
            console.log(url);
            setCurrentUrl(url);
        }
    };

    return (
        <>

            <div className={'col-span-12 p-2 mb-5'}>
                <h1 className={'text-center font-semibold text-edorble-500 w-full'}>To save content, select or create region and the desired screen, then add your links in the empty slots</h1>
            </div>

            <div className={'col-span-12 p-2 mb-5 flex justify-center'}>
                <Button htmlType={'submit'}
                        type={'default'}
                        size={'large'}
                        className={'rounded font-bold mr-2'}>Region 1</Button>
                <Button htmlType={'submit'}
                        type={'default'}
                        size={'large'}
                        className={'rounded font-bold mr-2'}>Region 2</Button>
                <Button htmlType={'submit'}
                        type={'default'}
                        size={'large'}
                        className={'rounded font-bold mr-2'}>Region 3</Button>
                <Button htmlType={'submit'}
                        type={'default'}
                        size={'large'}
                        className={'rounded font-bold mr-2'}>Region 4</Button>

                <Button htmlType={'submit'}
                        type={'primary'}
                        size={'large'}
                        className={'rounded font-bold'} icon={<i className={'fa fa-plus mr-2'}></i>}>Add Region</Button>

            </div>

            <div className={'col-span-12 p-2 mb-5 flex justify-center'}>
                <Button htmlType={'submit'}
                        type={'default'}
                        className={'rounded font-bold mr-2'}>Screen 1</Button>
                <Button htmlType={'submit'}
                        type={'default'}
                        className={'rounded font-bold mr-2'}>Screen 2</Button>
                <Button htmlType={'submit'}
                        type={'default'}
                        className={'rounded font-bold mr-2'}>Screen 3</Button>
                <Button htmlType={'submit'}
                        type={'default'}
                        className={'rounded font-bold mr-2'}>Screen 4</Button>

                <Button htmlType={'submit'}
                        type={'primary'}
                        className={'rounded font-bold'} icon={<i className={'fa fa-plus mr-2'}></i>}>Add Region</Button>

            </div>

            <div className={'col-span-12 border border-gray-200 bg-gray-100 p-2 rounded'}>


                <div className={'grid grid-cols-12'}>
                    <div className={'col-span-2 lg:col-span-1 p-1 text-center h-10 flex justify-center'}>
                        <div className={'rounded h-full w-1/2  border bg-white'}>
                            <i className={'fa fa-hand-paper-o text-gray-400  text-xl'}/>
                        </div>

                    </div>
                    <div className={'col-span-8 lg:col-span-10 border-gray-200 '}>
                        <input onChange={(ev) => {
                            setUrl(ev.currentTarget.value)
                        }} onKeyDown={onEnter} type="url" className={'h-10 border-gray-200 focus:outline-none rounded focus:ring-1 focus:ring-gray-300 focus:border-transparent w-full m-none p-none'}/>

                    </div>
                    <div className={'col-span-2 lg:col-span-1 p-1 text-center h-10 flex justify-center'}>
                        <div className={'rounded h-full w-1/2  border bg-white'}>
                            <i className={'fa fa-refresh text-gray-400  text-xl'}/>
                        </div>
                    </div>
                    {/*<div className={'col-span-2 md:col-span-1 p-1 text-center'}>*/}
                    {/*    <i className={'fa fa-refresh text-gray-400  text-xl'}/>*/}
                    {/*</div>*/}
                </div>



                <div className={'grid grid-cols-12 mt-2 gap-2'}>
                    <div className={'col-span-12 sm:hidden sm:col-span-2 border-2 flex justify-center border-edorble-100 bg-white rounded h-full'}>
                        <i className={'fa fa-plus-circle text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-600 p-2'} />
                        <i className={'fa fa-plus-circle text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-600 p-2'} />
                        <i className={'fa fa-plus-circle text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-600 p-2'} />
                        <i className={'fa fa-plus-circle text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-600 p-2'} />
                        <i className={'fa fa-plus-circle text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-600 p-2'} />
                    </div>

                    <div className={'col-span-12 sm:col-span-1 md:col-span-2 hidden sm:block border-2 border-edorble-100 bg-white text-center rounded'}>
                        <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700 p-2 mt-5'} />
                        <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700 p-2'} />
                        <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700 p-2'} />
                        <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700 p-2'} />
                        <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700 p-2'} />
                    </div>

                    {/*<div className={'col-span-12 sm:hidden sm:col-span-2 border-2 flex justify-center border-edorble-100 bg-white rounded h-full'}>*/}
                    {/*    <h1>yaysss</h1>*/}
                    {/*</div>*/}
                    <div className={'col-span-12 sm:col-span-11 md:col-span-10  mt-2 sm:mt-0 border-2 border-edorble-100 bg-white rounded h-96'}>
                        {currentUrl ? <iframe src={currentUrl} frameborder="0" className={'h-full bg-gray-200 w-full'}></iframe> : <h2 className={'text-center mt-20'}>Search for a URL and press enter to begin</h2>}

                        <object data="https://www.youtube.com" width={600} height={400}>
                            <embed src="https://www.youtube.com" width={600} height={400} />
                            Error: Embedded data could not be displayed.
                        </object>

                    </div>


                </div>


                {/*<div className={'grid grid-cols-12'}>*/}
                {/*    <div className={'md:col-span-2 p-2 text-center h-96 mt-2'}>*/}
                {/*        <div className={'grid grid-cols-12 border-2 border-edorble-100 bg-white rounded h-full'}>*/}
                {/*            <div className={'col-span-12 mt-2'}>*/}
                {/*                <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700'}></i>*/}
                {/*            </div>*/}
                {/*            <div className={'col-span-12 mt-4'}>*/}
                {/*                <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700'}></i>*/}
                {/*            </div>*/}
                {/*            <div className={'col-span-12 mt-4'}>*/}
                {/*                <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700'}></i>*/}
                {/*            </div>*/}
                {/*            <div className={'col-span-12 mt-4'}>*/}
                {/*                <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700'}></i>*/}
                {/*            </div>*/}
                {/*            <div className={'col-span-12 mt-4'}>*/}
                {/*                <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700'}></i>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    /!*<div className={'col-span-1 p-2 text-center h-96 mt-2'}>*!/*/}
                {/*    /!*    <div className={'grid grid-cols-12 border-2 border-edorble-100 bg-white rounded h-full'}>*!/*/}
                {/*    /!*        <div className={'col-span-12 mt-2'}>*!/*/}
                {/*    /!*            <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700'}></i>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*        <div className={'col-span-12 mt-4'}>*!/*/}
                {/*    /!*            <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700'}></i>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*        <div className={'col-span-12 mt-4'}>*!/*/}
                {/*    /!*            <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700'}></i>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*        <div className={'col-span-12 mt-4'}>*!/*/}
                {/*    /!*            <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700'}></i>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*        <div className={'col-span-12 mt-4'}>*!/*/}
                {/*    /!*            <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700'}></i>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*    /!*</div>*!/*/}

                {/*    <div className={'md:col-span-8 p-2 text-center h-96 mt-2'}>*/}
                {/*        <div className={'border-2 border-edorble-100 rounded bg-white h-full'}>*/}

                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className={'md:col-span-2 p-2 text-center h-96 mt-2'}>*/}
                {/*        <div className={'border-2 border-edorble-100 rounded h-full bg-white'}>*/}

                {/*        </div>*/}

                {/*    </div>*/}
                {/*</div>*/}


            </div>


        </>
    );
}

export default ContentScreen;
