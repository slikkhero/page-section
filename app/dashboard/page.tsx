"use client"
import { useEffect, useRef, useState } from 'react'
const dashboard = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [data, setData] = useState<any>();
    const handlePostMessage = () => {
        iframeRef.current?.contentWindow?.postMessage(JSON.stringify(
            data
        ), "https://page-section.vercel.app");
    };
    useEffect(() => { loadData() }, [])
    const loadData = async () => {
        try {
            const res = await fetch("/mockData.json");
            const data = await res.json();
            setData(data.data);
        } catch (error) {
        }

    }
    return (
        <div>
            <iframe
                ref={iframeRef}
                src="https://page-section.vercel.app/"
                width={'100%'}
                height={'100%'}
            ></iframe>
            <button type='button' onClick={handlePostMessage}>post</button>
        </div>
    );
}

export default dashboard