import { AfterViewInit, Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ResultListComponent } from '../result-list/result-list.component';

@Component({
  selector: 'app-compare-data',
  templateUrl: './compare-data.component.html',
  styleUrls: ['./compare-data.component.scss']
})
export class CompareDataComponent implements OnInit {
  uploadTypeList: any = ['Follower List', 'Following List']
  uploadList1: any = [];
  uploadList2: any = [];
  userList1: any = [];
  userList2: any = [];
  comparedList: any = [];
  columnDefs : any[] = ['name','username'];
  getUploadListUrl = 'http://localhost:8080/upload/get-upload'
  getAllUploadsUrl = 'http://localhost:8080/upload/get-uploads'
  getUserListUrl = 'http://localhost:8080/account/get-user-list'
  compareListsUrl = 'http://localhost:8080/account/compare-lists'

  dataSource1 = new MatTableDataSource<any>(this.userList1);
  dataSource2 = new MatTableDataSource<any>(this.userList2);
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  @ViewChild(MatPaginator) paginator2: MatPaginator;

  igDataCompare = new FormGroup({
    username: new FormControl(''),
    uploadDate1: new FormControl(''),
    uploadType1: new FormControl(''),
    selectList1: new FormControl('', [Validators.required]),
    uploadDate2: new FormControl(''),
    uploadType2: new FormControl(''),
    selectList2: new FormControl('', [Validators.required])
  })

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUploads().subscribe( (httpResponse) => {
    this.uploadList1 = httpResponse;
    this.uploadList2 = this.uploadList1;
    this.dataSource1.paginator = this.paginator1;
    this.dataSource2.paginator = this.paginator2;
    });
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.uploadList1 = this.getUploadList(this.buildCompareFormHeader(1));
    this.uploadList2 = this.getUploadList(this.buildCompareFormHeader(2));
  }

  getUploadList(params: HttpParams) {
    return this.http.get(this.getUploadListUrl, {params});
  }

  getAllUploads() {
    return this.http.get(this.getAllUploadsUrl);
  }

  getUserList(params: HttpParams) {
    return this.http.get(this.getUserListUrl, {params});
  }

  getCompareListsResult(params: HttpParams) {
    return this.http.get(this.compareListsUrl, {params});
  }

  buildCompareFormHeader(type: number) {
    if (type === 1) {
      const formHeader = new HttpParams()
      .set('username', this.igDataCompare.controls.username.value || "")
      .set('uploadDate', this.igDataCompare.controls.uploadDate1.value || "")
      .set('uploadType', this.igDataCompare.controls.uploadType1.value || "")
      return formHeader
    } else {
      const formHeader = new HttpParams()
      .set('username', this.igDataCompare.controls.username.value || "")
      .set('uploadDate', this.igDataCompare.controls.uploadDate2.value || "")
      .set('uploadType', this.igDataCompare.controls.uploadType2.value || "");
      return formHeader
    }
  }

  buildUserListParams(uploadId: number, uploadType: string) {
      const userListParams = new HttpParams()
      .set('uploadId', uploadId || "")
      .set('uploadType', uploadType || "");
      return userListParams;
  }

  buildCompareListsParams() {
    let list1 = this.igDataCompare.controls.selectList1.value;
    let list2 = this.igDataCompare.controls.selectList2.value;
    let list1Arr = list1.split(" | ");
    let list2Arr = list2.split(" | ");
    console.log(this.igDataCompare.controls.selectList2.value);
    console.log(this.igDataCompare.controls.selectList1.value);
    const compareParams = new HttpParams()
    .set('uploadId1', list1Arr[2] || "")
    .set('uploadType1', list1Arr[1] || "")
    .set('uploadId2', list2Arr[2] || "")
    .set('uploadType2', list2Arr[1] || "");
    return compareParams;
  }

  onListChange1(event: any): void {
    let value = event.target.value;
    let valueArr = [];
    valueArr = value.split(" | ")
    this.getUserList(this.buildUserListParams(valueArr[2], valueArr[1])).subscribe( (httpResponse) => {
      this.userList1 = httpResponse; // TODO: Delete if not used anywhere else
      this.dataSource1.data = this.userList1;
    })
  }

  onListChange2(event: any): void {
    let value = event.target.value;
    let valueArr = [];
    valueArr = value.split(" | ")
    this.getUserList(this.buildUserListParams(valueArr[2], valueArr[1])).subscribe( (httpResponse) => {
      this.userList2 = httpResponse;
      this.dataSource2.data = this.userList2;
    })
  }

  onCompareClick() {
    this.getCompareListsResult(this.buildCompareListsParams()).subscribe( (httpResponse) => {
      this.comparedList = httpResponse;
      const dialogRef = this.dialog.open(ResultListComponent, { height: '400px', width: '600px'});
      (<ResultListComponent>dialogRef.componentInstance).displayList = this.comparedList;
    });

  }

}
