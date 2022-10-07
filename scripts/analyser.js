// var data = [[1, 0, 1, 2, 2, 0], [0, 1, 2, 1, 2, 0], [0, 1, 2, 1, 1, 1], [0, 0, 1, 1, 1, 0]];
// var names = ['4-20', '4-26', '4-27', '3-11'];
let pisadas = [];
var data = [
        [2, 1, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [1, 0, 1, 1, 0, 0],
        [1, 0, 0, 1, 1, 0],
        [1, 0, 0, 0, 1, 1],
        [0, 2, 0, 1, 0, 0],
        [0, 1, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1],
        [0, 1, 0, 0, 2, 0],
        [0, 0, 2, 0, 0, 1],
        [0, 0, 1, 1, 1, 0],
        [0, 0, 0, 3, 0, 0],
        [3, 2, 1, 0, 0, 0],
        [2, 2, 1, 1, 0, 0],
        [2, 1, 2, 1, 0, 0],
        [2, 1, 1, 1, 1, 0],
        [2, 1, 0, 1, 1, 1],
        [2, 1, 0, 0, 2, 1],
        [2, 0, 1, 2, 1, 0],
        [2, 0, 0, 1, 2, 1],
        [2, 0, 0, 0, 2, 2],
        [1, 2, 2, 0, 1, 0],
        [1, 2, 1, 1, 1, 0],
        [1, 1, 2, 1, 0, 1],
        [1, 1, 2, 0, 1, 1],
        [1, 1, 1, 1, 2, 0],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 0, 1, 2, 1],
        [1, 0, 2, 2, 1, 0],
        [1, 0, 2, 1, 1, 1],
        [1, 0, 1, 3, 1, 0],
        [1, 0, 1, 2, 2, 0],
        [0, 3, 0, 2, 0, 1],
        [0, 2, 1, 1, 2, 0],
        [0, 2, 1, 0, 3, 0],
        [0, 2, 0, 3, 0, 1],
        [0, 2, 0, 2, 0, 2],
        [0, 1, 2, 1, 2, 0],
        [0, 1, 2, 1, 1, 1],
        [0, 0, 4, 0, 0, 2],
        [1, 1, 1, 1, 1, 1],
        [4, 3, 2, 1, 0, 0],
        [3, 3, 2, 1, 1, 0],
        [3, 2, 2, 2, 1, 0],
        [3, 2, 2, 1, 1, 1],
        [3, 2, 1, 1, 2, 1],
        [3, 1, 1, 2, 2, 1],
        [3, 1, 0, 1, 3, 2],
        [2, 3, 2, 2, 0, 1],
        [2, 3, 1, 2, 1, 1],
        [2, 2, 3, 1, 1, 1],
        [2, 2, 2, 2, 2, 0],
        [2, 2, 2, 1, 2, 1],
        [2, 2, 1, 3, 1, 1],
        [2, 2, 1, 1, 3, 1],
        [2, 2, 0, 2, 2, 2],
        [2, 1, 3, 2, 1, 1],
        [2, 2, 0, 2, 2, 2],
        [2, 1, 2, 2, 2, 1],
        [2, 1, 2, 1, 2, 2],
        [2, 1, 1, 2, 3, 1],
        [2, 0, 2, 4, 2, 0],
        [2, 0, 2, 3, 2, 1],
        [1, 3, 2, 1, 3, 0],
        [1, 3, 1, 2, 2, 1],
        [1, 2, 3, 1, 2, 1],
        [1, 2, 2, 3, 1, 1],
        [1, 2, 2, 2, 3, 0],
        [1, 2, 2, 2, 1, 2],
        [1, 2, 2, 1, 3, 1],
        [1, 2, 1, 3, 2, 1],
        [1, 1, 4, 1, 1, 2],
        [1, 1, 3, 2, 2, 1],
        [0, 4, 0, 4, 0, 2],
        [0, 3, 2, 2, 2, 1],
        [0, 3, 2, 1, 4, 0],
        [2, 2, 2, 1, 2, 1],
        [2, 1, 2, 3, 2, 0],
        [2, 1, 2, 2, 2, 1],
        [5, 4, 3, 2, 1, 0],
        [4, 4, 3, 2, 1, 0],
        [4, 4, 3, 2, 1, 1],
        [4, 3, 3, 2, 2, 1],
        [4, 2, 2, 2, 3, 2],
        [4, 2, 1, 2, 4, 2],
        [4, 2, 0, 2, 4, 3],
        [3, 4, 3, 2, 3, 0],
        [3, 4, 2, 2, 3, 1],
        [3, 3, 3, 3, 2, 1],
        [3, 3, 3, 2, 3, 1],
        [3, 3, 2, 2, 3, 2],
        [3, 2, 4, 2, 2, 2],
        [3, 2, 3, 4, 3, 0],
        [3, 2, 3, 4, 2, 1],
        [3, 2, 2, 4, 3, 1],
        [3, 2, 2, 3, 3, 2],
        [3, 2, 2, 2, 4, 2],
        [3, 1, 3, 4, 3, 1],
        [3, 0, 3, 6, 3, 0],
        [2, 4, 2, 4, 1, 2],
        [2, 4, 1, 4, 2, 2],
        [2, 3, 4, 2, 2, 2],
        [2, 3, 3, 3, 3, 1],
        [2, 3, 3, 2, 4, 1],
        [2, 3, 2, 3, 4, 1],
        [2, 2, 5, 2, 2, 2],
        [2, 2, 4, 3, 2, 2],
        [2, 2, 4, 2, 3, 2],
        [2, 2, 4, 2, 2, 3],
        [2, 2, 3, 4, 3, 1],
        [1, 4, 3, 2, 5, 0],
        [1, 4, 3, 2, 4, 1],
        [1, 4, 2, 4, 2, 2],
        [0, 6, 0, 6, 0, 3]
];

