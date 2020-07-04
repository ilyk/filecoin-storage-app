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

import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBar} from "../Navigation";
import {FilesPage} from '../Page';
import {GetFileModal, UploadFileModal} from "../Components/Modals";
import {Footer} from "../Navigation/Footer";
import {service} from "../_service/backend";
import {ToastProvider} from "react-toast-notifications";

export const App = () => {
    const [showUpload, showHideUpload] = useState(false)
    const [showGet, showHideGet] = useState(false)

    return <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        placement="top-center"
    >
        <NavBar showUpload={showUpload} showHideUpload={showHideUpload} showGet={showGet} showHideGet={showHideGet}/>
        <FilesPage/>
        <Footer/>

        <UploadFileModal toggle={(uploaded: boolean) => {
            showHideUpload(!showUpload)
            if (uploaded) {
                service.reloadFiles()
            }
        }} show={showUpload}/>
        <GetFileModal toggle={() => showHideGet(!showGet)} show={showGet}/>
    </ToastProvider>;
}
