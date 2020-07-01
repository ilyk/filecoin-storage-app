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
import {Container, Table} from "react-bootstrap";
import {DownloadButton, DownloadCloudButton, UploadCloudButton} from "../Components/Buttons";
import {Spinner} from "../Components/Spinner";
import {RetrieveFileModal} from "../Components/Modals/RetrieveFile";
import {FileStatus, IFile} from "../_models/File";

interface IProps {
}

interface IModal {
    show: boolean;
    toggle: Function;
    file: IFile | null;
}

interface IModals {
    retrieve: IModal;
    // upload: IModal;
    // store: IModal;
}

interface IState {
    files: IFile[];
    modals: IModals;
}

export class FilesPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            files: [{
                cid: "basdasdfgfsdsgfagsdfhsdfasfgas",
                status: FileStatus.OnServer,
                miners: 0,
                price: 0,
                duration: 0,
                total: 0,
                size: 0,
            }, {
                cid: "basdasdfgfsdsgfagsdfhsdfasfgas",
                status: FileStatus.Downloading,
                miners: 12,
                price: 0.5078,
                duration: 10,
                total: 60.936,
                size: 126976,
            }, {
                cid: "basdasdfgfsdsgfagsdfhsdfasfgas",
                status: FileStatus.Sealed,
                miners: 8,
                price: 12.3,
                duration: 10,
                total: 984,
                size: 545259520,
            }, {
                cid: "basdasdfgfsdsgfagsdfhsdfasfgas",
                status: FileStatus.Staged,
                miners: 3,
                price: 3,
                duration: 10,
                total: 90,
                size: 3221225472,
            }, {
                cid: "basdasdfgfsdsgfagsdfhsdfasfgas",
                status: FileStatus.Downloaded,
                miners: 12,
                price: 0.000117,
                duration: 10,
                total: 0.01404,
                size: 125952,
            },],
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
                }
            }
        }
    }

    render() {
        return <Container fluid className="mt-4"><Table bordered hover>
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
                <td align="center">{file.status}</td>
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
            return <UploadCloudButton/>
        case FileStatus.Downloading:
            return <Spinner/>
        case FileStatus.Sealed:
        case FileStatus.Staged:
            return <DownloadCloudButton onClick={() => modals.retrieve.toggle(file)}/>
        case FileStatus.Uploading:
            return <Spinner/>
        case FileStatus.Downloaded:
            return <DownloadButton/>
    }

    return <span/>
}
