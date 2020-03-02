import React from 'react'

import './scss/Printers.scss'
import config from '../config.json'
import PrinterCard from './PrinterCard';

export default class Printers extends React.PureComponent {
    render = () => (
        <div className="row justify-content-around printers">
            {Object.entries(config.printers).map(printerConfig =>
                <PrinterCard
                key={printerConfig[0]}
                id={printerConfig[0]}
                printer={printerConfig[1]}/>
            )}
        </div>
    )
}
