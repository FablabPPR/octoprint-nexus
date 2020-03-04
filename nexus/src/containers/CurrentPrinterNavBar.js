import React from 'react'
import { connect } from 'react-redux'
import Badge from 'react-bootstrap/Badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlug, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from "@reach/router";

import config from '../config.json'
import Button from 'react-bootstrap/Button'

class CurrentPrinterNavBar extends React.PureComponent {
    render = () => (
        <div className="d-flex align-items-center">
            {this.props.id &&
                <>
                    <Link to='/'>
                        <Button size='sm' className='mr-2'>
                            <FontAwesomeIcon icon={faArrowLeft} />&nbsp;
                            Retour
                    </Button>
                    </Link>
                    <div>
                        <Badge variant="success">
                            <FontAwesomeIcon icon={faPlug} />&nbsp;
                        Pilotage de "<span dangerouslySetInnerHTML={{ __html: config.printers[this.props.id].name }}></span>"
                    </Badge>
                    </div>
                </>}
        </div>
    )
}

const mapStateToProps = state => ({
    id: state.printers.current,
})

export default connect(mapStateToProps)(CurrentPrinterNavBar)
