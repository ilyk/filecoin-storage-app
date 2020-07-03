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

package main

import (
	"context"
	"go.uber.org/fx"
	"ilyk.im/fil/storage/services/file/upload"
	"net/http"
)

func main() {
	fx.New(
		fx.Provide(upload.NewTusUploader),
		fx.Invoke(registerHttp),
	).Run()
}

func registerHttp(lifecycle fx.Lifecycle, uploader upload.Handler) {
	mux := http.NewServeMux()
	server := http.Server{
		Addr:    ":8080",
		Handler: mux,
	}
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	fileUploadPrefix := "/api/files/"
	mux.Handle(fileUploadPrefix, http.StripPrefix(fileUploadPrefix, uploader.Handler(fileUploadPrefix)))

	lifecycle.Append(
		fx.Hook{
			OnStart: func(context.Context) error {
				//goland:noinspection GoUnhandledErrorResult
				go server.ListenAndServe()
				return nil
			},
			OnStop: func(ctx context.Context) error {
				return server.Shutdown(ctx)
			},
		},
	)
}
