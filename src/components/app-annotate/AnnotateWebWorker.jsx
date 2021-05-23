import React from 'react';
import WebWorker from "react-webworker"

const AnnotateWebWorker = () => {
    return (<WebWorker url="/js/cv.worker.js">
        {({ data, error, postMessage, updatedAt, lastPostAt }) => (
            <div>
                {data && (
                    <div>
                        <strong>Received some data:</strong>
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </div>
                )}
                <button onClick={() => postMessage("hello")} disabled={updatedAt < lastPostAt}>
                    {updatedAt < lastPostAt ? "Loading..." : "Go"}
                </button>
            </div>
        )}
    </WebWorker>);
}

export default AnnotateWebWorker