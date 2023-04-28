//////////////////////////////////////////////////////////////////////////////// ESTE CÓDGIO GENERA EL VISUALIZADOR DE FORMAS PRIMAS

var fP = amplify.store("allFp");
var names = amplify.store("allFpNames");
var data = amplify.store("data")

let pisadas = [];

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

/////////////////////////////////////////////////////////////////          ESTRUCTURACIÓN DE EJES      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
var x = [], y = [], z = [];

//NUMERO DE NOTAS
fP.forEach((n) => {
        x.push(n.length);
});

//DESVIACIÓN ESTÁNDAR DEL VECTOR INTERVÁLICO DEFINIDO EN CANTIDAD DE SEMITONOS.
data.forEach((n) => {
        indV = [];
        for (var i = 0; i < n.length; i++) {
                indV.push(n[i] * (i + 1))
        }
        // indV = indV.reduce((x, y) => (x + y), 0);
        y.push(dev(indV))
});

function dev(arr){
        // Creating the mean with Array.reduce
        let mean = arr.reduce((acc, curr)=>{
          return acc + curr
        }, 0) / arr.length;
         
        // Assigning (value - mean) ^ 2 to every array item
        arr = arr.map((k)=>{
          return (k - mean) ** 2
        })
         
        // Calculating the sum of updated array
       let sum = arr.reduce((acc, curr)=> acc + curr, 0);
        
       // Calculating the variance
       let variance = sum / arr.length
        
       // Returning the standard deviation
       return Math.sqrt(sum / arr.length)
      }

//VALOR MÁXIMO DE LA FORMA PRIMA
fP.forEach((n) => {
        z.push(n[n.length-1])
        // z.push(n.reduce((x, y) => x + y, 0)/n.length)
        // z.push(dev(n))
});

////NORMALIZACIÓN DE 0 TO 1 

function zerotone(arr) {

        var max = Math.max(...arr);
        var min = Math.min(...arr);

        for (var i = 0; i < arr.length; i++) {
                var value = arr[i];
                // if(max - min === 0) return 0; // or 0, it's up to you
                arr.splice(i, 1, (value - min) / (max - min))
        }
}

zerotone(x);
zerotone(y);
zerotone(z);

// console.log(x, y, z);


////////////////////////////////////////COLORES Y ACOMODO DE INFORMACIÓN

var color = []

for (var i = 0; i < x.flat().length; i++) {

        if (i < 12) {
                color.push('#f54242')
        }
        else if (i >= 12 && i < 41) {
                color.push('#42f545')
        }
        else if (i >= 41 && i < 79) {
                color.push('#4287f5')
        }
        else if (i >= 79) {
                color.push('#e3f542')
        }

}

var psChords = [];
for (var k = 0; k < fP.length; k++) {
        var flatten = chordNm(fP[k])[1]
        psChords.push(flatten);
}
// console.log(psChords)

//////////////////////////////////////////////////////////////////////////////////////////////////PLOTEO /////////////////////////////////////////////////////////////////////////////////////
var myPlot = document.getElementById('myDiv')



var customdata = [];
for (var i = 0; i < psChords.length; i++) {
        customdata.push([psChords[i], fP[i]]);
}

var trace1 = {
        x: x.flat(),
        y: y.flat(),
        z: z.flat(),
        mode: 'markers+text',
        symbol: 'circle',
        marker: {
                size: 8,
                line: {
                        color: 'rgba(21, 21, 21, 0.5)',
                        width: 0.5
                },
                opacity: 0.3,
                color: color
        },
        hovertemplate: '<i>%{text}</i>' + '<br><i>Forma Prima</i>: <b>%{customdata[1]}</b>' +
                '<br><i>Posibles Acordes</i>: <b>%{customdata[0]}</b><extra></extra>',
        customdata: customdata,
        text: names,
        textfont: {
                // family: 'sans serif',
                size: 11,
                color: '#696969'
        },
        textposition: 'bottom',
        type: 'scatter3d',
};

if (screen.width > 700) {

        var layout = {

                scene: {
                        xaxis: {
                                visible: true,
                                title: {
                                        text: 'Número de notas',
                                        font: {
                                                family: 'Verdana, sans-serif',
                                                size: 12,
                                                color: '#7f7f7f'
                                        }
                                },
                        },
                        yaxis: {
                                title: {
                                        text: 'Desviación estándard del vector interválico',
                                        font: {
                                                family: 'Verdana, sans-serif',
                                                size: 12,
                                                color: '#7f7f7f'
                                        }
                                },
                                visible: true,
                        },
                        zaxis: {
                                title: {
                                        text: 'Valor máximo de forma prima',
                                        font: {
                                                family: 'Verdana, sans-serif',
                                                size: 12,
                                                color: '#7f7f7f'
                                        }
                                },
                                visible: true,
                        },
                        camera: {
                                eye: {
                                        x: -1.5,
                                        y: -1.75,
                                        z: 1,
                                }
                        }
                },
                plot_bgcolor: "rgba(0,0,0,0)",
                paper_bgcolor: "rgba(0,0,0,0)",
                width: 1280,
                height: 720,
                hovermode: 'closest',
                // title: 'Espacio latente de formas primas'
        };
}


