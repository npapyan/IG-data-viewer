import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ig-main',
  templateUrl: './ig-main.component.html',
  styleUrls: ['./ig-main.component.scss']
})
export class IgMainComponent implements OnInit {
  uploadTypeList: any = ['Follower List', 'Following List']

  igForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    uploadDate: new FormControl('', [Validators.required]),
    uploadType: new FormControl('', [Validators.required])
  })

  constructor(private formBuilder: FormBuilder, private titleService: Title) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.setTitle('IG Stats');
  }

  buildFormHeader() {
  const formHeader = new HttpParams()
  .set('username', this.igForm.controls.username.value || "")
  .set('uploadDate', this.igForm.controls.uploadDate.value || "")
  .set('uploadType', this.igForm.controls.uploadType.value || "");
  return formHeader;
  }

}
