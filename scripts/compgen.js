const afinacion = [4, 11, 7, 2, 9, 4];
const afinacionMIDI = [64, 59, 55, 50, 45, 40];
let pallete = ["rgb(0,231,6,0.5)", "rgb(0,255,173,0.5)", "rgb(0,107,255,0.5)", "rgb(49,1,250,0.5)", "rgb(131,1,205,0.5)", "rgb(63,0,87,0.5)", "rgb(103,4,81,0.5)", "rgb(215,1,2,0.5)", "rgb(227,67,3,0.5)", "rgb(255,136,0,0.5)", "rgb(236,255,0,0.5)", "rgb(154,243,4,0.5)"];


let list = [[0, 4, 7, 11], [2, 5, 9, 0], [6, 8, 10, 0], [2, 5, 7, 9],[1, 4, 6, 11], [2, 3, 7, 0], [6, 11, 10, 0], [2, 3, 5, 9] ]
let diapason = [];
let acordes = [];
let cuadrantes = [];
let chordsLen = [];
let acomodo = [];
let carrera = [];
let result = [];
let topnoteArr = [];
let chordpoint = [];
let progresion = [];

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

var topnoteArrEv = [];
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
        topnoteArr[i].push({ s: result[i][j][topnoteArrEv[i][j].indexOf(max)][0], f: result[i][j][topnoteArrEv[i][j].indexOf(max)][1] });
    }
}
// console.log(topnoteArr);

for (var i = 0; i < result.length; i++) {
    chordpoint.push([]);
    for (var j = 0; j < result[i].length; j++) {
        chordpoint[i].push([])
        for (var k = 0; k < result[i][j].length; k++) {
            var point = { s: result[i][j][k][0], f: result[i][j][k][1] }
            chordpoint[i][j].push(point);
        }
    }
}
// console.log(chordpoint);

var distance = function (a, b) {
    return Math.pow(a.f - b.f, 2) + Math.pow(a.s - b.s, 2);
}

progresion.push(result[0][0])
function genera() {
    for (var i = 0; i < topnoteArr.length - 1; i++) {
        var previous = topnoteArr[(i + topnoteArr.length - 1) % topnoteArr.length];
        var next = topnoteArr[(i + 1) % topnoteArr.length];

        var treeP = new kdTree(next.flat(), distance, ["s", "f"]);
        var nearP = treeP.nearest(topnoteArr[0][0], 1);
        progresion.push(result[(i + 1) % result.length][next.flat().indexOf(nearP[0][0])]);
        console.log(progresion);
    }
}

genera()


// var points = [
//     { s: 1, f: 2 },
//     { s: 3, f: 4 },
//     { s: 5, f: 6 },
//     { s: 7, f: 8 }
// ];

// var distance = function (a, b) {
//     return Math.pow(a.f - b.f, 2) + Math.pow(a.s - b.s, 2);
// }

// var tree = new kdTree(points, distance, ["s", "f"]);

// var nearest = tree.nearest({ s: 5, f: 5 }, 1);

// console.log(nearest);



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
                    .attr('x', 6 + i*15)
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