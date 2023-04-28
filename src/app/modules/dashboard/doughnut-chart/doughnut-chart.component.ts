import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { StatistiqueService } from '../statistique.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  single :[];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = true;
  legendPosition: string = 'right';

  colorScheme: Color  ={
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FF5370', '#2ed8b6','#4099ff','#FFB64D','#f677ff']
  };

  constructor(private statistiqueService: StatistiqueService) { }

  ngOnInit(): void {
    this.setDataPieChart();
  }

  setDataPieChart(){
    this.statistiqueService.getDataDoughnutChart().subscribe(data  =>{
      this.single =  JSON.parse(data);
    })
  }

}
