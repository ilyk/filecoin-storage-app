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

import { useToasts } from 'react-toast-notifications'
import React from "react";
import {Button} from "react-bootstrap";

interface IProps {
    content: string
}
export const Toast = ({ content }: IProps) => {
    const { addToast } = useToasts()
    return <Button onClick={() => addToast(content, {
        appearance: 'error',
        autoDismiss: true,
    })}>
        Add Toast
    </Button>
}
