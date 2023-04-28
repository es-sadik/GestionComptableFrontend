import { Component, OnInit } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { StatistiqueService } from '../statistique.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  multi:[];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Mois';
  yAxisLabel: string = 'Montant En Dirham';
  timeline: boolean = true;
  legendTitle: string = '';
  legendPosition: LegendPosition = LegendPosition.Right;
  roundDomains: boolean = true;

  colorScheme: Color  ={
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [ '#FF5370', '#2ed8b6']
  };

  constructor(private statistiqueService: StatistiqueService) {
  }

  ngOnInit(): void {

    this.setDataLineChart();

  }

  setDataLineChart(){

    this.statistiqueService.getDataLineChart().subscribe(data  =>{
      this.multi =  JSON.parse(data);
    })

  }


  

}
