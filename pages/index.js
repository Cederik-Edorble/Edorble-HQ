import React, {useState, useEffect} from 'react'
import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import {Button, Col, Divider, notification, Row, Spin} from 'antd';

export default function Home() {

      const [currentTab, setCurrentTab] = useState('login');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [retypePassword, setRetypePassword] = useState('');
      const [loading, setLoading] = useState(false);

      const onSignIn = async (ev) => {
          ev.preventDefault();
          if(email && password){
              setLoading(true);
              let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: JSON.stringify({email: email, password: password})
              })
              let data = await res.json();

              console.log(data);
              if(data.error){
                  notification['error']({
                      message: 'Failed',
                      description:
                          'Incorrect username or password',
                  });
                  setLoading(false);
              } else {
                  localStorage.setItem('token', data.token);
                  window.location.href = '/dashboard'
              }


          }

      };

    const onSignUp = async (ev) => {
        ev.preventDefault();
        console.log(email);
        console.log(password);
        console.log(retypePassword);
        if(password == retypePassword){

            setLoading(true);
            let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({email: email, password: password})
            });
            console.log(res);
            let data = await res.json();
            console.log(data)
            if(data.success){
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({email: email, password: password})
                })
                data = await res.json();

                console.log(data);
                localStorage.setItem('token', data.token);
                window.location.href = '/dashboard'
            } else {
                notification['error']({
                    message: 'Failed',
                    description:
                        'There was an error while signing up. Please try again or contact support.',
                });
                setLoading(false);
            }


        } else {
            notification['error']({
                message: 'Password error',
                description:
                    'Please make sure the passwords match',
            });
        }
    };

      return (
        <>

            <div style={{position: 'relative'}}>

                <video autoPlay loop style={{
                    backgroundImage: 'url("https://uploads-ssl.webflow.com/55aa9b26d5a90967531209a8/5a74bc99b3a1bb000193fa76_Edorble Video Cropped copy 720 (1)-poster-00001.jpg")',
                    objectFit: 'cover',
                    width: '100vw',
                    position: 'fixed',
                    height: '100vh'
                }} muted playsInline data-wf-ignore="true" data-object-fit="cover"><source src="https://uploads-ssl.webflow.com/55aa9b26d5a90967531209a8/5a74bc99b3a1bb000193fa76_Edorble Video Cropped copy 720 (1)-transcode.mp4" data-wf-ignore="true" /><source src="https://uploads-ssl.webflow.com/55aa9b26d5a90967531209a8/5a74bc99b3a1bb000193fa76_Edorble Video Cropped copy 720 (1)-transcode.webm" data-wf-ignore="true" /></video>


                <div className={'flex align-center justify-center w-full top-60 absolute z-50 mt-10'} style={{zIndex: `1000`}}>
                    <h1 className={'text-center text-6xl md:text-8xl font-bold text-edorble-500'}>
                        ed<span>
                <img className={'inline animate-spin-slow w-1/6 md:w-min'} src="https://uploads-ssl.webflow.com/55aa9b26d5a90967531209a8/55e4db7b10c87b29299f26aa_Edorble-LogoOnly.png" alt=""/>
            </span>rble
                    </h1>
                </div>


                <div className={'flex align-center justify-center w-screen top-96 absolute z-50 mt-10'} style={{zIndex: `1000`}}>
                    <Row type={'flex'} align={'center'} gutter={24} className={'w-full md:w-1/2 lg:w-1/3 p-2'}>
                        <Col>
                            <Button ghost={currentTab!='login'} onClick={() => setCurrentTab('login')} size={'large'} type={currentTab=='login' ? 'primary' : 'default'} className={'font-bold'}>Log In</Button>
                        </Col>
                        <Col>
                            <Button size={'large'} type={currentTab=='signup' ? 'primary' : 'default'} onClick={() => setCurrentTab('signup')} ghost={currentTab!='signup'} className={'font-bold'}>Sign Up</Button>
                        </Col>


                        {currentTab=='login' && <Col className={'p-2 bg-gradient-to-r from-edorble-600 via-edorble-300 to-edorble-600 w-1/2 mt-5 rounded'} span={24}>

                            <h1 className={'text-center text-xl text-white font-bold'}>Login using email and password</h1>
                            <form onSubmit={onSignIn}>
                                <Row type={'flex'} align={'center'} className={'mt-5'}>
                                    <Col span={24}>
                                        <input type="email" value={email} onChange={(ev) => setEmail(ev.currentTarget.value)} required className={'border-0 w-full rounded'} placeholder={'Email address'}/>
                                    </Col>
                                    <Col span={24} className={'mt-5'}>
                                        <input type="password" value={password} onChange={(ev) => setPassword(ev.currentTarget.value)} required className={'border-0 w-full rounded'} placeholder={'Password'}/>
                                    </Col>
                                    <Col span={24} className={'mt-5'}>
                                        <Button type="primary" loading={loading} htmlType={'submit'} className={'border-0 w-full rounded font-bold'}>Submit</Button>
                                    </Col>
                                </Row>
                            </form>

                        </Col>}

                        {currentTab=='signup' && <Col className={'p-2 bg-gradient-to-r from-edorble-600 via-edorble-300 to-edorble-600 w-1/2 mt-5 rounded'} span={24}>

                            <h1 className={'text-center text-xl text-white font-bold'}>Signup using email and password</h1>
                            <form onSubmit={onSignUp}>
                                <Row type={'flex'} align={'center'} className={'mt-5'}>
                                    <Col span={24}>
                                        <input type="email" onChange={(ev) => setEmail(ev.currentTarget.value)} required className={'border-0 w-full rounded'} placeholder={'Email address'}/>
                                    </Col>
                                    <Col span={24} className={'mt-5'}>
                                        <input type="password" value={password} onChange={(ev) => setPassword(ev.currentTarget.value)} required className={'border-0 w-full rounded'} placeholder={'Password'}/>
                                    </Col>
                                    <Col span={24} className={'mt-5'}>
                                        <input type="password" value={retypePassword} onChange={(ev) => setRetypePassword(ev.currentTarget.value)} required className={'border-0 w-full rounded'} placeholder={'Retype Password'}/>
                                        {(password != retypePassword) && <small className={'text-red-500 font-bold'}>Passwords don't match</small>}
                                    </Col>
                                    <Col span={24} className={'mt-5'}>
                                        <Button loading={loading} disabled={password != retypePassword} type="primary" htmlType={'submit'} className={'border-0 w-full rounded font-bold'}>Submit</Button>
                                    </Col>
                                </Row>
                            </form>

                        </Col>}

                    </Row>

                </div>

                {/*<div className={'flex align-center justify-center w-full top-96 absolute z-50 mt-40'} style={{zIndex: `1000`}}>
                    <Row type={'flex'} align={'center'} gutter={24}>

                    </Row>
                </div>*/}



            </div>




        </>
      )
}
