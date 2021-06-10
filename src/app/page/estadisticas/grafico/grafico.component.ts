import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
exporting(Highcharts);

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  mostrar=false
  @Input() set datosChart(datos){
    this.chartOptions.series=datos.series
    this.chartOptions.xAxis=datos.xAxis
    this.chartOptions.title=datos.title
    this.mostrar=true
    console.log(this.chartOptions)
  }
  constructor() { }

  ngOnInit(): void {
  }

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options ={

    title: {
        text: 'Turnos Solicitados'
    },
    exporting: {
      enabled: true
    },
    subtitle: {
        text: ''
    },
    xAxis: {
       // categories: this.categorias,
        crosshair: true
    },
    credits:{enabled:false},
    yAxis: {
        min: 0,
        title: {
            text: 'Cantidad de turnos'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{data: [1, 0, 1, 1, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2],
    name: "Turnos",
    type: "column"}
      
    ]
  }

}
