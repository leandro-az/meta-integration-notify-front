import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Note } from '../models/note';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  @Input() notes: Note[] | undefined;
  displayedColumns: string[] = ['position', 'title', 'date'];
  dataSource: MatTableDataSource<Note> | undefined;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator | null;

  constructor() {}

  ngOnInit() {
    if (!this.dataSource || !this.dataSource.paginator) return;
    this.dataSource = new MatTableDataSource<Note>(this.notes);
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    if (!this.dataSource) return;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
