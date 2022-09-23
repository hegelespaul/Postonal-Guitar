const afinacion = [4, 11, 7, 2, 9, 4];
const afinacionMIDI = [64, 59, 55, 50, 45, 40];
let pallete = ["rgb(0,231,6,0.5)", "rgb(0,255,173,0.5)", "rgb(0,107,255,0.5)", "rgb(49,1,250,0.5)", "rgb(131,1,205,0.5)", "rgb(63,0,87,0.5)", "rgb(103,4,81,0.5)", "rgb(215,1,2,0.5)", "rgb(227,67,3,0.5)", "rgb(255,136,0,0.5)", "rgb(236,255,0,0.5)", "rgb(154,243,4,0.5)"];


let list = [[0, 4, 7, 11], [2, 5, 9, 0], [6, 8, 10, 0], [2, 5, 7, 9], [1, 4, 6, 11], [2, 3, 7, 0], [6, 11, 10, 0], [2, 3, 5, 9]]
let diapason = [];
let acordes = [];
let cuadrantes = [];
let chordsLen = [];
let acomodo = [];
let carrera = [];
let result = [];
let topnoteArr = [];
var topnoteArrEv = [];
let chordpoint = [];
let progresion = [];

for (var i = 0; i < list.length; i++) {
    list[i].sort((a, b) => a - b);
}                                        ///////////////SORT

window.addEventListener('load', init, false);
function init() {
    try {
        audioContext = new AudioContext();
    }
    catch (e) {
        alert('Web Audio API is not supported in this browser');
    }
}

function cartesianProduct(arr) {
    return Array.prototype.reduce.call(
        arr,
        function (a, b) {
            var ret = [];
            a.forEach(function (a) {
                b.forEach(function (b) {
                    ret.push(a.concat([b]));
                });
            });
            return ret;
        },
        [[]]
    );
}

console.log(list);

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

list.forEach(function (a) {
    acomodo.push([]);
})

cuadrantes.forEach(function (e) {
    for (var i = 0; i < list.length; i++) {
        acomodo[i].push(e[i]);
    }
})

console.log(acomodo)

for (var a = 0; a < acomodo.length; a++) {

    let mtx = [];
    let mtx2 = [];
    acomodo[a].forEach(function (x) {
        var myGrid = [];

        var myGrid = [...Array(list[a].length)].map((e) => Array());

        x.forEach(function (y) {
            for (var c = 0; c < list[a].length; c++) {
                if (y[2] == list[a][c]) {
                    myGrid[c].push(y);
                }
            }
        });

        myGrid = cartesianProduct(myGrid);

        myGrid.forEach(function (e) {
            mtx.push(e);
            for (var c = 0; c < e.length; c++) {
                for (var d = 0; d < e.length; d++) {
                    if (c != d && e[c][0] == e[d][0]) {
                        mtx2.push(e);
                    }
                }
            }
            mtx = _.difference(mtx, mtx2);
        });
        mtx = Array.from(new Set(mtx.map(JSON.stringify)), JSON.parse);
    });
    result.push(mtx)
}
console.log(result);

///////////////////////////////////////////POR TOP NOTE DISTANCIA EUCLIDEANA  2D/////////////////////////////////////////////////////////////////////////////////
// var topnoteArrEv = [];
// for (var i = 0; i < result.length; i++) {
//     topnoteArr.push([]);
//     topnoteArrEv.push([]);
//     for (var j = 0; j < result[i].length; j++) {
//         topnoteArrEv[i].push([]);
//         for (var k = 0; k < result[i][j].length; k++) {
//             var topnote = afinacionMIDI[(result[i][j][k][0] - 1)] + result[i][j][k][1];
//             topnoteArrEv[i][j].push(topnote);
//         }
//         var max = topnoteArrEv[i][j].reduce((a, b) => { return Math.max(a, b) });
//         topnoteArr[i].push({ s: result[i][j][topnoteArrEv[i][j].indexOf(max)][0], f: result[i][j][topnoteArrEv[i][j].indexOf(max)][1] });
//     }
// }
// // console.log(topnoteArr);

// for (var i = 0; i < result.length; i++) {
//     chordpoint.push([]);
//     for (var j = 0; j < result[i].length; j++) {
//         chordpoint[i].push([])
//         for (var k = 0; k < result[i][j].length; k++) {
//             var point = { s: result[i][j][k][0], f: result[i][j][k][1] }
//             chordpoint[i][j].push(point);
//         }
//     }
// }
// // console.log(chordpoint);

