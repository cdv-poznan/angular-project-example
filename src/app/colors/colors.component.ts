import {HttpClient} from '@angular/common/http';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

interface Color {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

interface ColorsResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Color[];
}

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss'],
})
export class ColorsComponent implements OnInit, AfterViewInit {
  public dataSource: MatTableDataSource<Color> = new MatTableDataSource([]);
  public displayColumns = ['id', 'name', 'color'];
  public loading = true;

  @ViewChild(MatSort) public matSort: MatSort;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getColors(1).subscribe(colors => {
      this.dataSource.data = colors;

      this.getColors(2).subscribe(data => {
        this.dataSource.data = [...this.dataSource.data, ...data];
        this.loading = false;
      });
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.matSort;
  }

  private getColors(page: number): Observable<Color[]> {
    const url = `https://reqres.in/api/colors?delay=3?page=${page}`;
    return this.httpClient.get<ColorsResponse>(url).pipe(map(response => response.data));
  }
}
