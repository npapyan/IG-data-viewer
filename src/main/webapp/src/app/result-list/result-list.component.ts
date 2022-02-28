import { Component, OnInit, Input } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
  @Input() displayList: any = [];

  columnDefs: any[] = ['username'];
  dataSource = new MatTableDataSource<any>(this.displayList);

  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = this.displayList;
  }

}
