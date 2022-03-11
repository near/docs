import React from "react-dom"

const ViewResponse = (props) => {
    return (
        <div>
            {props.response && (
                <div className="display-result">
                    <pre>{JSON.stringify(props.response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};


export default ViewResponse;