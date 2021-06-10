import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import { EspecialidadesService } from 'src/app/servicios/especialidades.service';
import { TurnoService } from 'src/app/servicios/turno.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/servicios/auth.service';
import { UserlogService } from 'src/app/servicios/userlog.service';
exporting(Highcharts);

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  listaEspecialidades=[]
  listaCant=[]
  listaProfesionales=[]
  listaFechas=[]
  listaLogs=[]
  maxFechaTurno:any
  minFechaTurno:any
  total:number
  profSelect:any
  constructor(private turnosService:TurnoService,
    private espService:EspecialidadesService,
    private authService:AuthService,
    private log:UserlogService  ) { 
      log.getAll().subscribe(x=>{this.listaLogs=x})
      authService.getProf().get()
      .subscribe(x => {x.forEach(element => {
        let data= element.data()
        data['id']=element.id
        this.listaProfesionales.push(data)
      })
    })
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
        categories: [  'Especialidad'],
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
    series: [
      
    ]
  }
  chartOptions2: Highcharts.Options ={

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
        categories: this.listaFechas,
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
    series: [
      
    ]
  }
  fechasGraf3=[];
  chartOptions3: Highcharts.Options ={

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
        categories: this.fechasGraf3,
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
    series: [
      
    ]
  }
  ngOnInit(): void {
     // grafico turnos por dia
    this.grafTurnosPorDia()
     // grafico especialidades
    this.grafTurnosPorEsp()

  }

  grafTurnosPorEsp(){
    this.espService.getAll()
   .subscribe( x=> {
     this.total=x.length
     x.forEach(element => {
       this.listaEspecialidades.push(element.especialidad)
       this.turnosService.countByField(element.especialidad)
       .subscribe(x=>{
         this.listaCant.push(x.size)
         this.chartOptions.series.push({
           name: element.especialidad,
           data: [x.size],
           type:'column'
         })
       })
     });
     
     //console.log(this.chartOptions)
   })
  }
  grafTurnosPorDia(){
    this.turnosService.getMinMaxFechaTurnoSolicitado('desc')
     .forEach(x=>
       { x.forEach(element => {
         this.maxFechaTurno=element.data()['fecha'].toDate()
       }
     )})

     this.turnosService.getMinMaxFechaTurnoSolicitado('asc')
     .forEach(x=>
       { x.forEach(element => {
         this.minFechaTurno=element.data()['fecha'].toDate()
       })
     }).then(x=> {
       let max=moment(moment(this.maxFechaTurno).format('YYYY-MM-DD'))
         let min=moment(moment(this.minFechaTurno).format('YYYY-MM-DD'))
         let result=max.diff(min,'days')
         for(let i=0;i<result;i++){
           let siguiente=moment(moment(this.minFechaTurno).format('YYYY-MM-DD'))
           this.listaFechas.push(siguiente.add(i, 'days').format('DD/MM/YYYY'))
         }
         let dat=[]
         this.listaFechas.forEach(fecha => {
           this.turnosService.getCantPorDia(fecha).forEach(x=>{
             dat.push(x.size)
           })
         })
         this.chartOptions2.series.push({
           name: "Turnos",
           data: dat,
           type:'column'
         })
     })
  }

  desde:any
  hasta:any
  mostrar3graf=false
  
  grafTurnosPorMedicoPorDia(){
      let fechas=[]
      let max=moment(moment(this.hasta).format('YYYY-MM-DD'))
      let min=moment(moment(this.desde).format('YYYY-MM-DD'))
      let result=max.diff(min,'days')
      for(let i=0;i<result;i++){
        let siguiente=moment(moment(this.minFechaTurno).format('YYYY-MM-DD'))
        this.fechasGraf3.push(siguiente.add(i, 'days').format('DD/MM/YYYY'))
      }
      console.log(this.fechasGraf3)
      let dat=[]
      this.fechasGraf3.forEach(x => {
        this.turnosService.getCantPorDiaPorProfesional(x,this.profSelect).forEach(x=>{
          dat.push(x.size)
        })
      })
      this.chartOptions3.series.push({
        name: "Turnos",
        data: dat,
        type:'column'
      })
      console.log(this.chartOptions3)
      this.mostrar3graf=true
     /*.then(x=> {
        let max=moment(moment(this.maxFechaTurno).format('YYYY-MM-DD'))
         let min=moment(moment(this.minFechaTurno).format('YYYY-MM-DD'))
         let result=max.diff(min,'days')
         for(let i=0;i<result;i++){
           let siguiente=moment(moment(this.minFechaTurno).format('YYYY-MM-DD'))
           this.listaFechas.push(siguiente.add(i, 'days').format('DD/MM/YYYY'))
         }
         let dat=[]
         this.listaFechas.forEach(fecha => {
           this.turnosService.getCantPorDia(fecha).forEach(x=>{
             dat.push(x.size)
           })
         })
         this.chartOptions3.series.push({
           name: "Turnos",
           data: dat,
           type:'column'
         })
     })*/
  }

}
