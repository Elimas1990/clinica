import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import { EspecialidadesService } from 'src/app/servicios/especialidades.service';
import { TurnoService } from 'src/app/servicios/turno.service';
exporting(Highcharts);

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  @Input() chartData
  
  Highcharts: typeof Highcharts = Highcharts;
  chardata: any[] = [];
  listaEspecialidades: any[] = [];
  chartOptions: Highcharts.Options;
  constructor(private espService:EspecialidadesService,
    private turnosService:TurnoService) {}
  ngOnInit() {
    this.espService.getAll()
   .subscribe( x=> {
     x.forEach(element => {
       this.listaEspecialidades.push(element.especialidad)
       let dat=[]
       this.turnosService.countByField(element.especialidad)

       .subscribe(x=>{
          dat.push(x.size)
        })
        this.chardata.push({
          name: element.especialidad,
          data: dat,
          type:'column'
        })
       })
      console.log(this.chartData)
       this.chartOptions=this.chartData
        //this.getChart() 
     });
    /*this.espService.rates$.subscribe((assets) => {
      this.items$ = assets;
      if (this.items$) {
        this.items$.forEach((element) => {
          this.chardata.push(element.rate);
        });
        this.getChart();
      }
    });*/
  }
  hay=false
  getChart() {
    this.chartOptions = {
      xAxis: {
        categories: [  'Especialidad'],
          crosshair: true
      },
      series: this.chardata,
      
      title: {
        text: "barchart",
      },
    };
    this.hay=true
    console.log(this.chartOptions)
  }

}
