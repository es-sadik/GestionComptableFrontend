import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { StatistiqueService } from '../statistique.service';

@Component({
  selector: 'app-grouped-vertical-bar-chart',
  templateUrl: './grouped-vertical-bar-chart.component.html',
  styleUrls: ['./grouped-vertical-bar-chart.component.css']
})
export class GroupedVerticalBarChartComponent implements OnInit {

  multi : [] ;
  view: [number, number] = [600, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Années';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Montant En Dirham';
  legendTitle: string = '';
  roundDomains: boolean = true;
  noBarWhenZero : boolean = false;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FF5370', '#2ed8b6', '#ff0000'],
  };

  constructor(private statistiqueService: StatistiqueService) {
    
   }

  ngOnInit(): void {
    this.setDataBarChart();
  }

  setDataBarChart(){

    this.statistiqueService.getDataBarChart().subscribe(data  =>{
      this.multi =  JSON.parse(data);
    })

  }

  onResize(event:any) {
    this.view = [event.target.innerWidth / 1.35, 400];
    }



  



}