var names = [
        '3-1',
        '3-2',
        '3-3',
        '3-4',
        '3-5',
        '3-6',
        '3-7',
        '3-8',
        '3-9',
        '3-10',
        '3-11',
        '3-12',
        '4-1',
        '4-2',
        '4-3',
        '4-4',
        '4-5',
        '4-6',
        '4-7',
        '4-8',
        '4-9',
        '4-10',
        '4-11',
        '4-12',
        '4-13',
        '4-14',
        '4-Z15',
        '4-16',
        '4-17',
        '4-18',
        '4-19',
        '4-20',
        '4-21',
        '4-22',
        '4-23',
        '4-24',
        '4-25',
        '4-26',
        '4-27',
        '4-28',
        '4-Z29',
        '5-1',
        '5-2',
        '5-3',
        '5-4',
        '5-5',
        '5-6',
        '5-7',
        '5-8',
        '5-9',
        '5-10',
        '5-11',
        '5-Z12',
        '5-13',
        '5-14',
        '5-15',
        '5-16',
        '5-Z17',
        '5-Z18',
        '5-19',
        '5-20',
        '5-21',
        '5-22',
        '5-23',
        '5-24',
        '5-25',
        '5-26',
        '5-27',
        '5-28',
        '5-29',
        '5-30',
        '5-31',
        '5-32',
        '5-33',
        '5-34',
        '5-35',
        '5-Z36',
        '5-Z37',
        '5-Z38',
        '6-1',
        '6-2',
        '6-Z3',
        '6-Z4',
        '6-5',
        '6-Z6',
        '6-7',
        '6-8',
        '6-9',
        '6-Z10',
        '6-Z11',
        '6-Z12',
        '6-Z13',
        '6-14',
        '6-15',
        '6-16',
        '6-Z17',
        '6-18',
        '6-Z19',
        '6-20',
        '6-21',
        '6-22',
        '6-Z23',
        '6-Z24',
        '6-Z25',
        '6-Z26',
        '6-27',
        '6-Z28',
        '6-Z29',
        '6-30',
        '6-31',
        '6-32',
        '6-33',
        '6-34',
        '6-35',
]


