import React from 'react';
import {Menu, Dropdown, Button} from 'antd';
import { DownOutlined } from '@ant-design/icons';

function Navbar(props) {
    const logout = async () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const menu = (
        <Menu size={'large'} selectedKeys={['0']}>
            <Menu.Item key="0">
                <span>Dashboard</span>
            </Menu.Item>
            <Menu.Item key="1">
                <span>Pricings</span>
            </Menu.Item>
            <Menu.Item key="2">
                <span>Download</span>
            </Menu.Item>
            <Menu.Item key="3">
                <span>Help</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="4">
                <a href="" onClick={logout}>Logout</a>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <div className={'grid grid-cols-12 p-5 bg-gradient-to-r from-edorble-600 via-edorble-300 to-edorble-600 md:hidden'}>
                <img className={'flot-left absolute w-12 animate-spin-slow top-2 left-2'} src="https://uploads-ssl.webflow.com/55aa9b26d5a90967531209a8/55e4db7b10c87b29299f26aa_Edorble-LogoOnly.png" alt=""/>
                <div className={'col-span-12 flex justify-center'}>
                    <Dropdown overlay={menu} placement={'topCenter'} trigger={['click']} className={'text-white font-bold'} size={'large'}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Menu <DownOutlined />
                        </a>
                    </Dropdown>
                </div>
                <div className={'border col-span-6 hidden'}>
                    <h1>yay</h1>
                </div>
                <div className={'border col-span-6 hidden'}>
                    <h1>yay</h1>
                </div>
            </div>

            {/*https://www.bluecircle.foundation/s3/uploads/ed67fe42-f9e3-46e2-bd27-77d97312588a_Edorble.ico*/}
            {/*https://www.bluecircle.foundation/s3/uploads/6e99f3b0-b052-4be4-a6d7-fe5b89f5f54d_Download.png*/}
            {/*https://www.bluecircle.foundation/s3/uploads/7d9278da-685f-4179-ad11-df54d19ac178_eb.svg*/}
            {/*https://www.bluecircle.foundation/s3/uploads/55000efd-581f-47c2-ae9a-3980313cac68_icon_256x256.png*/}

            <div className={'grid grid-cols-12 bg-gradient-to-r from-edorble-600 via-edorble-300 to-edorble-600 hidden md:grid p-3'}>
                <div className={'col-span-3'}>
                    <h1 className={'text-center text-xl font-bold text-white float-left'}>
                        ed<span>
                {/*<img className={'inline animate-spin-slow w-10'} src="https://uploads-ssl.webflow.com/55aa9b26d5a90967531209a8/55e4db7b10c87b29299f26aa_Edorble-LogoOnly.png" alt=""/>*/}
                <img className={'inline animate-spin-slow w-8 mr-1 ml-1'} src="https://www.bluecircle.foundation/s3/uploads/55000efd-581f-47c2-ae9a-3980313cac68_icon_256x256.png" alt=""/>
            </span>rble
                    </h1>
                </div>

                <div className={'col-span-9'}>
                    <div className={'float-right mt-1'}>
                        <Button type={'default'} ghost>Pricings</Button>
                        <Button type={'default'} ghost className={'ml-5'}>Downloads</Button>
                        <Button type={'default'} ghost className={'ml-5'}>Help</Button>
                        <Button type={'default'} ghost className={'ml-10'} onClick={logout}>Logout</Button>
                    </div>
                </div>

            </div>

        </>
    );
}

export default Navbar;
