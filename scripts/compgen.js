// const { Chord } = require("chord-identifier/lib/music");

const afinacion = [4, 11, 7, 2, 9, 4];
const afinacionMIDI = [64, 59, 55, 50, 45, 40];
// var numtonot = ['C', 'C#','D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
var numtonot = [0,1,2,3,4,5,6,7,8,9,10,11];
let pallete = ["rgb(0,231,6,0.5)", "rgb(0,255,173,0.5)", "rgb(0,107,255,0.5)", "rgb(49,1,250,0.5)", "rgb(131,1,205,0.5)", "rgb(63,0,87,0.5)", "rgb(103,4,81,0.5)", "rgb(215,1,2,0.5)", "rgb(227,67,3,0.5)", "rgb(255,136,0,0.5)", "rgb(236,255,0,0.5)", "rgb(154,243,4,0.5)"];


// let list = [[0, 4, 7, 11], [2, 5, 9, 0], [6, 8, 10, 0], [2, 5, 7, 9], [1, 4, 6, 11], [2, 3, 7, 0], [6, 11, 10, 0], [2, 3, 5, 9]]
// let list = [[0,1,2],[0,1,3],[0,1,4],[0,1,5],[0,1,6],[0,2,4],[0,2,5],[0,2,6],[0,2,7],[0,3,6],[0,3,7],[0,4,8]]
// list = [[11, 3, 6, 10], [2, 6, 9, 0], [7, 11, 2, 6], [10, 2, 4, 8], [3, 7, 10, 2], [9, 0, 4, 7], [2, 6, 9, 0], [7, 11, 2, 6], [10, 2, 4, 8], [3, 7, 10, 2], [6, 10, 1, 4], [11, 3, 6, 10], [5, 8, 0, 3], [10, 2, 4, 8], [3, 7, 10, 2], [9, 0, 4, 7], [2, 6, 9, 0], [7, 11, 2, 6], [1, 4, 8, 11], [6, 10, 1, 4], [11, 3, 6, 10], [5, 8, 0, 3], [10, 2, 4, 8], [3, 7, 10, 2], [1, 4, 8, 11], [6, 10, 1, 4]]
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
let listaF = []
let btnCount = 0;
let puntoPartidaFinal;
let puntoArray;


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



