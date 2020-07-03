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

import {Dispatch, SetStateAction} from "react";
import {FileStatus, IFile} from "../_models/File";

export const service = {
    startRetrieving: (cid: string): Error | null => {
        return null
    },
    initiateStoring: (cid: string, duration: number, redundancy: number): Error | null => {
        return null
    },
    downloadFile: (cid: string): Error | null => {
        return null
    },
    reloadFiles: (setFiles: Dispatch<SetStateAction<IFile[]>>) => {
        setFiles([{
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
        },])
    }
}
