const afinacion = [4, 11, 7, 2, 9, 4];
let list = [[0, 4, 7, 11], [2, 5, 9, 0], [6, 8, 10, 0], [2, 5, 7, 9]]
let diapason = [];
let acordes = [];
let cuadrantes = [];
let chordsLen = [];

list.forEach((l) => {
    chordsLen.push(l.length)
})

for (var c = 0; c < afinacion.length; c++) {
    for (var t = 1; t < 23; t++) {
        diapason.push([c + 1, t, (afinacion[c] + t) % 12]);
    }
}

for (var l = 0; l < list.length; l++) {
    acordes.push([]);
    for (var n = 0; n < list[l].length; n++) {
        for (var c = 1; c < diapason.length; c++) {
            if (list[l][n] == diapason[c][2]) {
                acordes[l].push(diapason[c]);
            }
        }
    }
}

for (var i = 0; i < 18; i++) {
    a = 5 + i;
    b = 1 + i;
    cuadrantes.push([]);
    for (var ch = 0; ch < acordes.length; ch++) {
        cuadrantes[i].push([]);
        acordes[ch].forEach(function (t) {
            if (t[1] <= a && t[1] >= b) {
                cuadrantes[i][ch].push(t);
            }
        });
    }
}

for (var c = 0; c < cuadrantes.length; c++) {
    for (var a = 0; a < cuadrantes[c].length; a++) {
        console.log(cuadrantes[c][a])
        var myGrid = [...Array(cuadrantes[c][a].length)].map((e) => Array());

    }
}



// s1.forEach(function (x) {
//     var myGrid = [...Array(chord.length)].map((e) => Array());

//     x.forEach(function (y) {
//       for (var c = 0; c < chord.length; c++) {
//         if (y[2] == chord[c]) {
//           myGrid[c].push(y);
//         }
//       }
//     });

//     myGrid = cartesianProduct(myGrid);

//     myGrid.forEach(function (e) {
//       mtx.push(e);
//       for (var c = 0; c < e.length; c++) {
//         for (var d = 0; d < e.length; d++) {
//           if (c != d && e[c][0] == e[d][0]) {
//             mtx2.push(e);
//           }
//         }
//       }
//       mtx = _.difference(mtx, mtx2);
//     });
//     mtx = Array.from(new Set(mtx.map(JSON.stringify)), JSON.parse);
//   });
//   print(mtx);




console.log(acordes)
console.log(cuadrantes);
