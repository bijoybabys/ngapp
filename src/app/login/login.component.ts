import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SharedService } from "../../services/shared.service";

export class LoginModel {
  username?: string;
  password?: string;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public showLoader: boolean = false;
  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() {}

  login() {
    let params = {
      userName: this.username,
      password: this.password
    };
    this.showLoader= true;
    this.sharedService.httpPost("/api/datachart/login", params).subscribe(res => {
      this.showLoader = false;
      let user = {
        userName: res.userName
      }
      window.localStorage.setItem("access_token", res.userId);
      window.localStorage.setItem("user", JSON.stringify(user));
      this.sharedService.setLoggedInSubject(true);
      this.router.navigate(["dashboard"]);
      
    });
  }
}
