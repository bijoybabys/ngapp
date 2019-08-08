import { Component } from '@angular/core';
import { SharedService } from "../services/shared.service"
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chart-app';
  public isLoggedIn = false;
  constructor(private sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.hasToken();
  }


  hasToken() {
    this.sharedService.isLoggedInObserver.subscribe((res) => {
      if (res) {
        setTimeout(() => {
          this.isLoggedIn = res;
        });
      }
    });
  }
}
