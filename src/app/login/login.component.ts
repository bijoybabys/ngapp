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
      username: this.username,
      password: this.password
    };
    this.showLoader= true;
    this.sharedService.httpPost("auth", params).subscribe(res => {
      this.showLoader = false;
      if (res.content) {
        window.localStorage.setItem("access_token", res.content.user.token);
        window.localStorage.setItem("user", JSON.stringify(res.content.user));
        this.sharedService.setLoggedInSubject(true);
        this.router.navigate(["dashboard"]);
      }
    });
  }
}
