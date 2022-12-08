const afinacion = [4, 11, 7, 2, 9, 4];
let serie;
notas = []
console.log(notas);
var buttons = [];
var coord = [];
let mtx = [];
let pisadas = [];
let audioContext;
let pallete = ["rgb(0,231,6,0.5)", "rgb(0,255,173,0.5)", "rgb(0,107,255,0.5)", "rgb(49,1,250,0.5)", "rgb(131,1,205,0.5)", "rgb(63,0,87,0.5)", "rgb(103,4,81,0.5)", "rgb(215,1,2,0.5)", "rgb(227,67,3,0.5)", "rgb(255,136,0,0.5)", "rgb(236,255,0,0.5)", "rgb(154,243,4,0.5)"];
let complemento;

window.addEventListener('load', init, false);
function init() {
    try {
        audioContext = new AudioContext();
    }
    catch (e) {
        alert('Web Audio API is not supported in this browser');
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////

function dibujaTodo() {
    serie = notas;

    var formas = d3.select('.drawerForm').classed("svg-container", true).append("svg")
        .attr("height", "500");

    // formas.append('circle')
    //     .attr('cx', 151)
    //     .attr('cy', 88)
    //     .attr('r', 68)
    //     .attr('stroke', 'gray')
    //     .attr('stroke-width', 0.5)
    //     .attr('fill', 'gray')
    //     .attr('opacity', 0.5)

    var angle = 360 / 12;
    for (var i = 0; i < 12; i++) {
        x = 151 + 68 * Math.sin(angle * i * Math.PI / 180);
        y = 88 - 68 * Math.cos(angle * i * Math.PI / 180);
        // formas.append('circle')
        //     .attr('cx', x)
        //     .attr('cy', y)
        //     .attr('r', 8)
        //     .attr('stroke', 'gray')
        //     .attr('stroke-width', 0.5)
        //     .attr('fill', 'gray')
        //     .attr('opacity', 0.5);
        coord.push([x, y]);
    }
    console.log(coord);

    function polygon() {
        var formas = d3.select('.drawerForm').classed("svg-container", true).append("svg")
            .attr("height", "500");
        var vert = []
        for (var i = 0; i < 12; i++) {
            if (buttons[i].className == 'btnOn') {
                vert.push(coord[buttons[i].id])
            }
        }

        if (vert.length > 1) {
            vert = vert.flat();
            formas.append("polygon")
                .attr("points", vert)
                .style("fill", "white")
                .style("stroke", "gray")
                .style("strokeWidth", "10px");
        }
    }

    var ul = document.getElementById("list");

    for (var i = 0; i < 12; i++) {
        var li = document.createElement("li");
        let btn = document.createElement("button");
        btn.innerHTML = (i + 9) % 12;
        li.appendChild(btn);
        li.setAttribute("style", "--j:" + i);
        btn.setAttribute("id", (i + 9) % 12);
        btn.setAttribute("class", "btnOff");
        btn.setAttribute("value", 0);
        btn.style.background = pallete[i];
        ul.appendChild(li);
        buttons.push(btn)
    }

    for (var i = 0; i < 12; i++) {


        buttons[i].onclick = function () {

            if (this.value == 0 && notas.length < 6) {
                this.setAttribute("value", 1);
                this.setAttribute("class", "btnOn");
                notas.push(JSON.parse(this.id));
                console.log(notas);
                d3.select('.drawerDiagrama').selectAll("svg").remove();
                d3.select('.drawerDiapason').selectAll("svg").remove();
                d3.select('.drawerForm').selectAll("svg").remove();

                pisadas = [];
                mtx = [];

                console.clear();
                dodeca(notas);
                dibujaDiapason(notas);
                generadorDiagramas();
                dibujaMatrix();
                formaPrima();
                polygon();
            }
            else if (this.value == 1) {
                this.setAttribute("value", 0);
                this.setAttribute("class", "btnOff");
                notas.splice(notas.indexOf(JSON.parse(this.id)), 1);
                console.log(notas);

                if (notas.length == 0) {
                    d3.select('.drawerDiagrama').selectAll("svg").remove();
                    d3.select('.drawerDiapason').selectAll("svg").remove();
                    d3.select('.drawerForm').selectAll("svg").remove();
                    document.getElementById("forma").innerHTML = "&nbsp";

                } else {
                    d3.select('.drawerDiagrama').selectAll("svg").remove();
                    d3.select('.drawerDiapason').selectAll("svg").remove();
                    d3.select('.drawerForm').selectAll("svg").remove();

                    pisadas = [];
                    mtx = [];

                    console.clear();
                    dodeca(notas);
                    dibujaDiapason(notas);
                    generadorDiagramas();
                    dibujaMatrix();
                    formaPrima();
                    polygon();
                }
            }
        };
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////

var dibujaDiapason = (notas) => {
    console.log(complemento)
    var diapason = d3.select('.drawerDiapason').classed("svg-container", true).append('svg')
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "4 0 400 100")
        .classed("svg-content-responsive-diapason", true);


    for (var i = 0; i < 7; i++) {
        diapason.append('line')
            .attr('x1', 10)
            .attr('y1', 10 * i)
            .attr('x2', 397.5)
            .attr('y2', 10 * i)
            .attr('stroke', 'black')
            .attr('stroke-width', 0.3 * i);
    }

    for (var i = 0; i < 23; i++) {
        diapason.append('line')
            .attr('x1', 10 + 17.62 * i)
            .attr('y1', 10)
            .attr('x2', 10 + 17.62 * i)
            .attr('y2', 60.9)
            .attr('stroke', 'gray')
            .attr('stroke-width', 0.5);
    }

    diapason.append('line')
        .attr('x1', 5)
        .attr('y1', 9.8)
        .attr('x2', 5)
        .attr('y2', 60.9)
        .attr('stroke', 'black')
        .attr('stroke-width', 1);

    diapason.append('line')
        .attr('x1', 5)
        .attr('y1', 10)
        .attr('x2', 10.5)
        .attr('y2', 10)
        .attr('stroke', 'black')
        .attr('stroke-width', 0.3);

    diapason.append('line')
        .attr('x1', 5)
        .attr('y1', 10 * 6)
        .attr('x2', 9.5)
        .attr('y2', 10 * 6)
        .attr('stroke', 'black')
        .attr('stroke-width', 1.8);

    for (var i = 1; i < 10; i++) {
        if (i == 1) {
            diapason.append('circle')
                .attr('cx', 10 + 44.5 * i)
                .attr('cy', 35)
                .attr('r', 2.8)
                .attr('stroke', 'gray')
                .attr('stroke-width', 0.5)
                .attr('fill', 'gray')
                .attr('opacity', 0.5)
        } else if (i >= 5 && i < 9) {
            diapason.append('circle')
                .attr('cx', 35.24 * i + 90)
                .attr('cy', 35)
                .attr('r', 2.8)
                .attr('stroke', 'gray')
                .attr('stroke-width', 0.5)
                .attr('fill', 'gray')
                .attr('opacity', 0.5)
        } else if (i < 5) {
            diapason.append('circle')
                .attr('cx', 35.24 * i + 19)
                .attr('cy', 35)
                .attr('r', 2.8)
                .attr('stroke', 'gray')
                .attr('stroke-width', 0.5)
                .attr('fill', 'gray')
                .attr('opacity', 0.5)
        } else {
            for (var m = 1; m < 3; m++) {
                diapason.append('circle')
                    .attr('cx', 17.75 * 12)
                    .attr('cy', 20 * m + 5)
                    .attr('r', 2.8)
                    .attr('stroke', 'gray')
                    .attr('stroke-width', 0.5)
                    .attr('fill', 'gray')
                    .attr('opacity', 0.5)
            }
        }
    }

    for (var n = 0; n < notas.length; n++) {
        for (var i = 0; i < 6; i++) {
            for (var j = 1; j < 23; j++) {
                var posiciones = (afinacion[i] + j) % 12;
                if (posiciones == notas[n]) {
                    pisadas.push([i + 1, j, posiciones]);
                    diapason.append('circle')
                        .attr('cx', 17.75 * j)
                        .attr('cy', 10 * i + 10)
                        .attr('r', 4.4)
                        .attr('stroke', 'none')
                        .attr('stroke-width', 0.5)
                        .attr('fill', pallete[(posiciones + 3) % 12])
                        .on("mouseover", function (d) {
                            d3.select(this).style("stroke", "red").style("cursor", "pointer");
                        }).on("mouseout", function (d) {
                            d3.select(this).style("stroke", "none").style("cursor", "pointer");
                        }).on("click", function () {
                            self = d3.select(this);
                            var y = self.attr('cy') / 10;
                            var x = self.attr('cx') / 17.75;
                            var notaSampler = [y + "-" + x]
                            console.log(notaSampler)
                            audioContext.resume();
                            playchord(notaSampler);
                        });
                    diapason.append("text")
                        .text(notas[n])
                        .attr('x', 17.75 * j)
                        .attr('y', 10 * i + 12.5)
                        .attr("font-size", "6px")
                        .attr('fill', 'white')
                        .attr("font-family", "sans-serif")
                        .style("text-anchor", "middle");
                }

            }
        }
    }


}

//////////////////////////////////////////////////////////////////////////////////////////////

function generadorDiagramas() {
    var mtx2 = [];
    var s1 = [];
    var a;
    var b;

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

    for (var i = 0; i < 18; i++) {
        a = 5 + i;
        b = 1 + i;
        s1.push([]);
        pisadas.forEach(function (t) {
            if (t[1] <= a && t[1] >= b) {
                s1[i].push(t);
            }
        });
    }
    console.log(s1);

    s1.forEach(function (x) {
        var myGrid = [...Array(notas.length)].map((e) => Array());

        x.forEach(function (y) {
            for (var c = 0; c < notas.length; c++) {
                if (y[2] == notas[c]) {
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
    console.log(mtx);
}


//////////////////////////////////////////////////////////////////////////////////////////////

function dibujaMatrix() {
    let adjustY = 30;


    for (var d = 0; d < mtx.length; d++) {
        var trastes = [];
        for (var t = 0; t < mtx[d].length; t++) {

            trastes.push(mtx[d][t][1]);

        }
        var fretMin = Math.min(...trastes);
        var fretMax = Math.max(...trastes);

        var dibujaDiagrama = (pisada) => {

            var diagramas = d3.select('.drawerDiagrama').classed("svg-container", true).append('svg')

                .attr("preserveAspectRatio", "xMidYMid meet")
            //.attr("viewBox", "0 0 600 100")
            //.classed("svg-content-responsive-diagrama", true);

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


                diagramas.append('circle')
                    .attr('cx', 38 * ((Math.abs(fretMin - pisada[i][1]) % 5) + 1) - 9)
                    .attr('cy', 10 * pisada[i][0] + adjustY)
                    .attr('r', 6)
                    .attr('stroke', 'none')
                    .attr('stroke-width', 1)
                    .attr('fill', pallete[(pisada[i][2] + 3) % 12])

                diagramas.append("text")
                    .text(pisada[i][2])
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
        dibujaDiagrama(mtx[d]);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////

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
        for(i=0;i <6; i++){
            if (samples[i] != undefined)
            playSample(samples[i], 0);
        }
    });

}

////////////////////////////////////////////////////////////////////////////////////////////////


function formaPrima() {
    complemento = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    complemento.splice(complemento.indexOf(serie), 1);


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

    var allFp = amplify.store("allFp");
    var allFpNames = amplify.store("allFpNames");

    var paragraph = document.getElementById("forma");
    var paragraph2 = document.getElementById("acorde");

    var text = document.createTextNode(allFpNames[getIndexOfArray(allFp, formaPrimaIn)]
        + ' |  ' + fPrR + ' | ');

    if (allFpNames[getIndexOfArray(allFp, formaPrimaIn)] != undefined) {
        document.title = allFpNames[getIndexOfArray(allFp, formaPrimaIn)]
    } else {
        document.title = 'Guitarra Postonal en Línea'
    }

    var notext = document.createTextNode(' |  ' + fPrR + ' | ');
    var chordtext = document.createTextNode(chordNm(notas)[1])
    document.getElementById("forma").innerHTML = "";
    document.getElementById("acorde").innerHTML = "";

    if (notas.length >= 3) {
        paragraph2.appendChild(chordtext);
        paragraph.appendChild(text);
    }
    else {
        paragraph.appendChild(notext);
    }
    var res = fPrR;
    return res;
}

//////////////////////////////////////////////////////////////////////////////////////////////////

dibujaTodo();

/////////////////////////////////////////////////////////////////////////////////////////////////
let inputN;

function onload() {
    if (amplify.store("pisadas")) {
        inputN = amplify.store("pisadas");
        complemento = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        for (var i = 0; i < inputN.length; i++) {
            complemento.splice(complemento.indexOf(inputN[i]), 1);
            var id = inputN[i];
            // console.log(notas[i], buttons[(notas[i] + 3) % 12])
            if (inputN[i] = buttons[(inputN[i] + 3) % 12]) {
                var btnprsd = document.getElementById(id);
                btnprsd.click();
            }
        }
    }
}
window.onload = onload();

window.onbeforeunload = closingCode;
function closingCode() {
    amplify.store("pisadas", null);
    return null;
}

serie = [];

function complementoW() {
    serie = [];
    complemento = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    for (var h = 0; h < buttons.length; h++) {
        if (buttons[h].className == "btnOn") {
            var asi = parseInt(buttons[h].id);
            serie.push(asi);
        }
    }

    for (var h = 0; h < serie.length; h++) {
        complemento.splice(complemento.indexOf(serie[h]), 1);
    }

    if (serie.length < 6) {
        var w = window.open(
            "/complemento.html", "_blank");
        amplify.store("complemento", complemento);
    } else if (serie.length == 6) {
        var compbtn = complemento;

        for (var t = 0; t < buttons.length; t++) {
            if (buttons[t].className == "btnOn") {
                buttons[t].click();
            }
        }

        for (var t = 0; t < buttons.length; t++) {
            if (compbtn.includes(parseInt(buttons[t].id)) == true) {
                buttons[t].click();
            }
        }
    }
}

function inversionW() {
    serie = [];

    function permutaciones(notes) {
        var formaPrimaIn2;
        var tricorde = notes;
        var permu = [];
        var formaPrimaCal = [];
        var formaPrimaSel = [];
        var formaPrimaOri = [];

        for (var e = 0; e < tricorde.length; e++) {
            var fPrR2;
            var tri0 = [];
            var retro0 = [];
            var tri0sum;
            var tri0Max;
            var tri0Min;
            var retro0sum;
            var retro0Max;
            var retro0Min;

            tricorde.forEach(function (nota) {
                var nuevoValor = (nota - tricorde[e] + 12) % 12;
                tri0.push(nuevoValor);
                tri0.sort((a, b) => a - b);
                // tri0sum = tri0.reduce((a, b) => a + b, 0);
                tri0Max = Math.max(...tri0);
                tri0Min = Math.min(...tri0);
                tri0sum = tri0Max - tri0Min;

                var nuevoValorR = (tricorde[e] - nota + 12) % 12;
                retro0.push(nuevoValorR);
                retro0.sort((a, b) => a - b);
                // retro0sum = retro0.reduce((a, b) => a + b, 0);
                retro0Max = Math.max(...retro0);
                retro0Min = Math.min(...retro0);
                retro0sum = retro0Max - retro0Min;

            });

            formaPrimaCal.push(tri0sum, retro0sum);
            formaPrimaSel.push(tri0, retro0);
            formaPrimaOri.push(tricorde[e].toString(), "'" + tricorde[e].toString());
            permu.push(
                "(" + tri0 + ")" + " " + tricorde[e].toString(),
                "(" + retro0 + ")" + " '" + tricorde[e].toString(),
            );
        }

        var allindx = getAllIndexes(formaPrimaCal, Math.min(...formaPrimaCal));
        var lastcomp = [];
        var lastcompIndx = [];
        var lastcompVal;
        var namIndx = []

        for (var i = 0; i < allindx.length; i++) {
            lastcompVal = formaPrimaSel[allindx[i]]
            lastcompVal = lastcompVal.reduce((a, b) => a + b, 0);
            lastcomp.push(lastcompVal);
            lastcompIndx.push(formaPrimaSel[allindx[i]]);
            namIndx.push(allindx[i]);
        }
        var formaPrimaIndex = Math.min(...lastcomp);
        formaPrimaIn2 = lastcompIndx[lastcomp.indexOf(formaPrimaIndex)];

        // var formaPrimaIn = formaPrimaCal.indexOf(Math.min(...formaPrimaCal));
        fPrR2 = `(${formaPrimaIn2}) ${formaPrimaOri[namIndx[lastcomp.indexOf(formaPrimaIndex)]]}`;
        return [formaPrimaIn2, formaPrimaOri[namIndx[lastcomp.indexOf(formaPrimaIndex)]]];
    }


    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].className == 'btnOn') {
            serie.push((parseInt(buttons[i].id)));
        }
    }

    function inv(notes) {
        var p1 = notes[0];
        var res = [];
        notes.forEach(function (unaNota) {
            var nuevoValor = (unaNota - p1) * -1 + p1;
            res.push((nuevoValor + 12) % 12);
        });
        return res;
    }

    let seriefP = permutaciones(serie)[0];
    let seriefPn = permutaciones(serie)[1];

    // console.log(seriefP);

    let serieEv = [];
    let invS;


    for (var j = 0; j < seriefP.length; j++) {
        if (seriefPn.includes("'") == true) {
            serieEv.push((seriefP[j] + parseInt(seriefPn[1])) % 12)
        }
        if (seriefPn.includes("'") == false) {
            serieEv.push((seriefP[j] + parseInt(seriefPn[0])) % 12)
        }
    }

    if (seriefPn.includes("'") == true) {
        invS = serieEv;
    }
    if (seriefPn.includes("'") == false) {
        invS = inv(serieEv);
    }

    // console.log(serieEv)

    // console.log(serie, seriefP, invS)

    for (var t = 0; t < buttons.length; t++) {
        if (buttons[t].className == "btnOn") {
            buttons[t].click();
        }
    }

    for (var t = 0; t < buttons.length; t++) {

        if (invS.includes(parseInt(buttons[t].id)) == true) {
            buttons[t].click()
        }
    }
    serie = invS;
    amplify.store("pisadas", serie)
}

function transponerW() {
    serie = [];

    var tIndex = document.getElementById("tIndex").value;

    if (parseInt(tIndex)) {

        for (var t = 0; t < buttons.length; t++) {
            if (buttons[t].className == "btnOn") {
                buttons[t].click();
                serie.push(parseInt(buttons[t].id))
            }
        }

        for (var t = 0; t < serie.length; t++) {
            var tINdxT = parseInt(tIndex);
            var este

            if (tINdxT > 0) {
                este = ((serie[t] + parseInt(tIndex) % 12));
            }
            if (tINdxT < 0) {
                este = (((serie[t] + parseInt(tIndex) % 12) + 12) % 12);
            }

            buttons[(este + 3) % 12].click()
        }
    }

    amplify.store("pisadas", serie);
}