import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { get } from 'lodash'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faVideo } from '@fortawesome/free-solid-svg-icons'

import * as PrinterActions from '../actions/printers'
import PrinterCardAttributes from './PrinterCardAttributes'
import AlfawiseImage from '../img/alfawise.jpg';
import DagomaImage from '../img/dagoma.jpg';

class PrinterCard extends React.PureComponent {

    state = {
        showModal: false,
    }

    images = {
        alfawise: AlfawiseImage,
        dagoma1: DagomaImage,
        dagoma2: DagomaImage
    }

    showModal = () => this.setState({ showModal: true })
    hideModal = () => this.setState({ showModal: false })

    componentDidMount = () => {
        this.props.actions.fetchState(this.props.id)
    }

    render = () => {

        const { showModal } = this.state
        const { id, printer, loading, status } = this.props

        const streamUrl = get(status, 'settings.webcam.streamUrl')
        const ready = get(status, 'state.flags.operational')

        return (
            <div className="card">
                <Image thumbnail className="card-img-top" src={this.images[id]} />
                <div className="card-body">
                    <h5 className="card-title" dangerouslySetInnerHTML={{ __html: printer.name }} />
                </div>
                <PrinterCardAttributes status={status} printer={id} />
                <div className="card-body d-flex flex-column justify-content-end">
                    <ButtonGroup>
                        {streamUrl && (
                            <>
                                <Button size='sm' onClick={this.showModal}>
                                    <FontAwesomeIcon icon={faVideo} />
                                </Button>
                                <Modal
                                    size="lg"
                                    show={showModal}
                                    onHide={this.hideModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>
                                            Webcam
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="d-flex justify-content-center">
                                        <img className="img-fluid" src={streamUrl} alt="webcam" />
                                    </Modal.Body>
                                </Modal>
                            </>
                        )}
                        <Button
                            size="sm"
                            variant={loading ? 'secondary' : (ready ? 'primary' : 'danger')}
                            disabled={!ready}
                            href={`/${id}/`} >
                            {loading && <><Spinner as="span" size="sm" animation="border" />&nbsp;Connexion en cours ...</>}
                            {!loading && !ready && 'Connexion impossible'}
                            {!loading && ready && <><FontAwesomeIcon icon={faSignInAlt} />&nbsp;Piloter</>}
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(PrinterActions, dispatch),
})

const mapStateToProps = (state, props) => ({
    ...state.printers[props.id],
})

export default connect(mapStateToProps, mapDispatchToProps)(PrinterCard)
