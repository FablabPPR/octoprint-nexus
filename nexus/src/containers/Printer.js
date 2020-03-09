import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as PrinterActions from '../actions/printers'

class Printer extends React.PureComponent {

    componentDidMount = () => {
        this.props.actions.selectPrinter(this.props.id)
    }

    render = () => (
        <iframe title="Octoprint" src={`/${this.props.id}/`}></iframe>
    )
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(PrinterActions, dispatch),
})


export default connect(null, mapDispatchToProps)(Printer)
