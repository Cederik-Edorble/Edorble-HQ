import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import {Button, Col, Divider, Row} from 'antd';

export default function Home() {
  return (
    <>

        {/*<br/>*/}
        {/*<br/>*/}
        {/*<br/>*/}
        {/*<br/>*/}
        {/*<br/>*/}
        {/*<h1 className={'text-center text-4xl md:text-8xl font-bold text-edorble-500'}>*/}
        {/*    ed<span>*/}
        {/*    <img className={'inline animate-spin-slow w-1/6 md:w-min'} src="https://uploads-ssl.webflow.com/55aa9b26d5a90967531209a8/55e4db7b10c87b29299f26aa_Edorble-LogoOnly.png" alt=""/>*/}
        {/*</span>rble*/}
        {/*</h1>*/}

        {/*<Row type={'flex'} align={'center'}>*/}
        {/*    <Col span={14}>*/}
        {/*        <Divider />*/}
        {/*    </Col>*/}
        {/*</Row>*/}

        {/*<br/>*/}
        {/*<br/>*/}
        {/*<br/>*/}


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


            <div className={'flex align-center justify-center w-full top-96 absolute z-50 mt-10'} style={{zIndex: `1000`}}>


                <Row type={'flex'} align={'center'} gutter={24}>
                    <Col>
                        <Button size={'large'} type={'primary'} className={'font-bold'}>Sign In</Button>
                    </Col>
                    <Col>
                        <Button size={'large'} type={'primary'} className={'font-bold'}>Sign Up</Button>
                    </Col>
                </Row>

            </div>

            {/*<Row type={'flex'} align={'center'} gutter={24} style={{position: 'absolute', zIndex: 10000, bottom: '100px', left: '30vw'}}>*/}


        </div>




    </>
  )
}
