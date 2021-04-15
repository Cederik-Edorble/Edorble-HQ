import React, {useState, useEffect} from 'react';
import {Button, Col, Drawer, Row} from "antd";
import NewRegionForm from "./new-region-form";
import NewScreenForm from "./new-screen-form";


function ContentScreen(props) {

    const [url, setUrl] = useState('');
    const [currentUrl, setCurrentUrl] = useState('');
    const [reloadUrl, setReloadUrl] = useState(false);

    const [regions, setRegions] = useState();
    const [screens, setScreens] = useState();
    // const [activeRegion, setActiveRegion] = useState();
    const [selectedRegion, setSelectedRegion] = useState();

    const [selectedScreen, setSelectedScreen] = useState();

    const [drawerTitle, setDrawerTitle] = useState();
    const [drawerBody, setDrawerBody] = useState();

    useEffect(() => {
        if(reloadUrl){
            console.log(url)
            console.log(currentUrl)
            setCurrentUrl(url);
            setReloadUrl(false);
        }
    }, [reloadUrl])

    const fetchRegions = async () => {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/maps/${props.activeWorld.map}/regions?token=${localStorage.getItem('token')}`);
        let json = await res.json();
        setRegions(json.data);
        setDrawerBody(null);
        setDrawerTitle(null);
    };

    const fetchScreens = async () => {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/regions/${selectedRegion._id}/screens?token=${localStorage.getItem('token')}`);
        let json = await res.json();
        console.log(json)
        setScreens(json.data);
        setDrawerBody(null);
        setDrawerTitle(null);
    };


    useEffect(() => {
        fetchRegions();
    }, [])

    useEffect(() => {
        // if(selectedRegion){
        //     console.log(selectedRegion)
        // }
        selectedRegion && fetchScreens();
    }, [selectedRegion])

    const onEnter = async (ev) => {
        if(ev.keyCode==13){
            setCurrentUrl(url);
        }
    };

    return (
        <>

            <Drawer
                title={drawerTitle}
                placement="right"
                closable={true}
                onClose={() => setDrawerBody(null)}
                // width={'w-10'}
                // bodyStyle={{width: '100%'}}
                // drawerStyle={{width: '100%'}}
                // contentWrapperStyle={{width: '50%'}}
                visible={drawerBody}
            >
                {drawerBody}
            </Drawer>

            <div className={'col-span-12 p-2 mb-5'}>
                <h1 className={'text-center font-semibold text-edorble-500 w-full'}>To save content, select or create region and the desired screen, then add your links in the empty slots</h1>
            </div>

            <div className={'col-span-12 p-2 mb-5 flex justify-center'}>
                {regions && regions.map((region) => {
                    return <Button htmlType={'submit'}
                                   key={region._id}
                                   onClick={() => {
                                       setScreens(null)
                                       setSelectedScreen(null)
                                       setSelectedRegion(region)
                                   }}
                                   type={selectedRegion ? ((selectedRegion._id == region._id) && 'primary') : 'default'}
                                   size={'large'}
                                   className={'rounded font-bold mr-2'}>{region.name}</Button>
                })}
                <Button htmlType={'submit'}
                        type={'primary'}
                        ghost
                        size={'large'}
                        onClick={() => {
                            setDrawerTitle(<h1 className={'text-edorble-500 font-bold'}>New Region</h1>);
                            setDrawerBody(<NewRegionForm activeWorld={props.activeWorld} fetchRegions={fetchRegions} />)
                        }}
                        className={'rounded font-bold'} icon={<i className={'fa fa-plus mr-2'}></i>}>Add Region</Button>
            </div>

            {selectedRegion && <div className={'col-span-12 p-2 mb-5 flex justify-center'}>
                {screens && screens.map((screen) => {
                    return <Button htmlType={'submit'}
                                   key={screen._id}
                                   onClick={() => setSelectedScreen(screen)}
                                   type={selectedScreen ? ((selectedScreen._id == screen._id) && 'primary') : 'default'}
                                   className={'rounded font-bold mr-2'}>{screen.name}</Button>
                })}

                <Button htmlType={'submit'}
                        type={'primary'}
                        ghost
                        onClick={() => {
                            setDrawerTitle(<h1 className={'text-edorble-500 font-bold'}>New Screen</h1>);
                            setDrawerBody(<NewScreenForm activeRegion={selectedRegion} fetchRegions={fetchRegions} />)
                        }}
                        className={'rounded font-bold'} icon={<i className={'fa fa-plus mr-2'}></i>}>Add Screen</Button>
            </div>}

            {selectedRegion && selectedScreen && <div className={'col-span-12 border border-gray-200 bg-gray-100 p-2 rounded'}>
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
                            <i className={'fa fa-refresh text-gray-400 cursor-pointer text-xl'} onClick={() => {
                                setCurrentUrl(null);
                                setReloadUrl(true);
                            }}/>
                        </div>
                    </div>
                    {/*<div className={'col-span-2 md:col-span-1 p-1 text-center'}>*/}
                    {/*    <i className={'fa fa-refresh text-gray-400  text-xl'}/>*/}
                    {/*</div>*/}
                </div>



                <div className={'grid grid-cols-12 mt-2 gap-2'}>
                    <div className={'col-span-12 sm:hidden sm:col-span-2 border-2 flex justify-center border-edorble-100 bg-white rounded h-full'}>
                        {currentUrl ? <>
                            <i className={'fa fa-plus-circle text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-600 p-2'} />
                            <i className={'fa fa-plus-circle text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-600 p-2'} />
                            <i className={'fa fa-plus-circle text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-600 p-2'} />
                            <i className={'fa fa-plus-circle text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-600 p-2'} />
                            <i className={'fa fa-plus-circle text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-600 p-2'} />
                        </> : <h1 className={'text-center mt-20 font-bold'}>Load a URL to add a content screen</h1>}
                    </div>

                    <div className={'col-span-12 sm:col-span-1 md:col-span-2 hidden sm:block border-2 border-edorble-100 bg-white text-center rounded'}>
                        {currentUrl ? <>
                            <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700 p-2 mt-5 cursor-pointer'} />
                            <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700 p-2 cursor-pointer'} />
                            <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700 p-2 cursor-pointer'} />
                            <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700 p-2 cursor-pointer'} />
                            <i className={'fa fa-plus-circle text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700 p-2 cursor-pointer'} />
                        </> : <h1 className={'text-center mt-20 p-2 font-bold'}>Load a URL to add a content screen</h1>}

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
            </div>}


        </>
    );
}

export default ContentScreen
