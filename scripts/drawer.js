const afinacion = [4, 11, 7, 2, 9, 4];
let pisadas = [];
let mtx = [];
let notas = [];
let audioContext;

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

    //     var svgContainer = d3.select('.drawerDiapason').classed("svg-container", true).append("svg")
    //         .attr("preserveAspectRatio", "xMidYMid meet")
    //         .attr("viewBox", "0 0 400 100")
    //         .classed("svg-content-responsive-reloj", true);


    //     var arcradius = 70 / 2;
    //     var circleradius = 18.33 / 2;

    //     // Approx number of circles we can fit around the circumference
    //     var n = (Math.PI * 2 * arcradius) / (2 * circleradius);

    //     for (var i = 0; i < 12; i++) {
    //         var ang = - (Math.PI * 2 * i) / n;
    //         var cx = arcradius * Math.sin(ang);
    //         var cy = arcradius * Math.cos(ang);

    //         svgContainer.append("circle")
    //             .attr('cx', cx + 200)
    //             .attr('cy', cy + 50)
    //             .attr('r', circleradius) 
    //             .on("mouseover", function (d) {
    //                 d3.select(this).style("fill", "#a6a6a6").style("cursor", "pointer");
    //             }).on("mouseout", function (d) {
    //                 d3.select(this).style("fill", "black").style("cursor", "pointer");
    //             });

    //         svgContainer.append("text").
    //             text((i + 6) % 12)
    //             .attr('x', cx + 200)
    //             .attr('y', cy + 53)
    //             .attr('fill', 'white')
    //             .style("text-anchor", "middle")
    //             .attr("font-size", "7px");
    //     }

    var ul = document.getElementById("list");

    for (var i = 0; i < 12; i++) {
        var li = document.createElement("li");
        let btn = document.createElement("button");
        btn.innerHTML = (i+9)%12;
        li.appendChild(btn);
        li.setAttribute("style", "--j:" + i);
        btn.setAttribute("id", (i+9)%12);
        btn.setAttribute("class", "btnOff");
        btn.setAttribute("value", 0);
        ul.appendChild(li);
    }

    var buttons = document.getElementsByTagName("button");

    for (var i = 0; i < 12; i++) {
        buttons[i].onclick = function () {

            if (this.value == 0 && notas.length < 6) {
                this.setAttribute("value", 1);
                this.setAttribute("class", "btnOn");
                notas.push(JSON.parse(this.id));
                console.log(notas);
                d3.select('.drawerDiagrama').selectAll("svg").remove();
                d3.select('.drawerDiapason').selectAll("svg").remove();
                pisadas = [];
                mtx = [];

                console.clear();
                dodeca();
                dibujaDiapason(notas);
                generadorDiagramas();
                dibujaMatrix();
                formaPrima();
            }
            else if (this.value == 1) {
                this.setAttribute("value", 0);
                this.setAttribute("class", "btnOff");
                notas.splice(notas.indexOf(JSON.parse(this.id)), 1);
                console.log(notas);
                if (notas.length == 0) {
                    d3.select('.drawerDiagrama').selectAll("svg").remove();
                    d3.select('.drawerDiapason').selectAll("svg").remove();
                    document.getElementById("forma").innerHTML = "&nbsp";

                } else {
                    d3.select('.drawerDiagrama').selectAll("svg").remove();
                    d3.select('.drawerDiapason').selectAll("svg").remove();
                    pisadas = [];
                    mtx = [];

                    console.clear();
                    dodeca();
                    dibujaDiapason(notas);
                    generadorDiagramas();
                    dibujaMatrix();
                    formaPrima();
                }
            }

        };
    }



}

///////////////////////////////////////////////////////////////////////////////////////////////////

var dibujaDiapason = (notas) => {
    var diapason = d3.select('.drawerDiapason').classed("svg-container", true).append('svg')
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 400 100")
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
                    pisadas.push([i + 1, j, posiciones])
                    diapason.append('circle')
                        .attr('cx', 17.75 * j)
                        .attr('cy', 10 * i + 10)
                        .attr('r', 4.4)
                        .attr('stroke', 'gray')
                        .attr('stroke-width', 0.5)
                        .attr('fill', 'white')
                        .on("mouseover", function (d) {
                            d3.select(this).style("stroke", "red").style("fill", "#ffd6d1").style("cursor", "pointer");
                        }).on("mouseout", function (d) {
                            d3.select(this).style("stroke", "gray").style("fill", "white").style("cursor", "pointer");
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
                        .attr("font-family", "sans-serif")
                        .style("text-anchor", "middle")
                        .attr("stroke-width", 1);
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



    for (var d = 0; d < mtx.length; d++) {
        var trastes = [];
        for (var t = 0; t < mtx[d].length; t++) {

            trastes.push(mtx[d][t][1]);

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
                    .attr("stroke-width",);
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


                diagramas.append('circle')
                    .attr('cx', 38 * ((Math.abs(fretMin - pisada[i][1]) % 5) + 1) - 9)
                    .attr('cy', 10 * pisada[i][0])
                    .attr('r', 6)
                    .attr('stroke', 'gray')
                    .attr('stroke-width', 1)
                    .attr('fill', '#ffffff')

                diagramas.append("text")
                    .text(pisada[i][2])
                    .attr('x', 38 * ((Math.abs(fretMin - pisada[i][1]) % 5) + 1) - 9)
                    .attr('y', 10 * pisada[i][0] + 3.8)
                    .attr("font-size", "10px")
                    .attr("font-family", "sans-serif")
                    .style("text-anchor", "middle")
                    .attr("stroke-width", 1);

            }

            diagramas.on("mouseover", function (d) {
                d3.select(this).selectAll("circle").style("stroke", "red").style("fill", "#ffd6d1");
                d3.select(this).style("cursor", "pointer")

            }).on("mouseout", function (d) {
                d3.select(this).selectAll("circle").style("stroke", "gray").style("fill", "white").style("cursor", "pointer");
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

    for (var i = 0; i < coordenadas.length; i++) {
        const gainNode = audioContext.createGain();
        let audio1
        audio1 = new Audio;
        audio1.src = "../di/" + coordenadas[i] + ".mp3";
        audio1.volume = 1/3;
        let track1 = audioContext.createMediaElementSource(audio1);
        track1.connect(gainNode);
        gainNode.connect(audioContext.destination);
        gainNode.gain.setValueAtTime(1, audioContext.currentTime);
        audio1.play();
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2.5);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////


function formaPrima() {
    var paragraph = document.getElementById("forma");
    var text = document.createTextNode(fPrR);

    document.getElementById("forma").innerHTML = "";
    paragraph.appendChild(text);
    var res = fPrR;
    return res;
}

//////////////////////////////////////////////////////////////////////////////////////////////////

dibujaTodo();