// var distance = function (a, b) {
//     return Math.pow(a.f - b.f, 2) + Math.pow(a.s - b.s, 2);
// }

// progresion.push(result[0][0])
// function genera() {
//     for (var i = 0; i < topnoteArr.length - 1; i++) {
//         var previous = topnoteArr[(i + topnoteArr.length - 1) % topnoteArr.length];
//         var next = topnoteArr[(i + 1) % topnoteArr.length];

//         var treeP = new kdTree(next.flat(), distance, ["s", "f"]);
//         var nearP = treeP.nearest(topnoteArr[i+1][0], 1);
//         progresion.push(result[(i + 1) % result.length][next.flat().indexOf(nearP[0][0])]);
//     }
//     console.log('Top Note 2D:',progresion);
// }

// genera()
///////////////////////////////////////////POR TOP NOTE DISTANCIA EUCLIDEANA  3D y SIMILARIDAD COSENO/////////////////////////////////////////////////////////////////////////////////

for (var i = 0; i < result.length; i++) {
    topnoteArr.push([]);
    topnoteArrEv.push([]);
    for (var j = 0; j < result[i].length; j++) {
        topnoteArrEv[i].push([]);
        for (var k = 0; k < result[i][j].length; k++) {
            var topnote = afinacionMIDI[(result[i][j][k][0] - 1)] + result[i][j][k][1];
            topnoteArrEv[i][j].push(topnote);
        }
        var max = topnoteArrEv[i][j].reduce((a, b) => { return Math.max(a, b) });
        topnoteArr[i].push({ s: result[i][j][topnoteArrEv[i][j].indexOf(max)][0], f: result[i][j][topnoteArrEv[i][j].indexOf(max)][1], t: result[i][j][topnoteArrEv[i][j].indexOf(max)][2] });
    }
}
console.log(topnoteArr);

var distance = function (a, b) {
    var dx = (b.f - a.f);
    var dy = (b.s - a.s);
    var dz = (b.t - a.t);
    return dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2));
}

function cosinesim(A, B) {
    var dotproduct = 0;
    var mA = 0;
    var mB = 0;
    for (j = 0; j < A.length; j++) {
        dotproduct += (A[j] * B[j]);
        mA += (A[j] * A[j]);
        mB += (B[j] * B[j]);
    }
    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    var similarity = (dotproduct) / ((mA) * (mB));
    return similarity;
}

