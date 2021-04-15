import React, {useState, useEffect} from 'react';
import {Button, Col, Row} from "antd";

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

export default NewRegionForm;