function puntodePartida(list) {

    let mtx = [];
    diapason = [];
    acordes = [];
    cuadrantes = [];
    chordsLen = [];
    acomodo = [];
    carrera = [];
    result = [];
    topnoteArr = [];
    topnoteArrEv = [];
    chordpoint = [];
    progresion = [];

    if (list.every(subarr => subarr.length >= 3)) {

        list.forEach((l) => {
            chordsLen.push(l.length)
        })

        for (var c = 0; c < afinacion.length; c++) {
            for (var t = 0; t <= 22; t++) {
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

        // console.log(acomodo)

        mtx = [];
        let mtx2 = [];
        acomodo[0].forEach(function (x) {
            var myGrid = [];

            var myGrid = [...Array(list[0].length)].map((e) => Array());

            x.forEach(function (y) {
                for (var c = 0; c < list[0].length; c++) {
                    if (y[2] == list[0][c]) {
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
        // console.log(mtx)
        puntoArray = [...mtx];
        // console.log(puntoArray)


        for (var d = 0; d < mtx.length; d++) {
            var trastes = [];


            for (var t = 0; t < mtx[d].length; t++) {

                trastes.push(mtx[d][t][1]);

            }
            var fretMin = Math.min(...trastes);
            var fretMax = Math.max(...trastes);


            var dibujaDiagrama = (pisada) => {
                let = adjustY = 30;

                var diagramas = d3.select('.drawerDiagrama').classed("svg-container", true).append('svg');
                diagramas.append("foreignObject")
                    .attr("width", 480)
                    .attr("height", 500)
                    .attr('x', -125)
                    .attr('y', 90 + adjustY)
                    .style("cursor", "pointer")
                    .append("xhtml:div")
                    .style("font", "9px 'Helvetica Neue'")
                    .html("<button id=" + "punto" + d + " onclick=puntoPartida(" + d + "),allElements(listaF) class=" + "btnSelPoint" + ">Selecciona como punto de partida</button>");

                //  .attr("preserveAspectRatio", "xMidYMid meet")
                //  .attr("viewBox", "0 0 600 100")
                // .classed("svg-content-responsive-diagrama", true);

                diagramas.append('text')
                    .text((d + 1))
                    .attr('x', 10)
                    .attr('y', adjustY - 5)
                    .attr("font-size", "20px")
                    .attr("opacity", "0.5")
                    .attr("font-family", "sans-serif")
                    .attr("stroke-width", 3);

                if (fretMin > 1) {
                    diagramas.append("text")
                        .text('fr. ' + fretMin)
                        .attr('x', 6)
                        .attr('y', 83 + adjustY)
                        .attr("font-size", "10.5px")
                        .attr("font-family", "sans-serif")
                        .attr("stroke-width",);
                }

                for (var i = 0; i < 7; i++) {
                    diagramas.append('line')
                        .attr('x1', 10)
                        .attr('y1', 10 * i + adjustY)
                        .attr('x2', 200)
                        .attr('y2', 10 * i + adjustY)
                        .attr('stroke', 'black')
                        .attr('stroke-width', 0.3 * i);
                }

                for (var i = 0; i < 6; i++) {
                    diagramas.append('line')
                        .attr('x1', 10 + 38 * i)
                        .attr('y1', 10 + adjustY)
                        .attr('x2', 10 + 38 * i)
                        .attr('y2', 60.9 + adjustY)
                        .attr('stroke', 'gray')
                        .attr('stroke-width', 1);
                }
                if (fretMin <= 1) {
                    diagramas.append('line')
                        .attr('x1', 5)
                        .attr('y1', 9.8 + adjustY)
                        .attr('x2', 5)
                        .attr('y2', 60.9 + adjustY)
                        .attr('stroke', 'black')
                        .attr('stroke-width', 1);

                    diagramas.append('line')
                        .attr('x1', 5)
                        .attr('y1', 10 + adjustY)
                        .attr('x2', 10.5)
                        .attr('y2', 10 + adjustY)
                        .attr('stroke', 'black')
                        .attr('stroke-width', 0.3);

                    diagramas.append('line')
                        .attr('x1', 5)
                        .attr('y1', 10 * i + adjustY)
                        .attr('x2', 9.5)
                        .attr('y2', 10 * 6 + adjustY)
                        .attr('stroke', 'black')
                        .attr('stroke-width', 1.8);
                }

                for (var i = 0; i < pisada.length; i++) {

                    diagramas.append("input")
                        .attr("type", "button")
                        .attr("name", "toggle")
                        .attr("value", "Toggle")
                        .attr("onclick", "togglePressed()");


                    diagramas.append('circle')
                        .attr('cx', 38 * ((Math.abs(fretMin - pisada[i][1]) % 5) + 1) - 9)
                        .attr('cy', 10 * pisada[i][0] + adjustY)
                        .attr('r', 6)
                        .attr('stroke', 'none')
                        .attr('stroke-width', 1)
                        .attr('fill', pallete[(pisada[i][2] + 3) % 12])

                    diagramas.append("text")
                        .text(numtonot[pisada[i][2]])
                        .attr('x', 38 * ((Math.abs(fretMin - pisada[i][1]) % 5) + 1) - 9)
                        .attr('y', 10 * pisada[i][0] + 3.8 + adjustY)
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
                    // console.log(pisada);
                    playchord(pisadaSound);
                    d3.event.stopPropagation();
                });

            }
            dibujaDiagrama(mtx[d]);
        }


        function playchord(coordenadas) {

            const samplePaths = [];

            for (var i = 0; i < coordenadas.length; i++) {
                var src_i = "../sounds/" + coordenadas[i] + ".mp3";
                samplePaths.push(src_i);
            }

            async function getFile(filePath) {
                const response = await fetch(filePath);
                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                return audioBuffer;
            }

            async function setupSamples(paths) {
                const audioBuffers = [];

                for (const path of paths) {
                    const sample = await getFile(path);
                    audioBuffers.push(sample);
                }
                return audioBuffers;
            }

            function playSample(audioBuffer, time) {
                var sampleSource = audioContext.createBufferSource();
                var gainNode = audioContext.createGain();
                sampleSource.buffer = audioBuffer;
                sampleSource.connect(gainNode);
                gainNode.connect(audioContext.destination);
                gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
                sampleSource.start(time);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2.5);
            }

            setupSamples(samplePaths).then((response) => {
                const samples = response;
                for (i = 0; i < samples.length; i++) {
                        playSample(samples[i], 0);
                }
            });

        }

    }
    else {
        alert('Antes de generar la progresión, necesitas seleccionar un mínimo de 3 notas para cada acorde!');
        console.log(list)
    }
}

function puntoPartida(identifier) {
    puntoPartidaFinal = puntoArray[identifier];
    // console.log(puntoPartidaFinal);
}

function allElements(list) {
    let diapason = [];
    acordes = [];
    cuadrantes = [];
    chordsLen = [];
    acomodo = [];
    carrera = [];
    result = [];
    topnoteArr = [];
    topnoteArrEv = [];
    chordpoint = [];
    progresion = [];

    // for (var i = 0; i < list.length; i++) {
    // list[i].sort((a, b) => a - b);
    // }

    if (list.every(subarr => subarr.length >= 3)) {

        document.getElementById("partitura").style.display = 'flex';



        // console.log(list);

        list.forEach((l) => {
            chordsLen.push(l.length)
        })

        for (var c = 0; c < afinacion.length; c++) {
            for (var t = 0; t <= 22; t++) {
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

        // console.log(acomodo)

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
        // console.log(result);

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


        progresion.push(puntoPartidaFinal); //////////////EL DE MEDICION

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        function genera3DCS() {

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
                    topnoteArr[i].push({ s: result[i][j][topnoteArrEv[i][j].indexOf(max)][0], f: result[i][j][topnoteArrEv[i][j].indexOf(max)][1], n: afinacionMIDI[result[i][j][topnoteArrEv[i][j].indexOf(max)][0] - 1] + result[i][j][topnoteArrEv[i][j].indexOf(max)][1] });
                }
            }
            // console.log(topnoteArr);

            var minD = [];
            var posChord = [];
            var chordSim = [];

            for (var i = 0; i < topnoteArr.length - 1; i++) {
                minD.push([]);
                var next = topnoteArr[(i + 1) % topnoteArr.length];

                for (var j = 0; j < next.length; j++) {
                    minD[i].push(distance(sfnAcomodador(progresion[i]), next[j])); //////////PROGRESIOONN
                    // console.log(next[j])
                }


                posChord.push([]);
                var minVal = Math.min(...minD[i]);
                // console.log(minVal);
                // console.log(getAllIndexes(minD[i], minVal))
                // console.log(minD);
                for (var j = 0; j < getAllIndexes(minD[i], minVal).length; j++) {
                    posChord[i].push(result[i + 1][getAllIndexes(minD[i], minVal)[j]])
                }


                chordSim.push([])
                for (var j = 0; j < posChord[i].length; j++) {
                    chordSim[i].push(cosinesim(cosSimAcomodadorTrp(progresion[i]), cosSimAcomodadorTrp(posChord[i][j])))
                    // console.log(cosSimAcomodador(result[0][0]), cosSimAcomodador(posChord[i][j])); //////////////PROGRESIOONN
                }


                var mostSim = Math.max(...chordSim[i]);
                var defChord = posChord[i][chordSim[i].indexOf(mostSim)];
                // console.log(defChord);
                progresion.push(defChord);
                // console.log(mostSim);

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
            let adjustY = 30;

            d3.select('.drawerDiagrama').selectAll("*").remove();

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

                    diagramas.append('text')
                        .text((d + 1))
                        .attr('x', 10)
                        .attr('y', adjustY - 5)
                        .attr("font-size", "20px")
                        .attr("opacity", "0.5")
                        .attr("font-family", "sans-serif")
                        .attr("stroke-width", 3);

                    if (fretMin > 1) {
                        diagramas.append("text")
                            .text('fr. ' + fretMin)
                            .attr('x', 6)
                            .attr('y', 83 + adjustY)
                            .attr("font-size", "10.5px")
                            .attr("font-family", "sans-serif")
                            .attr("stroke-width", 1);
                    }

                    for (var i = 0; i < 7; i++) {
                        diagramas.append('line')
                            .attr('x1', 10)
                            .attr('y1', 10 * i + adjustY)
                            .attr('x2', 200)
                            .attr('y2', 10 * i + adjustY)
                            .attr('stroke', 'black')
                            .attr('stroke-width', 0.3 * i);
                    }

                    for (var i = 0; i < 6; i++) {
                        diagramas.append('line')
                            .attr('x1', 10 + 38 * i)
                            .attr('y1', 10 + adjustY)
                            .attr('x2', 10 + 38 * i)
                            .attr('y2', 60.9 + adjustY)
                            .attr('stroke', 'gray')
                            .attr('stroke-width', 1);
                    }
                    if (fretMin <= 1) {
                        diagramas.append('line')
                            .attr('x1', 5)
                            .attr('y1', 9.8 + adjustY)
                            .attr('x2', 5)
                            .attr('y2', 60.9 + adjustY)
                            .attr('stroke', 'black')
                            .attr('stroke-width', 1);

                        diagramas.append('line')
                            .attr('x1', 5)
                            .attr('y1', 10 + adjustY)
                            .attr('x2', 10.5)
                            .attr('y2', 10 + adjustY)
                            .attr('stroke', 'black')
                            .attr('stroke-width', 0.3);

                        diagramas.append('line')
                            .attr('x1', 5)
                            .attr('y1', 10 * i + adjustY)
                            .attr('x2', 9.5)
                            .attr('y2', 10 * 6 + adjustY)
                            .attr('stroke', 'black')
                            .attr('stroke-width', 1.8);
                    }
                    // for (var i = 0; i < pisada.length; i++) {
                    //     diagramas.append('text')
                    //         .text('  ' + pisada[i][2] + '   ')
                    //         .attr('x', 6 + i * 15)
                    //         .attr('y', 100)
                    //         .attr("font-size", "12px")
                    //         .attr("font-family", "sans-serif")
                    //         .attr('stroke-width', 1.8);
                    // }

                    for (var i = 0; i < pisada.length; i++) {


                        diagramas.append('circle')
                            .attr('cx', 38 * ((Math.abs(fretMin - pisada[i][1]) % 5) + 1) - 9)
                            .attr('cy', 10 * pisada[i][0] + adjustY)
                            .attr('r', 6)
                            .attr('stroke', 'none')
                            .attr('stroke-width', 1)
                            .attr('fill', pallete[(pisada[i][2] + 3) % 12])

                        diagramas.append("text")
                            .text(numtonot[pisada[i][2]])
                            .attr('x', 38 * ((Math.abs(fretMin - pisada[i][1]) % 5) + 1) - 9)
                            .attr('y', 10 * pisada[i][0] + 3.8 + adjustY)
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

        // let data = `
        //   options font-face='times' 
        //   tabstave notation=true clef=treble key=C tuning=standard 
        // `
        // for (var i = 0; i < progresion.length; i++) {
        //     var chord = '\n notes :w ('
        //     for (var j = 0; j < progresion[i].length; j++) {
        //         chord = chord + (progresion[i][j][1] + '/' + progresion[i][j][0] + '.');
        //     }
        //     chord = chord.slice(0, chord.length - 1) + chord.slice(chord.length);
        //     chord = chord + ')';
        //     data = data + chord
        // }

        // data = data + '=|=';
        // // data = data + '\n text :w,Cmaj7,Dm7,F#add9b5,Dmadd11,Esus2add13,Cmadd9,F#b5add11,Dmaddb9'

        // const VF = vextab.Vex.Flow

        // const renderer = new VF.Renderer($('#boo')[0],
        //     VF.Renderer.Backends.SVG);

        // // Initialize VexTab artist and parser.
        // const artist = new vextab.Artist(10, 10, 750, { scale: 1 });
        // const tab = new vextab.VexTab(artist);

        // tab.parse(data);
        // artist.render(renderer);

        function playchord(coordenadas) {

            const samplePaths = [];

            for (var i = 0; i < coordenadas.length; i++) {
                var src_i = "../sounds/" + coordenadas[i] + ".mp3";
                samplePaths.push(src_i);
            }

            async function getFile(filePath) {
                const response = await fetch(filePath);
                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                return audioBuffer;
            }

            async function setupSamples(paths) {
                const audioBuffers = [];

                for (const path of paths) {
                    const sample = await getFile(path);
                    audioBuffers.push(sample);
                }
                return audioBuffers;
            }

            function playSample(audioBuffer, time) {
                var sampleSource = audioContext.createBufferSource();
                var gainNode = audioContext.createGain();
                sampleSource.buffer = audioBuffer;
                sampleSource.connect(gainNode);
                gainNode.connect(audioContext.destination);
                gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
                sampleSource.start(time);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2.5);
            }

            setupSamples(samplePaths).then((response) => {
                const samples = response;
                for (i = 0; i < samples.length; i++) {
                        playSample(samples[i], 0);
                }
            });

        }


        let fileContent = `
\\title "Mi cancion" 
\\subtitle "Yo"
\\tempo 180
\\instrument 25
.
`

        for (var i = 0; i < progresion.length; i++) {
            chord = ').1'
            for (var j = 0; j < progresion[i].length; j++) {

                chord = (progresion[i][j][1] + '.' + progresion[i][j][0] + ' ') + chord;
            }
            chord = '(' + chord + '{ch' + '"' + chordNm(list[i].map(i => Number(i)))[1] + '"' + '} |';
            fileContent = fileContent + chord;
        }
        fileContent = fileContent.slice(0, -1);
        // console.log(fileContent);

        let blob = new Blob([fileContent], { type: 'text/plain' });

        var link = URL.createObjectURL(blob);
        // console.log(link)


        // load elements
        let wrapper = document.querySelector(".at-wrap");
        let main = wrapper.querySelector(".at-main");

        // initialize alphatab
        let settings = {
            file: link,
            notation: {
                elements: {
                    effectTempo: false,
                    trackNames: false,
                    EffectDynamics: false
                }
            },
            player: {
                enablePlayer: true,
                soundFont: "https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/soundfont/sonivox.sf2",
                scrollElement: wrapper.querySelector('.at-viewport')
            }
        };

        let api = new alphaTab.AlphaTabApi(main, settings);
        api.destroy();
        api = new alphaTab.AlphaTabApi(main, settings);



        document.getElementById('export').onclick = function (e) {
            const exporter = new alphaTab.exporter.Gp7Exporter();
            const data = exporter.export(api.score, api.settings); // will return a Uint8Array

            // trigger download
            const a = document.createElement('a');
            a.download = api.score.title.length > 0 ? api.score.title + '.gp' : 'Untitled.gp';
            a.href = URL.createObjectURL(new Blob([data]));
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };

        // overlay logic
        const overlay = wrapper.querySelector(".at-overlay");
        api.renderStarted.on(() => {
            overlay.style.display = "flex";
        });
        api.renderFinished.on(() => {
            overlay.style.display = "none";
        });

        // // track selector
        // function createTrackItem(track) {
        //     const trackItem = document
        //         .querySelector("#at-track-template")
        //         .content.cloneNode(true).firstElementChild;
        //     trackItem.querySelector(".at-track-name").innerText = track.name;
        //     trackItem.track = track;
        //     trackItem.onclick = (e) => {
        //         e.stopPropagation();
        //         api.renderTracks([track]);
        //     };
        //     return trackItem;
        // }
        // const trackList = wrapper.querySelector(".at-track-list");
        // api.scoreLoaded.on((score) => {
        //     // clear items
        //     trackList.innerHTML = "";
        //     // generate a track item for all tracks of the score
        //     score.tracks.forEach((track) => {
        //         trackList.appendChild(createTrackItem(track));
        //     });
        // });
        // api.renderStarted.on(() => {
        //     // collect tracks being rendered
        //     const tracks = new Map();
        //     api.tracks.forEach((t) => {
        //         tracks.set(t.index, t);
        //     });
        //     // mark the item as active or not
        //     const trackItems = trackList.querySelectorAll(".at-track");
        //     trackItems.forEach((trackItem) => {
        //         if (tracks.has(trackItem.track.index)) {
        //             trackItem.classList.add("active");
        //         } else {
        //             trackItem.classList.remove("active");
        //         }
        //     });
        // });

        /** Controls **/
        api.scoreLoaded.on((score) => {
            wrapper.querySelector(".at-song-title").innerText = score.title;
            wrapper.querySelector(".at-song-artist").innerText = score.artist;
        });

        const countIn = wrapper.querySelector('.at-controls .at-count-in');
        countIn.onclick = () => {
            countIn.classList.toggle('active');
            if (countIn.classList.contains('active')) {
                api.countInVolume = 1;
            } else {
                api.countInVolume = 0;
            }
        };

        const metronome = wrapper.querySelector(".at-controls .at-metronome");
        metronome.onclick = () => {
            metronome.classList.toggle("active");
            if (metronome.classList.contains("active")) {
                api.metronomeVolume = 1;
            } else {
                api.metronomeVolume = 0;
            }
        };

        const loop = wrapper.querySelector(".at-controls .at-loop");
        loop.onclick = () => {
            loop.classList.toggle("active");
            api.isLooping = loop.classList.contains("active");
        };

        wrapper.querySelector(".at-controls .at-print").onclick = () => {
            api.print();
        };

        const zoom = wrapper.querySelector(".at-controls .at-zoom select");
        zoom.onchange = () => {
            const zoomLevel = parseInt(zoom.value) / 100;
            api.settings.display.scale = zoomLevel;
            api.updateSettings();
            api.render();
        };

        const layout = wrapper.querySelector(".at-controls .at-layout select");
        layout.onchange = () => {
            switch (layout.value) {
                case "horizontal":
                    api.settings.display.layoutMode = alphaTab.LayoutMode.Horizontal;
                    break;
                case "page":
                    api.settings.display.layoutMode = alphaTab.LayoutMode.Page;
                    break;
            }
            api.updateSettings();
            api.render();
        };


        // player loading indicator
        const playerIndicator = wrapper.querySelector(
            ".at-controls .at-player-progress"
        );
        api.soundFontLoad.on((e) => {
            const percentage = Math.floor((e.loaded / e.total) * 100);
            playerIndicator.innerText = percentage + "%";
        });
        api.playerReady.on(() => {
            playerIndicator.style.display = "none";
        });


        // main player controls
        const playPause = wrapper.querySelector(
            ".at-controls .at-player-play-pause"
        );
        const stop = wrapper.querySelector(".at-controls .at-player-stop");
        playPause.onclick = (e) => {
            if (e.target.classList.contains("disabled")) {
                return;
            }
            api.playPause();
        };
        stop.onclick = (e) => {
            if (e.target.classList.contains("disabled")) {
                return;
            }
            api.stop();
        };
        api.playerReady.on(() => {
            playPause.classList.remove("disabled");
            stop.classList.remove("disabled");
        });
        api.playerStateChanged.on((e) => {
            const icon = playPause.querySelector("i");
            if (e.state === alphaTab.synth.PlayerState.Playing) {
                icon.classList.remove("fa-play");
                icon.classList.add("fa-pause");
            } else {
                icon.classList.remove("fa-pause");
                icon.classList.add("fa-play");
            }
        });

        // song position
        function formatDuration(milliseconds) {
            let seconds = milliseconds / 1000;
            const minutes = (seconds / 60) | 0;
            seconds = (seconds - minutes * 60) | 0;
            return (
                String(minutes).padStart(2, "0") +
                ":" +
                String(seconds).padStart(2, "0")
            );
        }
        let position;
        const songPosition = wrapper.querySelector(".at-song-position");
        let previousTime = -1;
        api.playerPositionChanged.on((e) => {
            // reduce number of UI updates to second changes.
            const currentSeconds = (e.currentTime / 1000) | 0;
            if (currentSeconds == previousTime) {
                return;
            }

            songPosition.innerText =
                formatDuration(e.currentTime) + " / " + formatDuration(e.endTime);

            position = e.currentTime
        });

        /// Mute tracks to use own sounds /////////////////
        function createTrackItem(track) {
            api.renderTracks([track]);
        }

        api.scoreLoaded.on((score) => {
            // clear items
            // generate a track item for all tracks of the score
            score.tracks.forEach((track) => {
                createTrackItem(track);
                api.changeTrackMute(track, true);
            });
        });

        ///Coordinate tick to trigger sounds ///////////////////////
        api.midiEventsPlayedFilter = [alphaTab.midi.MidiEventType.SystemExclusive2];

        api.midiEventsPlayed.on(function (e) {

            for (const midi of e.events) {

                if (midi.isMetronome) {
                    var count = (midi.tick / 960) % 4;
                    var index = (midi.tick / 960) / 4
                    // console.log('Metronome tick ' + (midi.tick / 960) / 4 + (midi.tick / 960) % 4);
                    // console.log('index' + index);
                    // console.log('position' + position)
                    if (count == 0 && Math.round(position / 1333.333) - index == 0 && position != 0) {
                        // console.log('condition' + (Math.round(position/1333.333) - index))
                        audioContext.resume();


                        const samplePaths = [];

                        for (var i = 0; i < progresion[index].length; i++) {
                            var acorde = progresion[index][i][0] + '-' + progresion[index][i][1];
                            var src_i = "../sounds/" + acorde + ".mp3";
                            samplePaths.push(src_i);
                        }
                    
                        async function getFile(filePath) {
                            const response = await fetch(filePath);
                            const arrayBuffer = await response.arrayBuffer();
                            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                            return audioBuffer;
                        }
                    
                        async function setupSamples(paths) {
                            const audioBuffers = [];
                    
                            for (const path of paths) {
                                const sample = await getFile(path);
                                audioBuffers.push(sample);
                            }
                            return audioBuffers;
                        }
                    
                        function playSample(audioBuffer, time) {
                            var sampleSource = audioContext.createBufferSource();
                            var gainNode = audioContext.createGain();
                            sampleSource.buffer = audioBuffer;
                            sampleSource.connect(gainNode);
                            gainNode.connect(audioContext.destination);
                            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
                            sampleSource.start(time);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2.5);
                        }
                    
                        setupSamples(samplePaths).then((response) => {
                            const samples = response;
                            for (i = 0; i < samples.length; i++) {
                                    playSample(samples[i], 0);
                            }
                        });
                    }
                }
            }
        });
        // const boxes = Array.from(document.getElementsByClassName('selectorChords'));

        // boxes.forEach(box => {
        //     box.remove();
        // });

        // document.getElementById('menusDrawer').remove();

    } else {
        alert('Antes de generar la progresión, necesitas seleccionar un mínimo de 3 notas para cada acorde!');
        console.log(list)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById("partitura").style.display = 'none';

function crearMenus() {
    btnCount = btnCount + 1;
    listaF.push([]);
    let zona = document.getElementById("menusDrawer");
    zona.appendChild(document.createElement("br"));
    new menuBotones(btnCount);
    console.log(listaF);
}

class menuBotones {
    constructor(index) {

        function getIndexOfArray(array, findArray) {
            let index;
            array.some((item, i) => {
                if (JSON.stringify(item) === JSON.stringify(findArray)) {
                    index = i;
                    return true;
                }
            });
            return index;
        }

        console.log(listaF);
        let zona = document.getElementById("menusDrawer");
        let f = document.createElement('div');
        f.id = 'f' + btnCount;

        for (var i = 0; i < 12; i++) {
            let btn = document.createElement("button");
            btn.append(numtonot[i]);
            btn.id = i;
            btn.value = "OFF";
            btn.classList.add('btnOffC');
            btn.style.background = pallete[(i + 3) % 12];


            btn.onclick = function toggle() {
                var allFp = amplify.store("allFp");
                var allFpNames = amplify.store("allFpNames");
                var chordInTime;
                var ChFp;
                if (listaF[index - 1].length < 6) {
                    if (btn.value == "OFF") {
                        btn.value = "ON";
                        btn.classList.remove('btnOffC');
                        btn.classList.add('btnOnC');
                        listaF[index - 1].push(btn.id);

                        if (listaF[index - 1].length > 2) {
                            if (document.getElementById('g' + index)) {
                                document.getElementById('g' + index).remove();
                            }
                            chordInTime = (listaF[index - 1].map(i => Number(i)));
                            ChFp = dodeca(chordInTime);
                            var g = document.createElement('div');
                            g.setAttribute("style", "font-size: 18px; margin: 5px; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Verdana, sans-serif;");
                            g.id = 'g' + index;
                            f.append(g);
                            document.getElementById('g' + index).append(allFpNames[getIndexOfArray(allFp, formaPrimaIn)] + ' | ');
                            document.getElementById('g' + index).append(ChFp + ' | ');
                            document.getElementById('g' + index).append(chordNm(chordInTime)[1]);

                        }
                        else if (listaF[index - 1].length < 3) {
                            if (document.getElementById('g' + index)) {
                                document.getElementById('g' + index).remove();
                            }
                        }
                    }

                    else if (btn.value == "ON") {
                        btn.value = "OFF";
                        listaF[index - 1].splice(listaF[index - 1].indexOf(btn.id), 1);
                        btn.classList.remove('btnOnC');
                        btn.classList.add('btnOffC');

                        if (listaF[index - 1].length > 2) {
                            if (document.getElementById('g' + index)) {
                                document.getElementById('g' + index).remove();
                            }
                            chordInTime = (listaF[index - 1].map(i => Number(i)));
                            ChFp = dodeca(chordInTime);
                            var g = document.createElement('div');
                            g.setAttribute("style", "font-size: 18px; margin: 5px; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Verdana, sans-serif;");
                            g.id = 'g' + index;
                            f.append(g);
                            document.getElementById('g' + index).append(allFpNames[getIndexOfArray(allFp, formaPrimaIn)] + ' | ');
                            document.getElementById('g' + index).append(ChFp);
                            document.getElementById('g' + index).append(chordNm(chordInTime)[1]);
                        }
                        else if (listaF[index - 1].length < 3) {
                            if (document.getElementById('g' + index)) {
                                document.getElementById('g' + index).remove();
                            }
                        }
                    }
                }
                else if (listaF[index - 1].length === 6) {
                    if (btn.value == "ON") {
                        btn.value = "OFF";
                        listaF[index - 1].splice(listaF[index - 1].indexOf(btn.id), 1);
                        btn.classList.remove('btnOnC');
                        btn.classList.add('btnOffC');

                        if (listaF[index - 1].length > 2) {
                            if (document.getElementById('g' + index)) {
                                document.getElementById('g' + index).remove();

                            } chordInTime = (listaF[index - 1].map(i => Number(i)));
                            ChFp = dodeca(chordInTime);
                            var g = document.createElement('div');
                            g.setAttribute("style", "font-size: 18px; margin: 5px; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Verdana, sans-serif;");
                            g.id = 'g' + index;
                            f.append(g);
                            document.getElementById('g' + index).append(allFpNames[getIndexOfArray(allFp, formaPrimaIn)] + ' | ');
                            document.getElementById('g' + index).append(ChFp);
                            document.getElementById('g' + index).append(chordNm(chordInTime)[1]);
                        }
                        else if (listaF[index - 1].length < 3) {
                            if (document.getElementById('g' + index)) {
                                document.getElementById('g' + index).remove();
                            }
                        }
                    }

                }
            };
            zona.append(btn);

        }
        zona.appendChild(document.createElement("br"));
        zona.append(f)
        zona.appendChild(document.createElement("br"));
    }
}

function removeChord() {
    if (document.getElementById("menusDrawer").childNodes.length > 0) {
        listaF.pop();
        btnCount = btnCount - 1;
        console.log(listaF);
        for (var i = 0; i < 16; i++) {
            document.getElementById("menusDrawer").removeChild(document.getElementById("menusDrawer").lastChild);
        }
    }
    document.getElementById("partitura").style.display = 'none';
}

function eraseChords() {
    var diagramas = d3.select('.drawerDiagrama');
    diagramas.selectAll("*").remove();
    document.getElementById("partitura").style.display = 'none';

}

window.onload = function () { crearMenus() };