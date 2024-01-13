import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  words: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getWords().subscribe(data => {
      this.words = data.words;
    });
  }

  onSelect(word: string): void {
    // Implement your logic when a word is selected
    console.log('Selected word:', word);
  }

  title = 'english-learn-page-angular';
}
