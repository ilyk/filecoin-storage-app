/*
 * Copyright 2020 Ievgen Pervushyn
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import {Container, Spinner, Table} from "react-bootstrap";
import {DownloadButton, DownloadCloudButton, UploadCloudButton} from "../Components/Buttons";
import {RetrieveFileModal, StoreFileModal} from "../Components/Modals";
import {FileStatus, IFile} from "../_models/File";
import {service} from "../_service/backend";
import {Subscription} from "rxjs";
import {FileStatusComponent} from "../Components/FileStatus";

interface IProps {
}

interface IModal {
    show: boolean;
    toggle: Function;
    file: IFile | null;
}

interface IModals {
    retrieve: IModal;
    store: IModal;
}

interface IState {
    files: IFile[];
    modals: IModals;
}

export class FilesPage extends React.Component<IProps, IState> {
    private subscriptions: Subscription[] = [];

    constructor(props: IProps) {
        super(props);
        this.state = {
            files: [],
            modals: {
                retrieve: {
                    file: null,
                    show: false,
                    toggle: (file: IFile | null) => {
                        const modals = this.state.modals;
                        modals.retrieve.show = file != null
                        modals.retrieve.file = file
                        this.setState({modals: modals})
                    }
                },
                store: {
                    file: null,
                    show: false,
                    toggle: (file: IFile | null) => {
                        const modals = this.state.modals;
                        modals.store.show = file != null
                        modals.store.file = file
                        this.setState({modals: modals})
                    }
                }
            }
        }
    }

    componentWillUnmount() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe()
        }
    }

    componentDidMount() {
        this.subscriptions.push(
            service.files.subscribe(files => this.setState({files: files}))
        )
        service.reloadFiles()
    }

    render() {
        return <Container fluid className="mt-4"><Table bordered hover responsive>
            <thead className="bg-dark text-light">
            <tr>
                <th>CID</th>
                <th align="center">Status</th>
                <th align="center">Miners</th>
                <th align="center">Price</th>
                <th align="center">Duration</th>
                <th align="center">Total</th>
                <th align="center">File Size</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {this.state.files.map((file, idx) => <tr key={idx}>
                <td>{file.cid}</td>
                <td align="center"><FileStatusComponent file={file}/></td>
                <td align="center">{file.miners}</td>
                <td align="center">{file.price}</td>
                <td align="center">{file.duration}</td>
                <td align="center">{file.total}</td>
                <td align="center">{file.size}</td>
                <td align="center"><FileActions file={file} modals={this.state.modals}/></td>
            </tr>)}
            </tbody>
        </Table>
            <RetrieveFileModal
                toggle={this.state.modals.retrieve.toggle}
                show={this.state.modals.retrieve.show}
                file={this.state.modals.retrieve.file}/>
            <StoreFileModal
                toggle={this.state.modals.store.toggle}
                show={this.state.modals.store.show}
                file={this.state.modals.store.file}/>
        </Container>;
    }
}

interface IFileActionsProps {
    file: IFile;
    modals: IModals
}

const FileActions = ({file, modals}: IFileActionsProps): JSX.Element => {
    switch (file.status) {
        case FileStatus.OnServer:
            return <UploadCloudButton onClick={() => modals.store.toggle(file)}/>
        case FileStatus.Retrieving:
            return <Spinner animation="border"/>
        case FileStatus.Sealed:
        case FileStatus.Staged:
            return <DownloadCloudButton onClick={() => modals.retrieve.toggle(file)}/>
        case FileStatus.Uploading:
            return <Spinner animation="border"/>
        case FileStatus.Retrieved:
            return <DownloadButton/>
    }

    return <span/>
}
