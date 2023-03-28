// ///////////////////////////////////////// ESTE CÓDIGO GENERA PERMUTACIONES, TIENE INCLUIDAS OTRA FUNCIONES DE OTRAS PERACIONES PERO NO SON LLAMADAS, SOLO FUNCIONA LAS PERMUTACIONES
// ///////////////////////////////////////// QUE ARROJAN LA FORMA PRIMA
// var fPrR = [];
// var formaPrimaIn;

// function dodeca(notes) {

//     function permutaciones() {

//         var tricorde = notes;
//         var permu = [];
//         var formaPrimaCal = [];
//         var formaPrimaSel = [];
//         var formaPrimaOri = [];

//         for (var e = 0; e < tricorde.length; e++) {
//             var tri0 = [];
//             var retro0 = [];
//             var tri0sum;
//             var tri0Max;
//             var tri0Min;
//             var retro0sum;
//             var retro0Max;
//             var retro0Min;

//             tricorde.forEach(function (nota) {
//                 var nuevoValor = (nota - tricorde[e] + 12) % 12;
//                 tri0.push(nuevoValor);
//                 tri0.sort((a, b) => a - b);
//                 // tri0sum = tri0.reduce((a, b) => a + b, 0);
//                 tri0Max = Math.max(...tri0);
//                 tri0Min = Math.min(...tri0);
//                 tri0sum = tri0Max - tri0Min;
//                 // console.log(tri0);

//                 var nuevoValorR = (tricorde[e] - nota + 12) % 12;
//                 retro0.push(nuevoValorR);
//                 retro0.sort((a, b) => a - b);
//                 // retro0sum = retro0.reduce((a, b) => a + b, 0);
//                 retro0Max = Math.max(...retro0);
//                 retro0Min = Math.min(...retro0);
//                 retro0sum = retro0Max - retro0Min;
//                 // console.log(retro0)

//             });

//             formaPrimaCal.push(tri0sum, retro0sum);
//             formaPrimaSel.push(tri0, retro0);
//             formaPrimaOri.push(tricorde[e].toString(), "'" + tricorde[e].toString());
//             permu.push(
//                 "(" + tri0 + ")" + " " + tricorde[e].toString(),
//                 "(" + retro0 + ")" + " '" + tricorde[e].toString(),
//             );
//         }

//         var allindx = getAllIndexes(formaPrimaCal, Math.min(...formaPrimaCal));
//         var lastcomp = [];
//         var lastcompIndx = [];
//         var lastcompVal;
//         var namIndx = []

//         for (var i = 0; i < allindx.length; i++) {
//             lastcompVal = formaPrimaSel[allindx[i]]
//             lastcompVal = lastcompVal.reduce((a, b) => a + b, 0);
//             lastcomp.push(lastcompVal);
//             lastcompIndx.push(formaPrimaSel[allindx[i]]);
//             namIndx.push(allindx[i]);
//         }
//         var formaPrimaIndex = Math.min(...lastcomp);
//         formaPrimaIn = lastcompIndx[lastcomp.indexOf(formaPrimaIndex)];

//         // var formaPrimaIn = formaPrimaCal.indexOf(Math.min(...formaPrimaCal));
//         fPrR = `(${formaPrimaIn}) ${formaPrimaOri[namIndx[lastcomp.indexOf(formaPrimaIndex)]]}`;     //////FORMA PRIMA
//         return permu;
//     }

//     // console.log("permutaciones", permutaciones(), "</br>");

//     // console.log("formaPrima", fPrR, "</br>");

//     /////////////////////////////////////////
//     /////////////////////////////////////////

//     function reverse() {
//         var rev = notes.map((x) => x);
//         for (let i = 0, j = rev.length - 1; i < j; i++, j--)
//             [rev[i], rev[j]] = [rev[j], rev[i]];
//         // return rev;
//     }

//     // console.log("retrogrado", reverse(), "</br>");

//     /////////////////////////////////////////

//     function inv() {
//         var p1 = notes[0];
//         var res = [];
//         notes.forEach(function (unaNota) {
//             var nuevoValor = (unaNota - p1) * -1 + p1;
//             res.push((nuevoValor + 12) % 12);
//         });
//         // return res;
//     }
//     // console.log("inversion", inv(), "</br>");

//     /////////////////////////////////////////

//     function matrix() {
//         var p1 = notes[0];
//         var res = [];
//         var mres = [];
//         notes.forEach(function (unaNota) {
//             var nuevoValor = (unaNota - p1) * -1;
//             res.push(nuevoValor);
//         });
//         var m0 = [],
//             m1 = [],
//             m2 = [],
//             m3 = [],
//             m4 = [],
//             m5 = [],
//             m6 = [],
//             m7 = [],
//             m8 = [],
//             m9 = [],
//             m10 = [],
//             m11 = [];
//         var r = [m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11];
//         for (var i = 0; i < notes.length; i++) {
//             m0.push((notes[i] + res[0] + 12) % 12);
//             m1.push((notes[i] + res[1] + 12) % 12);
//             m2.push((notes[i] + res[2] + 12) % 12);
//             m3.push((notes[i] + res[3] + 12) % 12);
//             m4.push((notes[i] + res[4] + 12) % 12);
//             m5.push((notes[i] + res[5] + 12) % 12);
//             m6.push((notes[i] + res[6] + 12) % 12);
//             m7.push((notes[i] + res[7] + 12) % 12);
//             m8.push((notes[i] + res[8] + 12) % 12);
//             m9.push((notes[i] + res[9] + 12) % 12);
//             m10.push((notes[i] + res[10] + 12) % 12);
//             m11.push((notes[i] + res[11] + 12) % 12);
//         }
//         for (var i = 0; i < notes.length; i++) {
//             var mv = r[i];
//             mres.push(mv);
//         }
//         // return mres;
//     }

//     // console.log("matrix:", matrix(), "</br>");
//     permutaciones()
//     return (fPrR);
// };
// /////////////////////////////////////////