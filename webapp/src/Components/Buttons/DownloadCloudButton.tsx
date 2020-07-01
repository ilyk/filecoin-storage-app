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

import {Button, Image} from "react-bootstrap";
import download_from_cloud from "../../_resources/icons/downloading-from-computing-cloud.svg";
import React, {MouseEventHandler} from "react";

interface IProps {
    onClick: MouseEventHandler;
}

export const DownloadCloudButton = ({onClick}: IProps) =>
    <Button type="button" size="sm" variant="outline-secondary" title="Retrieve from Filecoin" onClick={onClick}>
        <Image src={download_from_cloud} width={24}/>
    </Button>
