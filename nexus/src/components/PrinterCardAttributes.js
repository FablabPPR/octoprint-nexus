import React from 'react'
import Badge from 'react-bootstrap/Badge'
import { get } from 'lodash'

export default class PrinterCardAttributes extends React.PureComponent {

    render = () => {

        const ready = get(this.props.status, 'state.flags.operational')
        const version = get(this.props.status, 'version.server')
        const state = get(this.props.status, 'state.text')

        return (
            <ul className="printer-card-attributes list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span>Version</span>
                    <Badge variant={version ? 'primary' : 'danger'}>
                        {version || 'Unknown'}
                    </Badge>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Status</span>
                    <Badge variant={ready ? 'success' : 'danger'}>
                        {state || 'Offline'}
                    </Badge>
                </li>
            </ul>
        )
    }
}
