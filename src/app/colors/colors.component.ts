import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

const COLORS = [
  {
    id: '1',
    name: 'Red',
    hex: '#ff0000',
  },
  {
    id: '2',
    name: 'Green',
    hex: '#00ff00',
  },
  {
    id: '3',
    name: 'Blue',
    hex: '#0000ff',
  },
];

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss'],
})
export class ColorsComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource(COLORS);
  public displayColumns = ['id', 'name', 'hex'];

  @ViewChild(MatSort) public matSort: MatSort;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.matSort;
  }
}
