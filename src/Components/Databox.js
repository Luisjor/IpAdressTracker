import React from 'react'

export default function Databox(props) {

    /* Props passed here: 
        Data=           {publicData.position}
        IP=             {publicData.IP}
        ISP=            {publicData.ISP}
        Timezone=       {publicData.Timezone}
        City=           {publicData.City}
        Country=        {publicData.Country}
        handleClick=    {() => handleSubmit}
        handleChange=   {() => handleChange
    */


    return (
        // Bootstrap position Absolute, in the middle and bottom of Div. "resultsbox" is styled in index.css
            <div className='position-absolute top-100 start-50 translate-middle resultsBox'>
                <div className='dataBoxComponents'>
                    <h2>IP Adress</h2>
                    <h3> {props.IP} </h3>

                </div>
                
                <div className='dataBoxComponents'>
                    <h2>Location</h2>
                    <h3>{props.City}, {props.Country} </h3>
                </div>

                <div className='dataBoxComponents'>
                    <h2>Time Zone</h2>
                    <h3>{props.Timezone}</h3>
                </div>

                <div className='dataBoxComponentsFinal'>
                    <h2>ISP</h2>
                    <h3>{props.ISP}</h3>
                </div>
            </div>
    )
}