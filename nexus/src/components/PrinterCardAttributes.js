import React from 'react'
import Badge from 'react-bootstrap/Badge'

import { isReady } from '../octoprint/states'

export default class PrinterCardAttributes extends React.PureComponent {
    render = () => (
        <ul className="printer-card-attributes list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
                <span>Version</span>
                <Badge variant={this.props.state.version ? 'primary' : 'danger'}>
                    {this.props.state.version || 'Unknown'}
                </Badge>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span>Status</span>
                <Badge variant={isReady(this.props.state.state) ? 'success' : 'danger'}>
                    {this.props.state.state || 'Unknown'}
                </Badge>
            </li>
        </ul>
    )
}
