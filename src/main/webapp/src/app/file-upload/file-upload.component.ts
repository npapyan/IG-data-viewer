import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() isFormValid: boolean = false;
  @Input() httpParams: HttpParams = new HttpParams;

  fileName = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
  const file: File = event.target.files[0]
  this.fileName = file.name;
  const formData = new FormData();
  formData.append("thumbnail", file);
  const upload$ = this.http.post("http://localhost:8080/upload/new", formData, {responseType: 'text', params: this.httpParams});
  upload$.subscribe();
  }

}
