import React, { useState } from 'react'
import { Stack } from 'react-bootstrap'
import { fb } from './frontend'
import Battery from './components/Battery';
import Time from './components/Time';
function ShowVisualData(props) {
    return (
        <div>
            <img draggable='true' className='pe-none user-select-none streamImg' src={props.stream} />
        </div>
    )
}
function getBase64FromData(data) {
    if (data)
        if (data.indra)
            if (data.indra.photo)
                return (data.indra.photo);
    return process.env.REACT_APP_NO_SIGNAL
}
function ShowStream(props) {

    console.log(getBase64FromData(props.lokData))
    return (
        <div className='showstream px-sm-5 px-1 py-1'>
            <div className='d-flex justify-content-between pe-none user-select-none'>
                <Time />
                <Battery battery={props.battery} />
            </div>
            {props.user &&
                <div>
                    <Stack direction="horizontal"
                        className='flex-wrap justify-content-between'>
                        {props.user.displayName &&
                            <div>Hey {props.user.displayName},</div>
                        }
                        {props.user.email &&
                            <div>watching the stream as {props.user.email}</div>
                        }

                    </Stack>
                </div>
            }
            <div className='container'>
                <ShowVisualData stream={getBase64FromData(props.lokData)} />
            </div>
        </div>
    )
}

export default ShowStream