var fP = [
        [0, 1, 2],
        [0, 1, 3],
        [0, 1, 4],
        [0, 1, 5],
        [0, 1, 6],
        [0, 2, 4],
        [0, 2, 5],
        [0, 2, 6],
        [0, 2, 7],
        [0, 3, 6],
        [0, 3, 7],
        [0, 4, 8],
        [0, 1, 2, 3],
        [0, 1, 2, 4],
        [0, 1, 3, 4],
        [0, 1, 2, 5],
        [0, 1, 2, 6],
        [0, 1, 2, 7],
        [0, 1, 4, 5],
        [0, 1, 5, 6],
        [0, 1, 6, 7],
        [0, 2, 3, 5],
        [0, 1, 3, 5],
        [0, 2, 3, 6],
        [0, 1, 3, 6],
        [0, 2, 3, 7],
        [0, 1, 4, 6],
        [0, 1, 5, 7],
        [0, 3, 4, 7],
        [0, 1, 4, 7],
        [0, 1, 4, 8],
        [0, 1, 5, 8],
        [0, 2, 4, 6],
        [0, 2, 4, 7],
        [0, 2, 5, 7],
        [0, 2, 4, 8],
        [0, 2, 6, 8],
        [0, 3, 5, 8],
        [0, 2, 5, 8],
        [0, 3, 6, 9],
        [0, 1, 3, 7],
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 5],
        [0, 1, 2, 4, 5],
        [0, 1, 2, 3, 6],
        [0, 1, 2, 3, 7],
        [0, 1, 2, 5, 6],
        [0, 1, 2, 6, 7],
        [0, 2, 3, 4, 6],
        [0, 1, 2, 4, 6],
        [0, 1, 3, 4, 6],
        [0, 2, 3, 4, 7],
        [0, 1, 3, 5, 6],
        [0, 1, 2, 4, 8],
        [0, 1, 2, 5, 7],
        [0, 1, 2, 6, 8],
        [0, 1, 3, 4, 7],
        [0, 1, 3, 4, 8],
        [0, 1, 4, 5, 7],
        [0, 13, 56, 7],
        [0, 1, 3, 7, 8],
        [0, 1, 4, 5, 8],
        [0, 1, 4, 7, 8],
        [0, 2, 3, 5, 7],
        [0, 1, 3, 5, 7],
        [0, 2, 3, 5, 8],
        [0, 2, 4, 5, 8],
        [0, 1, 3, 5, 8],
        [0, 2, 3, 6, 8],
        [0, 1, 3, 6, 8],
        [0, 1, 4, 6, 8],
        [0, 1, 3, 6, 9],
        [0, 1, 4, 6, 9],
        [0, 2, 4, 6, 8],
        [0, 2, 4, 6, 9],
        [0, 2, 4, 7, 9],
        [0, 1, 2, 4, 7],
        [0, 3, 4, 5, 8],
        [0, 1, 2, 5, 8],
        [0, 1, 2, 3, 4, 5],
        [0, 1, 2, 3, 4, 6],
        [0, 1, 2, 3, 5, 6],
        [0, 1, 2, 4, 5, 6],
        [0, 1, 2, 3, 6, 7],
        [0, 1, 2, 5, 6, 7],
        [0, 1, 2, 6, 7, 8],
        [0, 2, 3, 4, 5, 7],
        [0, 1, 2, 3, 5, 7],
        [0, 1, 3, 4, 5, 7],
        [0, 1, 2, 4, 5, 7],
        [0, 1, 2, 4, 6, 7],
        [0, 1, 3, 4, 6, 7],
        [0, 1, 3, 4, 5, 8],
        [0, 1, 2, 4, 5, 8],
        [0, 1, 4, 5, 6, 8],
        [0, 1, 2, 4, 7, 8],
        [0, 1, 2, 5, 7, 8],
        [0, 1, 3, 4, 7, 8],
        [0, 1, 4, 5, 8, 9],
        [0, 2, 3, 4, 6, 8],
        [0, 1, 3, 4, 6, 8],
        [0, 2, 3, 5, 6, 8],
        [0, 1, 3, 4, 6, 8],
        [0, 1, 3, 5, 6, 8],
        [0, 1, 3, 5, 7, 8],
        [0, 1, 3, 4, 6, 9],
        [0, 1, 3, 5, 6, 9],
        [0, 1, 3, 6, 8, 9],
        [0, 1, 3, 6, 7, 9],
        [0, 1, 3, 5, 8, 9],
        [0, 2, 4, 5, 7, 9],
        [0, 2, 3, 5, 7, 9],
        [0, 1, 3, 5, 7, 9],
        [0, 2, 4, 6, 8, 10]
]
// console.log(data);

