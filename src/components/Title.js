import React from 'react';

const Title = ({name, title}) => {
    
        return (
            <div className="row">
                <div className="col-10 mx-auto my-2 text-center">
                    <h1 className="font-weight-bold title">
                        {name} <strong className="text-pink">{title}</strong>
                    </h1>
                </div>
            </div>
        )
    
}

export default Title;