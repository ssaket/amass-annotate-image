import React from 'react';

type SpinnerProps = {
    styleName: string
}
const Spinner = ({styleName}: SpinnerProps) => {

    return <React.Fragment>
        <div className={styleName} role="status">
            <span className="visually-hidden"></span>
        </div>
    </React.Fragment>
}

export default Spinner