if (screen.width < 700) {

        var layout = {

                scene: {
                        xaxis: {
                                visible: true,
                                title: {
                                        text: 'Número de notas',
                                        font: {
                                                family: 'Verdana, sans-serif',
                                                size: 12,
                                                color: '#7f7f7f'
                                        }
                                },
                        },
                        yaxis: {
                                title: {
                                        text: 'Promedio del vector interválico',
                                        font: {
                                                family: 'Verdana, sans-serif',
                                                size: 12,
                                                color: '#7f7f7f'
                                        }
                                },
                                visible: true,
                        },
                        zaxis: {

                                title: {
                                        text: 'Suma de forma prima',
                                        font: {
                                                family: 'Verdana, sans-serif',
                                                size: 12,
                                                color: '#7f7f7f'
                                        }
                                },
                                visible: true,
                        },
                        camera: {
                                eye: {
                                        x: -2.5,
                                        y: -1.75,
                                        z: 1,
                                }
                        }
                },
                dragmode: 'false',
                plot_bgcolor: "rgba(0,0,0,0)",
                paper_bgcolor: "rgba(0,0,0,0)",
                width: 450,
                height: 500,
                hovermode: 'closest',
                // title: 'Visualizador de formas primas'
        };

}

///////////////////////////////////VARIABLES PARA ABRIR HIPERVÍNCULOS

var data = [trace1];

var config = { responsive: true, displayModeBar: false, scrollZoom: true }

Plotly.newPlot('myDiv', data, layout, config);

myPlot.on('plotly_click', function (data) {

        var pts;
        for (var i = 0; i < data.points.length; i++) {
                pts = data.points[i][Object.keys(data.points[i])[8]];
        }
        var indexfP = names.indexOf(pts)
        // console.log(fP[indexfP]);
        function NewTab() {
                var w = window.open(
                        "/diagramGen.html", "_blank"
                );
                pisadas = fP[indexfP];
                // console.log(pisadas);
                amplify.store("pisadas", pisadas);
                origTitle = names[indexfP];
                amplify.store("name", origTitle);
                w.onload = function () { this.document.title = origTitle; }
        }
        NewTab();


});

/////////////////////////////////////////////////////////////////////////VERSIÓN DE TELÉFONO


if (isMobile() == true) {

        let pos = 0

        const zoomInBtn = document.querySelectorAll('.zoom_in');
        zoomInBtn.forEach(btn => btn.addEventListener('click', () => {

                if (pos < 1.50) {
                        pos = pos + 0.20

                        var update = {
                                scene: {
                                        camera: {
                                                eye: {
                                                        x: -2.5 + pos,
                                                        y: -1.75 + pos,
                                                }
                                        },
                                        xaxis: {
                                                visible: true,
                                                title: {
                                                        text: 'Número de notas',
                                                        font: {
                                                                family: 'Verdana, sans-serif',
                                                                size: 12,
                                                                color: '#7f7f7f'
                                                        }
                                                },
                                        },
                                        yaxis: {
                                                title: {
                                                        text: 'Promedio del vector interválico',
                                                        font: {
                                                                family: 'Verdana, sans-serif',
                                                                size: 12,
                                                                color: '#7f7f7f'
                                                        }
                                                },
                                                visible: true,
                                        },
                                        zaxis: {

                                                title: {
                                                        text: 'Suma de forma prima',
                                                        font: {
                                                                family: 'Verdana, sans-serif',
                                                                size: 12,
                                                                color: '#7f7f7f'
                                                        }
                                                },
                                                visible: true,
                                        }
                                }
                        }

                        Plotly.relayout('myDiv', update);
                }

        }));

        const zoomOutBtn = document.querySelectorAll('.zoom_out');
        zoomOutBtn.forEach(btn => btn.addEventListener('click', () => {

                if (pos > -1.1) {
                        pos = pos - 0.20


                        var update = {
                                scene: {
                                        camera: {
                                                eye: {
                                                        x: -2.5 + pos,
                                                        y: -1.75 + pos
                                                }
                                        },
                                        xaxis: {
                                                visible: true,
                                                title: {
                                                        text: 'Número de notas',
                                                        font: {
                                                                family: 'Verdana, sans-serif',
                                                                size: 9,
                                                                color: '#7f7f7f'
                                                        }
                                                },
                                        },
                                        yaxis: {
                                                title: {
                                                        text: 'Promedio del vector interválico',
                                                        font: {
                                                                family: 'Verdana, sans-serif',
                                                                size: 9,
                                                                color: '#7f7f7f'
                                                        }
                                                },
                                                visible: true,
                                        },
                                        zaxis: {

                                                title: {
                                                        text: 'Suma de forma prima',
                                                        font: {
                                                                family: 'Verdana, sans-serif',
                                                                size: 9,
                                                                color: '#7f7f7f'
                                                        }
                                                },
                                                visible: true,
                                        },
                                },
                        }

                        Plotly.relayout('myDiv', update);
                }

        }));

        var pts;
        var indexfP;

        myPlot.on('plotly_hover', function (data) {

                for (var i = 0; i < data.points.length; i++) {
                        pts = data.points[i][Object.keys(data.points[i])[8]];
                }
                indexfP = names.indexOf(pts);
                document.getElementById('go').style.display = 'block';

        });

        myPlot.on('plotly_unhover', function () {
                indexfP = 'none';
                document.getElementById('go').style.display = 'none';
        });

        function go() {

                if (indexfP != 'none') {
                        // console.log(fP[indexfP]);
                        function NewTab() {
                                var w = window.open(
                                        "/diagramGen.html", "_blank"
                                );
                                pisadas = fP[indexfP];
                                // console.log(pisadas);
                                amplify.store("pisadas", pisadas);
                                origTitle = names[indexfP];
                                amplify.store("name", origTitle);
                                w.onload = function () { this.document.title = origTitle; }
                        }
                        NewTab();
                }
        }

}
