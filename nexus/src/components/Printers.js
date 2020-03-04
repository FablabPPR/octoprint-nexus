import React from 'react'

import './scss/Printers.scss'
import config from '../config.json'
import PrinterCard from './PrinterCard';

export default class Printers extends React.PureComponent {

    onSelect = id => {
        console.log('Printer ' + id + ' selected')
        this.props.navigate('/p/' + id)
    }

    render = () => (
        <main role="main" className="container">
            <div className="row justify-content-around printers">
                {Object.entries(config.printers).map(printerConfig =>
                    <PrinterCard
                    onSelect={() => this.onSelect(printerConfig[0])}
                    key={printerConfig[0]}
                    id={printerConfig[0]}
                    printer={printerConfig[1]}/>
                )}
            </div>
        </main>
    )
}
