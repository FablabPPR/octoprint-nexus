import React from 'react'

export default class PrinterCardAttributes extends React.PureComponent {
    render = () => (
        <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
                <span>Octoprint Version</span>
                <span className={
                    "badge " +
                    (this.props.state.version ? 'badge-secondary' : 'badge-danger')
                }>{this.props.state.version || 'Unknown'}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span>Status</span>
                <span className={
                    "badge " +
                    (this.props.state.state ? 'badge-success' : 'badge-danger')
                }>
                    {this.props.state.state || 'Unknown'}</span>
            </li>
        </ul>
    )
}
