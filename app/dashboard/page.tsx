"use client"
import { useEffect, useRef, useState } from 'react'
const dashboard = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [data, setData] = useState<any>();
    const handlePostMessage = () => {
        iframeRef.current?.contentWindow?.postMessage(JSON.stringify(
            data
        ), "http://localhost:3001/");
    };
    useEffect(() => {
        handlePostMessage()
    }, [data])
    useEffect(() => { loadData() }, [])
    const loadData = async () => {
        try {
            const res = await fetch("/mockData.json");
            const data = await res.json();
            console.log('bbbb', data?.data)
            setData(data?.data);
        } catch (error) {
        }
    }
    return (
        <div className='h-screen'
        >
            <iframe
                ref={iframeRef}
                src="http://localhost:3001/"
                width={'100%'}
                height={'100%'}
            ></iframe>
        </div>
    );
}

export default dashboard