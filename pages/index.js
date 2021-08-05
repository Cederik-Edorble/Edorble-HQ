import React, { useState, useEffect } from 'react';
import {
  Button, Col, notification, Row 
} from 'antd';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AUTH_USER, CREATE_USER } from '../GraphQL/user/query';
import {
  EARTH_ICON, MAIN_VIDEO, MAIN_VIDEO_WEB, PRELOAD_IMG 
} from '../commons/Content';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('login');
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin');
  const [retypePassword, setRetypePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const authHandler = (data) => {
    const { authUser, createUser } = data;
    setLoading(false);
    if (authUser || createUser) {
      const token = authUser?.token || createUser?.token;
      const userId = authUser?.id || createUser?.id;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      window.location.href = '/dashboard';
    } else {
      notification.error({
        message: 'Password error',
        description:
          'Email or password not current',
      });
    }
  };
  const [authUser] = useLazyQuery(AUTH_USER, {
    onCompleted: (data) => authHandler(data),
    onError: () => notification.error({
      message: 'Error',
      description:
        'Error on authorization',
    })

  });
  const [registrationUser] = useMutation(CREATE_USER, {
    onCompleted: (data) => authHandler(data),
    onError: () => notification.error({
      message: 'Error',
      description:
        'Error on registration',
    })
  });
  useEffect(() => {
    if (window) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (token && userId) {
        window.location.href = '/dashboard';
      }
    }
  }, []);

  const onSignIn = (ev) => {
    ev.preventDefault();
    setLoading(true);
    authUser({
      variables: {
        email,
        password
      }
    });
  };
  const onSignUp = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    await registrationUser({
      variables: {
        email,
        password
      }
    });
  };

  return (
    <>
      <video
        autoPlay
        loop
        style={{
          backgroundImage: `url(${PRELOAD_IMG})`,
          objectFit: 'cover',
          width: '100vw',
          position: 'fixed',
          height: '100vh',
          top: 0
        }}
        muted
        playsInline
        data-wf-ignore="true"
        data-object-fit="cover"
      >
        <source
          src={MAIN_VIDEO}
          data-wf-ignore="true"
        />
        <source
          src={MAIN_VIDEO_WEB}
          data-wf-ignore="true"
        />
      </video>

      <div className="centered">

        <div className="flex align-center justify-center w-full z-50 mt-10" style={{ zIndex: '1000'}}>
          <h1 className="text-center text-6xl md:text-8xl font-bold text-edorble-500">
            ed
            <span>
              <img
                className="inline animate-spin-slow w-20 mr-1 ml-1"
                src={EARTH_ICON}
                alt=""
              />
            </span>
            rble
          </h1>
        </div>

        <div
          className="flex align-center justify-center w-screen z-50 mt-10"
          style={{ zIndex: '1000'}}
        >
          <Row type="flex" align="center" gutter={24} className="w-full md:w-1/2 lg:w-1/3 p-2">
            <Col>
              <Button
                ghost={currentTab !== 'login'}
                onClick={() => setCurrentTab('login')}
                size="large"
                type={currentTab === 'login' ? 'primary' : 'default'}
                className="font-bold"
              >
                Log In
              </Button>
            </Col>
            <Col>
              <Button
                size="large"
                type={currentTab === 'signup' ? 'primary' : 'default'}
                onClick={() => setCurrentTab('signup')}
                ghost={currentTab !== 'signup'}
                className="font-bold"
              >
                Sign Up
              </Button>
            </Col>

            {currentTab === 'login'
            && (
            <Col
              className="p-2 bg-gradient-to-r from-edorble-600 via-edorble-300 to-edorble-600 w-1/2 mt-5 rounded"
              span={24}
            >

              <h1 className="text-center text-xl text-white font-bold">Login using email and password</h1>
              <form onSubmit={onSignIn}>
                <Row type="flex" align="center" className="mt-5">
                  <Col span={24}>
                    <input
                      type="email"
                      value={email}
                      onChange={(ev) => setEmail(ev.currentTarget.value)}
                      required
                      className="border-0 w-full rounded"
                      placeholder="Email address"
                    />
                  </Col>
                  <Col span={24} className="mt-5">
                    <input
                      type="password"
                      value={password}
                      onChange={(ev) => setPassword(ev.currentTarget.value)}
                      required
                      className="border-0 w-full rounded"
                      placeholder="Password"
                    />
                  </Col>
                  <Col span={24} className="mt-5">
                    <Button
                      loading={loading}
                      htmlType="submit"
                      className="border-0
                      bg-edorble-yellow-500
                      hover:bg-edorble-yellow-600
                      hover:text-black
                      w-full rounded
                      font-bold"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </form>

            </Col>
            )}

            {currentTab === 'signup'
            && (
            <Col
              className="p-2 bg-gradient-to-r from-edorble-600 via-edorble-300 to-edorble-600 w-1/2 mt-5 rounded"
              span={24}
            >
              <h1 className="text-center text-xl text-white font-bold">Signup using email and password</h1>
              <form onSubmit={onSignUp}>
                <Row type="flex" align="center" className="mt-5">
                  <Col span={24}>
                    <input
                      type="email"
                      value={email}
                      onChange={(ev) => setEmail(ev.currentTarget.value)}
                      required
                      className="border-0 w-full rounded"
                      placeholder="Email address"
                    />
                  </Col>
                  <Col span={24} className="mt-5">
                    <input
                      type="password"
                      value={password}
                      onChange={(ev) => setPassword(ev.currentTarget.value)}
                      required
                      className="border-0 w-full rounded"
                      placeholder="Password"
                    />
                  </Col>
                  <Col span={24} className="mt-5">
                    <input
                      type="password"
                      value={retypePassword}
                      onChange={(ev) => setRetypePassword(ev.currentTarget.value)}
                      required
                      className="border-0 w-full rounded"
                      placeholder="Retype Password"
                    />
                    {(password !== retypePassword)
                    && <small className="text-red-500 font-bold">Passwords don&apos;t match</small>}
                  </Col>
                  <Col span={24} className="mt-5">
                    <Button
                      loading={loading}
                      htmlType="submit"
                      disabled={password !== retypePassword}
                      className="border-0
                      bg-edorble-yellow-500
                      hover:bg-edorble-yellow-600
                      hover:text-black w-full
                      rounded font-bold"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </form>
            </Col>
            )}
          </Row>
        </div>
      </div>
    </>
  );
}
