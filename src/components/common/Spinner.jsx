import React, {useSate} from 'react';
import PropTypes from 'prop-types';

const Spinner = ({styleName}) => {

    return <React.Fragment>
        <div className={styleName} role="status">
            <span className="visually-hidden"></span>
        </div>
    </React.Fragment>
}

Spinner.propTypes = {
    styleName: PropTypes.string.isRequired
}

export default Spinner