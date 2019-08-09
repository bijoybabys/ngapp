import { Component, OnInit, ViewChild } from "@angular/core";
import { UIChart } from "primeng/components/chart/chart";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  @ViewChild("lineChart", { static: false }) lineChart: UIChart;
  @ViewChild("pieChart", { static: false }) pieChart: UIChart;
  @ViewChild("barChart", { static: false }) barChart: UIChart;
  @ViewChild("doughnutChart", { static: false }) doughnutChart: UIChart;
  public user;
  public showChart: boolean = false;
  public showLoader: boolean = false
  data: any = {
    chart1: {},
    chart2: {},
    barChart: {},
    doughnutChart: {}
  };
  options: any;
  constructor(private sharedService: SharedService) {
    this.options = {
      chart1:{
        title: {
          display: true,
          text: "Velocity Predictability",
          fontSize: 16
        },
        barWidth: 10
      },
      chart2:{
        title: {
          display: true,
          text: "Accepted/Commited",
          fontSize: 16
        },
        barWidth: 10
      },
      chart3:{
        title: {
          display: true,
          text: "Scope Change",
          fontSize: 16
        },
        barWidth: 10
      },
      chart4:{
        title: {
          display: true,
          text: "Priority",
          fontSize: 16
        },
        barWidth: 10
      }
      
  }
}

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    let token = JSON.parse(window.localStorage.getItem("access_token"));
    this.showLoader = true;
    this.sharedService.httpGet("/api/datachart/" +token).subscribe(res => {
      this.showLoader = false;
      
         
        this.data = res.data
        this.showChart = true;
        setTimeout(() => {
          this.barChart.reinit();
          
        });
      
    });
  }
}

