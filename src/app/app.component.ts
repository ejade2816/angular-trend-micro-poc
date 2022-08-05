import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'angular-trend-micro-poc';

    file?: File;
    fileName?: string;
    fileSize?: number;
    fileType?: string;
    isLoading: boolean = false;

    constructor(private http: HttpClient) { }

    onFileSelected(event: any) {

        const file: File = event.target.files[0];
        if (file) {
            console.log(file)
            this.file = file
            this.fileName = file.name
            this.fileSize = file.size
            this.fileType = file.type
        }
    }

    onUpload() {
        console.log("onUpload")

        this.isLoading = true;
        const formData = new FormData();
        formData.append("document", this.file!);
        this.http.post("/api/document-upload", formData).subscribe(res => {
            console.log(res)
            this.isLoading = false;
        });
    }
}