function getAllIndexes(arr, val) {
    var indexes = [], i;
    for (i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

function cosSimAcomodador(A) {
    var resultado = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1], [-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    for (var i = 0; i < A.length; i++) {
        var cuerda = A[i][0];
        resultado.splice(cuerda - 1, 1, A[i]);
    }
    resultado = resultado.flat();
    return resultado
}

function sftAcomodador(A) {
    var resultado = [];
    var resultadoEval = [];
    for (var i = 0; i < A.length; i++) {
        var topnote = afinacionMIDI[A[i][0] - 1] + A[i][1];
        resultadoEval.push(topnote);
        resultado.push({ s: A[i][0], f: A[i][1], t: A[i][2] });
    }
    var max = resultadoEval.reduce((a, b) => { return Math.max(a, b) });
    // console.log(resultado[resultadoEval.indexOf(max)]);
    return resultado[resultadoEval.indexOf(max)]
}

progresion.push(result[0][0]); //////////////EL DE MEDICION

function genera3DCS() {
    var minD = [];
    var posChord = [];
    var chordSim = [];

    for (var i = 0; i < topnoteArr.length - 1; i++) {
        minD.push([]);
        var next = topnoteArr[(i + 1) % topnoteArr.length];

        for (var j = 0; j < next.length; j++) {
            minD[i].push(distance(sftAcomodador(progresion[i]), next[j])); //////////PROGRESIOONN
        }


        posChord.push([]);
        var minVal = Math.min(...minD[i]);
        // console.log(minVal);
        // console.log(getAllIndexes(minD[i],minVal))
        for (var j = 0; j < getAllIndexes(minD[i], minVal).length; j++) {
            posChord[i].push(result[i + 1][getAllIndexes(minD[i], minVal)[j]])
        }


        chordSim.push([])
        for (var j = 0; j < posChord[i].length; j++) {
            chordSim[i].push(cosinesim(cosSimAcomodador(progresion[i]), cosSimAcomodador(posChord[i][j])))
            // console.log(cosSimAcomodador(result[0][0]), cosSimAcomodador(posChord[i][j])); //////////////PROGRESIOONN
        }


        var mostSim = Math.max(...chordSim[i]);
        var defChord = posChord[i][chordSim[i].indexOf(mostSim)];
        // console.log(defChord);
        progresion.push(defChord);
    }
    // console.log(minD)
    // console.log(posChord);
    // console.log(chordSim);
}

genera3DCS();

/////////////////////////////////////////////////////////POR COSINE SIMILARITY//////////////////////////////////////////////////////////

// function generaCos() {
//     progresion = [];
//     progresion.push(result[0][0]);
//     var cosSim = [];
//     for (var i = 0; i < result.length - 1; i++) {
//         cosSim.push([]);
//         var previous = result[(i + result.length - 1) % result.length];
//         var next = result[(i + 1) % result.length];

//         function cosinesim(A, B) {
//             var dotproduct = 0;
//             var mA = 0;
//             var mB = 0;
//             for (j = 0; j < A.length; j++) {
//                 dotproduct += (A[j] * B[j]);
//                 mA += (A[j] * A[j]);
//                 mB += (B[j] * B[j]);
//             }
//             mA = Math.sqrt(mA);
//             mB = Math.sqrt(mB);
//             var similarity = (dotproduct) / ((mA) * (mB));
//             return similarity;
//         }

//         for (var c = 0; c < next.length; c++) {
//             var array1 = result[i][0].flat();
//             var array2 = next[c].flat();

//             if (array1.length < 18) {
//                 array1.push(Array(18 - array1.length).fill(0));
//                 array1 = array1.flat();
//             }

//             if (array2.length < 18) {
//                 array2.push(Array(18 - array2.length).fill(0));
//                 array2 = array2.flat();
//             }

//             var p = cosinesim(array1, array2);
//             cosSim[i].push(p);
//         }
//     }
//     var cosSimIn = [];
//     for (var k = 0; k < cosSim.length; k++) {
//         // var Max = Math.max(...cosSim[k]);
//         // console.log(Max);
//         var indexOfMaxValue = cosSim[k].reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
//         cosSimIn.push(indexOfMaxValue);
//     }
//     for (var i = 1; i < result.length; i++) {
//         progresion.push(result[i][cosSimIn[i - 1]]);
//     }
//     console.log('CosSim:', progresion);
// }

// generaCos();

///////////////////////////////////////////////////////////////////////////////////////////////////////////

function dibujaMatrix() {

    for (var d = 0; d < progresion.length; d++) {
        var trastes = [];
        for (var t = 0; t < progresion[d].length; t++) {
            trastes.push(progresion[d][t][1]);

        }
        var fretMin = Math.min(...trastes);
        var fretMax = Math.max(...trastes);

        var dibujaDiagrama = (pisada) => {

            var diagramas = d3.select('.drawerDiagrama').classed("svg-container", true).append('svg')

            // .attr("preserveAspectRatio", "xMidYMid meet")
            // .attr("viewBox", "0 0 600 100")
            // .classed("svg-content-responsive-diagrama", true);

            // diagramas.append('text')
            // .text((d + 1))
            // .attr('x', 0)
            // .attr('y', 10)
            // .attr("font-size", "20px")
            // .attr("font-family", "sans-serif")
            // .attr("stroke-width", 3);

            if (fretMin > 1) {
                diagramas.append("text")
                    .text('fr. ' + fretMin)
                    .attr('x', 6)
                    .attr('y', 83)
                    .attr("font-size", "10.5px")
                    .attr("font-family", "sans-serif")
                    .attr("stroke-width", 1);
            }

            for (var i = 0; i < 7; i++) {
                diagramas.append('line')
                    .attr('x1', 10)
                    .attr('y1', 10 * i)
                    .attr('x2', 200)
                    .attr('y2', 10 * i)
                    .attr('stroke', 'black')
                    .attr('stroke-width', 0.3 * i);
            }

            for (var i = 0; i < 6; i++) {
                diagramas.append('line')
                    .attr('x1', 10 + 38 * i)
                    .attr('y1', 10)
                    .attr('x2', 10 + 38 * i)
                    .attr('y2', 60.9)
                    .attr('stroke', 'gray')
                    .attr('stroke-width', 1);
            }

            diagramas.append('line')
                .attr('x1', 5)
                .attr('y1', 9.8)
                .attr('x2', 5)
                .attr('y2', 60.9)
                .attr('stroke', 'black')
                .attr('stroke-width', 1);

            diagramas.append('line')
                .attr('x1', 5)
                .attr('y1', 10)
                .attr('x2', 10.5)
                .attr('y2', 10)
                .attr('stroke', 'black')
                .attr('stroke-width', 0.3);

            diagramas.append('line')
                .attr('x1', 5)
                .attr('y1', 10 * i)
                .attr('x2', 9.5)
                .attr('y2', 10 * 6)
                .attr('stroke', 'black')
                .attr('stroke-width', 1.8);

            for (var i = 0; i < pisada.length; i++) {
                diagramas.append('text')
                    .text('  ' + pisada[i][2] + '   ')
                    .attr('x', 6 + i * 15)
                    .attr('y', 100)
                    .attr("font-size", "12px")
                    .attr("font-family", "sans-serif")
                    .attr('stroke-width', 1.8);
            }

            for (var i = 0; i < pisada.length; i++) {


                diagramas.append('circle')
                    .attr('cx', 38 * ((Math.abs(fretMin - pisada[i][1]) % 5) + 1) - 9)
                    .attr('cy', 10 * pisada[i][0])
                    .attr('r', 6)
                    .attr('stroke', 'none')
                    .attr('stroke-width', 1)
                    .attr('fill', pallete[(pisada[i][2] + 3) % 12])

                diagramas.append("text")
                    .text(pisada[i][2])
                    .attr('x', 38 * ((Math.abs(fretMin - pisada[i][1]) % 5) + 1) - 9)
                    .attr('y', 10 * pisada[i][0] + 3.8)
                    .attr('fill', 'white')
                    .attr("font-size", "10px")
                    .attr("font-family", "sans-serif")
                    .style("text-anchor", "middle");
            }

            diagramas.on("mouseover", function (d) {
                d3.select(this).selectAll("circle").style("stroke", "red");
                d3.select(this).style("cursor", "pointer")

            }).on("mouseout", function (d) {
                d3.select(this).selectAll("circle").style("stroke", "none").style("cursor", "pointer");
                d3.select(this).style("cursor", "pointer")

            }).on("click", function () {

                audioContext.resume();
                var pisadaSound = [];
                for (var i = 0; i < pisada.length; i++) {
                    pisadaSound.push([
                        pisada[i][0].toString() + "-" + pisada[i][1].toString(),
                    ]);
                }
                console.log(pisada);
                playchord(pisadaSound);
                d3.event.stopPropagation();
            });

        }
        dibujaDiagrama(progresion[d]);
    }
}

dibujaMatrix();


let data = `
  options font-face='times' 
  tabstave notation=true clef=treble key=C tuning=standard 
`
for (var i = 0; i < progresion.length; i++) {
    var chord = '\n notes :w ('
    for (var j = 0; j < progresion[i].length; j++) {
        chord = chord + (progresion[i][j][1] + '/' + progresion[i][j][0] + '.');
    }
    chord = chord.slice(0, chord.length - 1) + chord.slice(chord.length);
    chord = chord + ')';
    data = data + chord
}

data = data + '=|=';
data = data + '\n text :w,Cmaj7,Dm7,F#add9b5,Dmadd11,Esus2add13,Cmadd9,F#b5add11,Dmaddb9'

const VF = vextab.Vex.Flow

const renderer = new VF.Renderer($('#boo')[0],
    VF.Renderer.Backends.SVG);

// Initialize VexTab artist and parser.
const artist = new vextab.Artist(10, 10, 750, { scale: 1 });
const tab = new vextab.VexTab(artist);

tab.parse(data);
artist.render(renderer);

function playchord(coordenadas) {

    for (var i = 0; i < coordenadas.length; i++) {
        const gainNode = audioContext.createGain();
        let audio1
        audio1 = new Audio;
        audio1.src = "../di/" + coordenadas[i] + ".mp3";
        audio1.volume = 1 / 3;
        let track1 = audioContext.createMediaElementSource(audio1);
        track1.connect(gainNode);
        gainNode.connect(audioContext.destination);
        gainNode.gain.setValueAtTime(1, audioContext.currentTime);
        audio1.play();
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2.5);
    }
}