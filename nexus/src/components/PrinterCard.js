import React from 'react'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import update from 'immutability-helper';

import PrinterCardAttributes from './PrinterCardAttributes'
import AlfawiseImage from '../img/alfawise.jpg';
import DagomaImage from '../img/dagoma.jpg';
import { getVersion } from '../api/octoprint'
import { getState } from '../api/printer'

export default class PrinterCard extends React.PureComponent {

    state = {
        ready: false,
        error: false,
        state: {},
    }

    images = {
        alfawise: AlfawiseImage,
        dagoma1: DagomaImage,
        dagoma2: DagomaImage
    }

    componentDidMount = async () => {
        await getVersion(this.props.id)
            .then(response => this.setState(update(this.state, {
                state: {
                    version: { $set: response.data.server }
                }
            }))).catch(() => this.setState({ error: true }))

        await getState(this.props.id)
            .then(response => {
                this.setState(update(this.state, {
                    ready: { $set: true },
                    state: { state: { $set: response.data.state.text } }
                }))
            }).catch(() => {
                this.setState({
                    ready: false,
                    error: true
                })
            })
    }

    render = () => {

        const { id, printer } = this.props
        const { state, error, ready } = this.state

        return (
            <div className="card">
                <Image thumbnail className="card-img-top" src={this.images[id]} />
                <div className="card-body">
                    <h5 className="card-title" dangerouslySetInnerHTML={{ __html: printer.name }} />
                </div>
                <PrinterCardAttributes state={state} printer={id} />
                <div className="card-body d-flex flex-column justify-content-between">
                    <Button variant={error ? 'danger' : 'primary'} disabled={!ready || error} href={`/${id}/`} >
                        {error && 'Connexion impossible'}
                        {!error && !ready && (
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
                </div>
            </div>
        )
    }
}
