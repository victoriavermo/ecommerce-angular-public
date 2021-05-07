// import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';

// @Injectable({
//   providedIn: 'root'
// })
// export class BloquearService {

//   bloquear:boolean;
//   constructor(private db: AngularFirestore) {
//     this.db.collection('bloquear').doc('bloquear').get().toPromise().then((res)=>{
//       const bloqueado = res.data();
//       if(bloqueado){
//         this.bloquear.setBloqueo(true);
//       }else{
//         this.bloquear.setBloqueo(false);
//       }

//       })
//   }

//   setBloqueo(b){
//     this.bloquear = b;
//   }
// }
