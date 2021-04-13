import React, {useState, useEffect} from 'react';
import {Button, Col, Drawer, Row, Tooltip} from "antd";
import ContentScreen from "./content-screen";

function NewWorldForm (props) {
    const [name, setName] = useState(props.activeWorld ? props.activeWorld.name : '');
    const [maps, setMaps] = useState();

    const fetchMaps = async () => {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/maps?token=${localStorage.getItem('token')}`)
        let json = await res.json();
        setMaps(json.data);
    };

    useEffect(() => {
        fetchMaps()
    }, []);

    const createWorld = async (ev) => {
        ev.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/worlds?token=${localStorage.getItem('token')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, map: maps[0]._id})
        })
        props.fetchWorlds()
    };

    const updateWorld = async (ev) => {
        ev.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/worlds/${props.activeWorld._id}?token=${localStorage.getItem('token')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name})
        })
        props.fetchWorlds()
    };

    return (
        <>
            <div className={'grid grid-cols-12'}>
                <div className={'col-span-12'}>
                    <form onSubmit={props.activeWorld ? updateWorld : createWorld}>
                        <Row type={'flex'} align={'center'} className={'mt-5'}>
                            <Col span={24}>
                                <input type={"text"}
                                       onChange={(ev) => {
                                           setName(ev.currentTarget.value)
                                       }}
                                       value={name}
                                       required className={'border-2 border-edorble-200 hover:border-edorble-200 focus:border-edorble-200 w-full rounded'}
                                       placeholder={'World Name'}/>
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

function DashboardWorlds(props) {
    const [showModal, setShowModal] = useState(null);
    const [worlds, setWorlds] = useState(null);
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const [enableEdit, setEnableEdit] = useState(false);

    const fetchWorlds = async () => {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/worlds?token=${localStorage.getItem('token')}`)
        let data = await res.json();
        setWorlds(data.data);
        setShowModal(null);
        props.setActiveWorld(null)
    };

    useEffect(() => {
        fetchWorlds();
    }, [])

    const updatePassword = async (ev) => {
        ev.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/worlds/${props.activeWorld._id}?token=${localStorage.getItem('token')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password})
        })
        fetchWorlds();
    }

    const updateEnablePassword = async (ev, val) => {
        ev.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/worlds/${props.activeWorld._id}?token=${localStorage.getItem('token')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({enablePassword: val})
        })
        fetchWorlds();
    }

    return (
        <>
            <Drawer
                title={<h1 className={'text-edorble-500 font-bold'}>{props.activeWorld ? 'Edit World' : 'Add New World'}</h1>}
                placement="right"
                closable={true}
                onClose={() => setShowModal(null)}
                // width={'w-10'}
                // bodyStyle={{width: '100%'}}
                // drawerStyle={{width: '100%'}}
                // contentWrapperStyle={{width: '50%'}}
                visible={showModal}
            >
                {showModal}
            </Drawer>


            {/*<div>*/}
            {/*    <ContentScreen />*/}
            {/*</div>*/}

            {props.activeWorld && props.activeTab=='settings' && <div className={'grid col-span-12'}>
                <div className={'grid grid-cols-12 gap-2 flex'}>
                    <div className={'grid col-span-12 md:col-span-3 gap-2 justify-center'}>
                        <img className={'w-32 cursor-pointer'} src="https://www.bluecircle.foundation/s3/uploads/55000efd-581f-47c2-ae9a-3980313cac68_icon_256x256.png" alt=""/>
                        <br/>
                        <img className={'w-32 cursor-pointer'} src="https://www.bluecircle.foundation/s3/uploads/077e498f-3c9c-4717-bfb8-7b69ade6a60a_AddUser.png" alt=""/>
                        <h1 className={'text-center text-edorble-300 font-bold text-xl'}>Invite Others!</h1>
                    </div>
                    <div className={'grid col-span-12 md:col-span-8 gap-4 mt-10 md:mt-0'}>
                        <h1 className={'text-4xl text-edorble-300 font-bold w-full'}>
                            {props.activeWorld.name}
                            <p className={'text-edorble-100 font-bold text-lg'}>Code: {props.activeWorld.accessCode}</p>
                            <i className={'fa fa-edit float-right text-2xl cursor-pointer mt-1'}
                               onClick={() => setShowModal(<NewWorldForm fetchWorlds={fetchWorlds}
                                                                         activeWorld={props.activeWorld} />)}/>
                        </h1>

                        <div className={'grid grid-cols-12 gap-2 p-5 border border-edorble-100 rounded'}>
                            <div className={'col-span-12 gap-2 justify-center'}>
                                <p className={'text-edorble-400 font-semibold text-2xl'}>Password</p>
                                {props.activeWorld.enablePassword && <Tooltip title={'Disable Password'}>
                                    <i className={'fa fa-toggle-on text-2xl text-edorble-400 cursor-pointer'} onClick={(ev) => updateEnablePassword(ev, false)} />
                                </Tooltip>}
                                {!props.activeWorld.enablePassword && <Tooltip title={'Enable Password'}>
                                    <i className={'fa fa-toggle-off text-2xl text-edorble-400 cursor-pointer'} onClick={(ev) => updateEnablePassword(ev, true)} />
                                </Tooltip>}
                                <i onClick={() => setEnableEdit(!enableEdit)}
                                   className={'fa fa-edit text-2xl text-edorble-400 pl-5 cursor-pointer'} />
                            </div>
                            {/*<div className={'col-span-2 md:col-span-3 gap-2 justify-center'}>*/}

                            {/*</div>*/}

                            {enableEdit && <div className={'col-span-12 gap-2 justify-center'}>
                                <form onSubmit={updatePassword}>
                                    <Row type={'flex'} align={'center'} className={'mt-5 w-full'}>
                                        <Col span={24} className={'mt-5'}>
                                            <input type="password" value={password} onChange={(ev) => setPassword(ev.currentTarget.value)} required className={'border-2 border-edorble-200 hover:border-edorble-200 focus:border-edorble-200 w-full rounded'} placeholder={'Password'}/>
                                        </Col>
                                        <Col span={24} className={'mt-5'}>
                                            <input type="password" value={retypePassword} onChange={(ev) => setRetypePassword(ev.currentTarget.value)} required className={'border-2 border-edorble-200 hover:border-edorble-200 focus:border-edorble-200 w-full rounded'} placeholder={'Retype Password'}/>
                                            {(password != retypePassword) && <small className={'text-red-500 font-bold'}>Passwords don't match</small>}
                                        </Col>
                                        <Col span={24} className={'mt-5'}>
                                            <Button  loading={false}
                                                     htmlType={'submit'}
                                                     disabled={password != retypePassword}
                                                     className={'border-0 bg-edorble-yellow-500 hover:bg-edorble-yellow-600 hover:text-black w-full rounded font-bold'}>Submit</Button>
                                            {/*<Button loading={loading} disabled={password != retypePassword} type="primary" htmlType={'submit'} className={'border-0 w-full rounded font-bold'}>Submit</Button>*/}
                                        </Col>
                                    </Row>
                                </form>
                            </div>}

                        </div>

                    </div>
                </div>
            </div>}

            {props.activeWorld && props.activeTab=='map' && <div className={'grid col-span-12'}>
                <h1>MAP</h1>
            </div>}

            {props.activeWorld && props.activeTab=='content' && <div className={'grid col-span-12'}>
                <ContentScreen activeWorld={props.activeWorld} />
            </div>}

            {!props.activeWorld && <>
                {worlds && worlds.map((world) => {
                    return <div className={'col-span-6 md:col-span-3'} key={world._id} onClick={() => {
                        props.setActiveWorld(world);
                        props.setActiveTab('settings');
                    }}>
                        <img className={'w-16 cursor-pointer'} src="https://www.bluecircle.foundation/s3/uploads/55000efd-581f-47c2-ae9a-3980313cac68_icon_256x256.png" alt=""/>
                        <h2 className={'text-edorble-400 font-bold'}>{world.name}</h2>
                    </div>
                })}

                <div className={'col-span-6 md:col-span-3'}>
                    <img className={'w-16 cursor-pointer'}
                         onClick={() => setShowModal(<NewWorldForm fetchWorlds={fetchWorlds}
                                                                   activeWorld={props.activeWorld} />)}
                         src="https://www.bluecircle.foundation/s3/uploads/0cad90e0-8edb-442c-b4e9-2b2f4a6134b6_AddWorld.png" alt=""/>
                </div>
            </>}

        </>
    );
}

export default DashboardWorlds
