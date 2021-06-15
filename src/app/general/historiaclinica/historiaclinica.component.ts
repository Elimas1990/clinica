import { Component, Input, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { TurnoService } from 'src/app/servicios/turno.service';
import * as moment from "moment";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable'; 

@Component({
  selector: 'app-historiaclinica',
  templateUrl: './historiaclinica.component.html',
  styleUrls: ['./historiaclinica.component.css']
})
export class HistoriaclinicaComponent implements OnInit {

  styleExp="30vh"
  @Input() set userEmailSelect(value){
    console.log(value)
    this.turnosService.getHistoriaClinica(value,'emailPaciente')
    .subscribe(x=>{
      console.log(x)
      this.listaHistoriaClinica=x
      this.nombreExcel=this.listaHistoriaClinica[0]?.apellidoPaciente+this.listaHistoriaClinica[0]?.nombrePaciente
    })
  }
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  @ViewChild('TABLE2', { static: false }) TABLE2: ElementRef;  
  listaHistoriaClinica=[]
  nombreExcel:any
  constructor(private authService:AuthService,
    private turnosService:TurnoService) {
     
   }

  ngOnInit(): void {
    this.authService.auth.user.subscribe(x=> {
      if(x){
        this.authService.db.collection('/usuarios', ref => ref.where('email','==', x?.email ))
        .valueChanges()
        .subscribe((response) => {
          switch(response[0]['tipouser']){
            /*case 'Administrativo':
              
              this.turnosService.getHistoriaClinica(this.userEmailSelect,'emailPaciente')
              .subscribe(x=>{
                this.listaHistoriaClinica=x
              })
              break;*/
            /*case 'Profesional':
              this.styleExp="80vh"
              
              this.turnosService.getHistoriaClinica(response[0]['email'],'emailProfesional')
              .subscribe(x=>{
                this.listaHistoriaClinica=x
                this.nombreExcel=this.listaHistoriaClinica[0].apellidoProf+this.listaHistoriaClinica[0].nombreProf
              })
              break;*/
            /*case 'Paciente':
              
              this.turnosService.getHistoriaClinica(response[0]['email'],'emailPaciente')
              .subscribe(x=>{
                console.log(x)
                this.listaHistoriaClinica=x
                this.nombreExcel=this.listaHistoriaClinica[0].apellidoPaciente+this.listaHistoriaClinica[0].nombrePaciente
              })
              break;*/
          }
        });
      }
    })
  }

  

  ExportTOExcel() {  
    console.log(this.TABLE.nativeElement)
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, this.nombreExcel+'.xlsx');  
  }  
  


  createPdf() {
    let head = [
      ['Fecha ', 'Comentario', 'Especialidad', 'Profesional', 'Datos']]
    let doc = new jsPDF();
    let dat=[]
    let img = new Image()
    img.src = 'assets/logo.jpg'
    this.listaHistoriaClinica.forEach(x=>{
      let datos=''
      Object.keys(x.historia).forEach(key => {
        datos=datos+key.toUpperCase()+': '+x.historia[key]+'\n';
      });
      dat.push([moment(x.fecha.toDate()).format('DD/MM/yyyy HH:mm'),x.comentario,x.especialidad,x.apellidoProf+' '+x.nombreProf,datos])
    })

    doc.addImage(img, 'JPG', 180,2, 30, 30);
    doc.setFontSize(18);
    doc.text('Historia Clinica de '+this.listaHistoriaClinica[0].apellidoPaciente+' '+this.listaHistoriaClinica[0].nombrePaciente+'\n', 15, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);

    (doc as any).autoTable({
      head: head,
      body: dat,
      theme: 'grid',
      startY: 30,
      didDrawCell: data => {
        //console.log(data.column.index)
      }
    })
    doc.setFontSize(11);
    let fecha:Date=new Date
    doc.text('Emitido: '+moment(fecha).format('DD/MM/yyyy HH:mm').toString(), 10, 250);
    // below line for Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc.save('historia'+this.nombreExcel+'.pdf');
  }
}
