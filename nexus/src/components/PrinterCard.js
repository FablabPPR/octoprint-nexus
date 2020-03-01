import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faVideo } from '@fortawesome/free-solid-svg-icons'
import update from 'immutability-helper';

import PrinterCardAttributes from './PrinterCardAttributes'
import AlfawiseImage from '../img/alfawise.jpg';
import DagomaImage from '../img/dagoma.jpg';
import { getVersion, getSettings, getConnection } from '../api/octoprint'
import { isReady } from '../octoprint/states'

export default class PrinterCard extends React.PureComponent {

    state = {
        ready: undefined,
        error: false,
        state: {},
        showModal: false,
    }

    images = {
        alfawise: AlfawiseImage,
        dagoma1: DagomaImage,
        dagoma2: DagomaImage
    }

    showModal = () => this.setState({ showModal: true })
    hideModal = () => this.setState({ showModal: false })

    componentDidMount = async () => {
        await getVersion(this.props.id)
            .then(response => this.setState(update(this.state, {
                state: {
                    version: { $set: response.data.server }
                }
            }))).catch(() => this.setState({ error: true }))

        await getConnection(this.props.id).then(response => {
            if (response.data.current.state) {
                this.setState(update(this.state, {
                    ready: {$set: isReady(response.data.current.state)},
                    state: {state: {$set: response.data.current.state}}
                }))
            }
        }).catch(() => {
            this.setState({
                ready: false,
                error: true
            })
        })

        getSettings(this.props.id).then(response => {
            if (response.data.webcam.streamUrl !== '') {
                this.setState(update(this.state, {
                    state: {
                        webcam: { $set: response.data.webcam.streamUrl }
                    }
                }))
            }
        })
    }

    render = () => {

        const { id, printer } = this.props
        const { state, error, ready, showModal } = this.state

        return (
            <div className="card">
                <Image thumbnail className="card-img-top" src={this.images[id]} />
                <div className="card-body">
                    <h5 className="card-title" dangerouslySetInnerHTML={{ __html: printer.name }} />
                </div>
                <PrinterCardAttributes state={state} printer={id} />
                <div className="card-body d-flex flex-column justify-content-end">
                    <ButtonGroup>
                        {state.webcam && (
                            <>
                                <Button onClick={this.showModal}>
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
                                        <img className="img-fluid" src={state.webcam} alt="webcam" />
                                    </Modal.Body>
                                </Modal>
                            </>
                        )}
                        <Button variant={ready ? 'primary' : 'danger'} disabled={!ready || error} href={`/${id}/`} >
                            {(error || ready === false) && 'Connexion impossible'}
                            {!error && ready === undefined && (
                                <>
                                    <Spinner as="span" size="sm" animation="border" />
                                    Connexion en cours ...
                                </>
                            )}
                            {!error && ready && (
                                <>
                                    <FontAwesomeIcon icon={faSignInAlt} />&nbsp;
                                    Piloter
                                </>
                            )}
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        )
    }
}
