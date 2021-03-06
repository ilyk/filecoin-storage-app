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
import upload_to_cloud from "../../_resources/icons/up-arrow-and-cloud.svg";
import React, {MouseEventHandler} from "react";

interface IProps {
    onClick: MouseEventHandler;
}

export const UploadCloudButton = ({onClick}: IProps) =>
    <Button type="button" size="sm" variant="outline-secondary" title="Store to Filecoin" onClick={onClick}>
        <Image src={upload_to_cloud} width={24}/>
    </Button>
