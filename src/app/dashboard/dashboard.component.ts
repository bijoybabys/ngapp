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
    lineChart: {},
    pieChart: {},
    barChart: {},
    doughnutChart: {}
  };
  options: any;
  constructor(private sharedService: SharedService) {
    this.options = {
      title: {
        display: true,
        text: "My Title",
        fontSize: 16
      },
      legend: {
        position: "bottom"
      }
    };
  }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    this.showLoader = true;
    this.sharedService.httpGet("getCharts").subscribe(res => {
      this.showLoader = false;
      if (res.content) {
        this.data = {
          barChart: res.content.barChart,
          pieChart: res.content.pieChart,
          lineChart: res.content.lineChart,
          doughnutChart: res.content.doughnutChart
        };
        this.showChart = true;
        setTimeout(() => {
          this.barChart.reinit();
          this.pieChart.reinit();
          this.lineChart.reinit();
          this.doughnutChart.reinit();
        });
      }
    });
  }
}

