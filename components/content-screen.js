import React, {useState, useEffect} from 'react';
import {Button, Col, Drawer, Row} from "antd";

function NewRegionForm (props) {
    const [name, setName] = useState(props.activeRegion ? props.activeRegion.name : '');

    const createRegion = async (ev) => {
        ev.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/maps/${props.activeWorld.map}/regions?token=${localStorage.getItem('token')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name})
        })
        props.fetchRegions()
    };

    // const updateRegion = async (ev) => {
    //     ev.preventDefault();
    //     await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/worlds/${props.activeWorld._id}/regions/${props.activeRegion._id}?token=${localStorage.getItem('token')}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({name: name})
    //     })
    //     props.fetchRegions()
    // };

    return (
        <>
            <div className={'grid grid-cols-12'}>
                <div className={'col-span-12'}>
                    {/*<form onSubmit={props.activeRegion ? updateRegion : createRegion}>*/}
                    <form onSubmit={createRegion}>
                        <Row type={'flex'} align={'center'} className={'mt-5'}>
                            <Col span={24}>
                                <input type={"text"}
                                       onChange={(ev) => {
                                           setName(ev.currentTarget.value)
                                       }}
                                       value={name}
                                       required className={'border-2 border-edorble-200 hover:border-edorble-200 focus:border-edorble-200 w-full rounded'}
                                       placeholder={'Region Name'}/>
                            </Col>
                            {/*<Col span={24} className={'mt-2'}>*/}
                            {/*    {maps && <select className={'border-2 border-edorble-200 rounded'} onChange={(val) => setSelected}>*/}
                            {/*        {maps.map((map) => {*/}
                            {/*            return <option value={map.name} key={map._id}>{map.name}</option>*/}
                            {/*        })}*/}
                            {/*    </select>}*/}
                            {/*</Col>*/}
                            <Col span={24} className={'mt-5'}>
                                <Button loading={false}
                                        htmlType={'submit'}
                                        className={'border-0 bg-edorble-yellow-500 hover:bg-edorble-yellow-600 hover:text-black w-full rounded font-bold'}>Submit</Button>
                            </Col>
                        </Row>
                    </form>

                </div>
            </div>
        </>
    )
}

function NewScreenForm (props) {
    const [name, setName] = useState('');

    const createScreen = async (ev) => {
        ev.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/regions/${props.activeRegion._id}/screens?token=${localStorage.getItem('token')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name})
        })
        props.fetchRegions()
    };

    // const updateScreen = async (ev) => {
    //     ev.preventDefault();
    //     await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/regions/${props.activeRegion._id}/screens/${props.activeRegion._id}?token=${localStorage.getItem('token')}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({name: name})
    //     })
    //     props.fetchRegions()
    // };

    return (
        <>
            <div className={'grid grid-cols-12'}>
                <div className={'col-span-12'}>
                    <form onSubmit={createScreen}>
                        <Row type={'flex'} align={'center'} className={'mt-5'}>
                            <Col span={24}>
                                <input type={"text"}
                                       onChange={(ev) => {
                                           setName(ev.currentTarget.value)
                                       }}
                                       value={name}
                                       required className={'border-2 border-edorble-200 hover:border-edorble-200 focus:border-edorble-200 w-full rounded'}
                                       placeholder={'Screen Name'}/>
                            </Col>
                            {/*<Col span={24} className={'mt-2'}>*/}
                            {/*    {maps && <select className={'border-2 border-edorble-200 rounded'} onChange={(val) => setSelected}>*/}
                            {/*        {maps.map((map) => {*/}
                            {/*            return <option value={map.name} key={map._id}>{map.name}</option>*/}
                            {/*        })}*/}
                            {/*    </select>}*/}
                            {/*</Col>*/}
                            <Col span={24} className={'mt-5'}>
                                <Button loading={false}
                                        htmlType={'submit'}
                                        className={'border-0 bg-edorble-yellow-500 hover:bg-edorble-yellow-600 hover:text-black w-full rounded font-bold'}>Submit</Button>
                            </Col>
                        </Row>
                    </form>

                </div>
            </div>
        </>
    )
}

function ContentScreen(props) {

    const [url, setUrl] = useState('');
    const [currentUrl, setCurrentUrl] = useState('');

    const [regions, setRegions] = useState();
    const [screens, setScreens] = useState();
    // const [activeRegion, setActiveRegion] = useState();
    const [selectedRegion, setSelectedRegion] = useState();

    const [selectedScreen, setSelectedScreen] = useState();

    const [drawerTitle, setDrawerTitle] = useState();
    const [drawerBody, setDrawerBody] = useState();

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
            </div>}


        </>
    );
}

export default ContentScreen;