function npMean(array) {
        var npMeanArray = [];
        var result = [];

        for (var g = 0; g < array[0].length; g++) {
                npMeanArray.push([])
        }

        for (var e = 0; e < array.length; e++) {
                for (var f = 0; f < array[e].length; f++) {
                        npMeanArray[f].push(array[e][f]);
                }
        }

        for (var e = 0; e < npMeanArray.length; e++) {
                var val = npMeanArray[e].reduce((a, b) => a + b) / npMeanArray[e].length;
                result.push(val);
        }

        return result;
}

/////////////////////////////////////////////////////////////////REVISAR EJE (SI ES NECESARIO O NO)////////////////////////////////////////////////////////////////////////

function standardDeviation(array) {
        array = array.flat()
        var mean = array.reduce((a, b) => a + b) / array.length;
        var variance = array.reduce((s, n) => s + (n - mean) ** 2, 0) / (array.length - 1);
        return Math.sqrt(variance);
}

var arrayMean = npMean(data);
var arrayStandardDeviation = standardDeviation(data);

function dataNormalice(array) {
        var dataNorm = [];
        for (var e = 0; e < array.length; e++) {
                dataNorm.push([]);
                for (var f = 0; f < array[e].length; f++) {
                        var dataValNorm = array[e][f] - arrayMean[f] / arrayStandardDeviation;
                        // var dataValNorm = array[e][f] - arrayMean[f];
                        dataNorm[e].push(dataValNorm);
                }
                dataNorm[e].sort((a, b) => { return b - a });
        };

        return dataNorm;
}

// console.log(npMean(data), standardDeviation(data), dataNormalice(data));
// data = dataNormalice(data)
var vectors = PCA.getEigenVectors(data);
// console.log(vectors)
var Point1 = PCA.computeAdjustedData(data, vectors[0]);
var Point2 = PCA.computeAdjustedData(data, vectors[1]);
var Point3 = PCA.computeAdjustedData(data, vectors[2]);
var x = Point1.formattedAdjustedData;
var y = Point2.formattedAdjustedData;
var z = Point3.formattedAdjustedData;

console.log(x, y, z);
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
console.log(psChords)


var myPlot = document.getElementById('myDiv')

var customdata = [];
for(var i =0; i< psChords.length;i++){
        customdata.push([psChords[i],fP[i]]);
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
                        color: 'rgba(217, 217, 217, 0.14)',
                        width: 0.5
                },
                opacity: 0.5,
                color: color
        },
        hovertemplate: '<i>Prime form</i>: <b>%{customdata[1]}</b>' +
                '<br><i>Possible Chords</i>: <b>%{customdata[0]}</b><extra></extra>',
        customdata: customdata,
        text: names,
        textposition: 'bottom',
        labels: fP,
        type: 'scatter3d',
};

var layout = {
        scene: {
                xaxis: {
                        visible: false,
                },
                yaxis: {
                        visible: false,
                },
                zaxis: {
                        visible: false
                },
                camera: {
                        eye: {
                                x: 0.6652270019457444,
                                y: 0.6720157541649203,
                                z: 1.8973322149538521
                        }
                }
        },
        paper_bgcolor: "rgba(0,0,0,0)",
        width: 1400,
        height: 1000,
        hovermode: 'closest',
};

amplify.store("allFp", fP);
amplify.store("allFpNames", names);

var data = [trace1];

Plotly.newPlot('myDiv', data, layout);

myPlot.on('plotly_click', function (data) {
        var pts;
        for (var i = 0; i < data.points.length; i++) {
                pts = data.points[i][Object.keys(data.points[i])[8]];
        }
        var indexfP = names.indexOf(pts)
        // console.log(fP[indexfP]);
        function NewTab() {
                var w = window.open(
                        "/index.html", "_blank");
                pisadas = fP[indexfP];
                amplify.store("pisadas", pisadas);
                origTitle = names[indexfP];
                amplify.store("name",origTitle);
                w.onload = function() { this.document.title = origTitle; }
        }
        NewTab();
});