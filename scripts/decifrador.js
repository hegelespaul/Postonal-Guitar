///////////////////////////////////////// ESTE CÓDIGO GENERA PERMUTACIONES, TIENE INCLUIDAS OTRA FUNCIONES DE OTRAS PERACIONES PERO NO SON LLAMADAS, SOLO FUNCIONA LAS PERMUTACIONES
///////////////////////////////////////// QUE ARROJAN LA FORMA PRIMA
var fPrR = [];
var formaPrimaIn;

function dodeca(notes) {

    function permutaciones() {

        var tricorde = notes;
        var permu = [];
        var formaPrimaCal = [];
        var formaPrimaSel = [];
        var formaPrimaOri = [];

        for (var e = 0; e < tricorde.length; e++) {
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
                // console.log(tri0);

                var nuevoValorR = (tricorde[e] - nota + 12) % 12;
                retro0.push(nuevoValorR);
                retro0.sort((a, b) => a - b);
                // retro0sum = retro0.reduce((a, b) => a + b, 0);
                retro0Max = Math.max(...retro0);
                retro0Min = Math.min(...retro0);
                retro0sum = retro0Max - retro0Min;
                // console.log(retro0)

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
        formaPrimaIn = lastcompIndx[lastcomp.indexOf(formaPrimaIndex)];

        // var formaPrimaIn = formaPrimaCal.indexOf(Math.min(...formaPrimaCal));
        fPrR = `(${formaPrimaIn}) ${formaPrimaOri[namIndx[lastcomp.indexOf(formaPrimaIndex)]]}`;     //////FORMA PRIMA
        return permu;
    }

    // console.log("permutaciones", permutaciones(), "</br>");

    // console.log("formaPrima", fPrR, "</br>");

    /////////////////////////////////////////
    /////////////////////////////////////////

    function reverse() {
        var rev = notes.map((x) => x);
        for (let i = 0, j = rev.length - 1; i < j; i++, j--)
            [rev[i], rev[j]] = [rev[j], rev[i]];
        // return rev;
    }

    // console.log("retrogrado", reverse(), "</br>");

    /////////////////////////////////////////

    function inv() {
        var p1 = notes[0];
        var res = [];
        notes.forEach(function (unaNota) {
            var nuevoValor = (unaNota - p1) * -1 + p1;
            res.push((nuevoValor + 12) % 12);
        });
        // return res;
    }
    // console.log("inversion", inv(), "</br>");

    /////////////////////////////////////////

    function matrix() {
        var p1 = notes[0];
        var res = [];
        var mres = [];
        notes.forEach(function (unaNota) {
            var nuevoValor = (unaNota - p1) * -1;
            res.push(nuevoValor);
        });
        var m0 = [],
            m1 = [],
            m2 = [],
            m3 = [],
            m4 = [],
            m5 = [],
            m6 = [],
            m7 = [],
            m8 = [],
            m9 = [],
            m10 = [],
            m11 = [];
        var r = [m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11];
        for (var i = 0; i < notes.length; i++) {
            m0.push((notes[i] + res[0] + 12) % 12);
            m1.push((notes[i] + res[1] + 12) % 12);
            m2.push((notes[i] + res[2] + 12) % 12);
            m3.push((notes[i] + res[3] + 12) % 12);
            m4.push((notes[i] + res[4] + 12) % 12);
            m5.push((notes[i] + res[5] + 12) % 12);
            m6.push((notes[i] + res[6] + 12) % 12);
            m7.push((notes[i] + res[7] + 12) % 12);
            m8.push((notes[i] + res[8] + 12) % 12);
            m9.push((notes[i] + res[9] + 12) % 12);
            m10.push((notes[i] + res[10] + 12) % 12);
            m11.push((notes[i] + res[11] + 12) % 12);
        }
        for (var i = 0; i < notes.length; i++) {
            var mv = r[i];
            mres.push(mv);
        }
        // return mres;
    }

    // console.log("matrix:", matrix(), "</br>");
    permutaciones()
    return (fPrR);
};
/////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////  A PARTIR DE ESTAS LÍNEAS EMPIEZA EL DESCIFRADOR DE CONTEXTOS TONALES

let notesName = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];


//////////////////////////////////////////////////////////////////////////////////  CASOS DE ACORDES
let cualidades = [
    //////////////////////////////3 NOTAS

    ['maj', [0, 0, 1, 1, 1, 0], [0, 4, 7]],
    ['min', [0, 0, 1, 1, 1, 0], [0, 3, 7]],
    ['dim', [0, 0, 2, 0, 1, 0], [0, 3, 6]],
    ['aug', [0, 0, 0, 3, 0, 0], [0, 4, 8]],
    ['sus2', [0, 1, 0, 0, 2, 0], [0, 2, 7]],
    ['sus4', [0, 1, 0, 0, 2, 0], [0, 5, 7]],

    ///////////////////////////////4 NOTAS
    ['6', [0, 1, 2, 1, 2, 0], [0, 4, 7, 9]],
    ['m6', [0, 1, 2, 1, 1, 1], [0, 3, 7, 9]],
    ['maj7', [1, 0, 1, 2, 2, 0], [0, 4, 7, 11]],
    // ['maj7b5', [1, 0, 1, 2, 2, 0], [0, 4, 6, 11]],
    // ['maj7#5', [1, 0, 1, 2, 2, 0], [0, 4, 8, 11]],
    ['m7', [0, 1, 2, 1, 2, 0], [0, 3, 7, 10]],
    ['m7b5', [0, 1, 2, 1, 1, 1], [0, 3, 6, 10]],
    // ['m7#5', [0, 1, 2, 1, 1, 1], [0, 3, 6, 10]],
    ['mMaj7', [1, 0, 1, 3, 1, 0], [0, 3, 7, 11]],
    ['7', [0, 1, 2, 1, 1, 1], [0, 4, 7, 10]],
    // ['7#5', [0, 2, 0, 2, 0, 2], [0, 4, 8, 10]],
    // ['7b5', [0, 2, 0, 3, 0, 1], [0, 4, 6, 10]],
    ['7sus4', [0, 2, 1, 0, 3, 0], [0, 5, 7, 10]],
    ['7sus2', [0, 2, 1, 1, 2, 0], [0, 2, 7, 10]],
    ['dim7', [0, 0, 4, 0, 0, 2], [0, 3, 6, 9]],

    //////////////////////////////////4 NOTAS CASOS CON TENSIONES
    ['add9', [0, 2, 1, 1, 2, 0], [0, 2, 4, 7]],
    ['madd9', [1, 1, 1, 1, 2, 0], [0, 2, 3, 7]],
    ['add11', [1, 1, 1, 1, 2, 0], [0, 4, 5, 7]],
    ['madd11', [0, 2, 1, 1, 2, 0], [0, 3, 5, 7]],
    ['6/9', [0, 2, 1, 1, 2, 0], [0, 2, 4, 9]],
    ['m6/9', [1, 1, 2, 0, 1, 1], [0, 2, 3, 4, 9]],

    ///////////////////////////////////5 NOTAS
    ['maj9', [1, 2, 2, 2, 3, 0], [0, 2, 4, 7, 11]],
    ['m9', [1, 2, 2, 2, 3, 0], [0, 2, 3, 7, 10]],
    ['9', [0, 3, 2, 2, 2, 1], [0, 2, 4, 7, 10]],
    ['maj7#11', [2, 1, 1, 2, 3, 1], [0, 4, 6, 7, 11]],
    ['m11', [0, 3, 2, 1, 4, 0], [0, 3, 5, 7, 10]],
    ['7#11', [1, 2, 2, 2, 1, 2], [0, 4, 6, 7, 10]],
    ['7b13', [1, 2, 2, 3, 1, 1], [0, 4, 7, 8, 10]],
    ['maj13', [1, 2, 2, 2, 3, 0], [0, 4, 7, 9, 11]],
    ['m13', [1, 2, 3, 1, 2, 1], [0, 3, 7, 9, 10]],
    ['13', [1, 2, 3, 1, 2, 1], [0, 4, 7, 9, 10]]
]


// for (var i = 0; i < list.length; i++) {
//     list[i].sort((a, b) => a - b);
// }

////////////////////////////////////////////////////////////////////////////// DECLARACIÓN DE FUNCIONES

function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
        n = (n * -1).toFixed(digits);
    }
    n = parseFloat(n)
    return n;
}

function getAllIndexes(arr, val) {
    var indexes = [], i;
    for (i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

function sfnAcomodador(A) {
    var resultado = [];
    var resultadoEval = [];
    for (var i = 0; i < A.length; i++) {
        var midinote = afinacionMIDI[A[i][0] - 1] + A[i][1];
        resultadoEval.push(midinote);
        resultado.push({ s: A[i][0], f: A[i][1], n: midinote });
    }
    var max = resultadoEval.reduce((a, b) => { return Math.max(a, b) });
    // console.log(resultado[resultadoEval.indexOf(max)]);
    return resultado[resultadoEval.indexOf(max)]
}

function cosSimAcomodador(A) {
    var resultado = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    for (var i = 0; i < A.length; i++) {
        var note = A[i];
        resultado.splice(note, 1, note);
    }
    // console.log(resultado);
    return resultado;
}

function cosSimAcomodadorTrp(A) {
    var resultado = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1], [-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    for (var i = 0; i < A.length; i++) {
        var cuerda = A[i][0];
        resultado.splice(cuerda - 1, 1, A[i]);
    }

    // console.log(resultado)
    resultado = resultado.flat();
    resultado.splice(2, 1);
    resultado.splice(4, 1);
    resultado.splice(6, 1);
    resultado.splice(8, 1);
    resultado.splice(10, 1);
    resultado.splice(12, 1);

    // console.log(resultado)
    return resultado
}

var distance = function (a, b) {
    var dx = (b.f - a.f);
    var dy = (b.s - a.s);
    var dz = (b.n - a.n);
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
    var similarityR = roundTo(similarity, 6)
    // console.log(similarity);
    return similarityR;
}

function vectorInt(acorde) {
    var int = [];
    var vect = [0, 0, 0, 0, 0, 0];

    for (var i = 0; i < acorde.length - 1; i++) {

        for (var j = 0; j < acorde.length - 1; j++) {
            var next = acorde[(j + 1) % acorde.length];
            var posint = Math.abs((acorde[i] - next) % 12);
            if (posint > 0)
                int.push(posint);
        }
    }

    for (var i = 0; i < int.length; i++) {
        if (int[i] > 6)
            int[i] = Math.abs(12 - int[i]) % 12;

    }
    int.sort(function (a, b) { return a - b });
    // console.log(int);

    for (var i = 1; i < 6; i++) {
        var intsum = getAllIndexes(int, i).length;
        // console.log(i,intsum)
        vect.splice(i - 1, 1, intsum);
    }

    // console.log(vect);
    return vect;
}

function transA0(acorde) {
    var result = [];

    for (var i = 0; i < acorde.length; i++) {
        result.push([]);
        for (var j = 0; j < acorde.length; j++) {
            result[i].push(Math.abs((acorde[j] + 12) - acorde[i]) % 12);
        }
        result[i].sort((a, b) => a - b);
    }
    return [result, acorde];
}
// console.log(transA0([0, 3, 7]))

////////////////////////////////////////////////////////////////////////  FUNCIÓN PRINCIPAL QUE MIDE LA SIMILITUD COSENO DEL CONJUNTO SELECCIONADO RESPECTO DE LOS CASOS DE CONTEXTOS TONALES

function chordNm(chordValues) {
    var simAll = [];
    var simAllEval = [];
    var simAllCual = [];
    var simAllOri = [];
    var result = [];
    var resultMax = [];
    var Tr = [];

    // console.log(cosinesim(vectorInt(chordValues), cualidades[0][1]))
    var permus = transA0(chordValues);
    // console.log(permus)

    for (var p = 0; p < permus[0].length; p++) {
        simAll.push([]);

        for (var q = 0; q < cualidades.length; q++) {
            simAll[p].push(cosinesim(cosSimAcomodador(permus[0][p]), cosSimAcomodador(cualidades[q][2])));
            // console.log(permus[0][p],q,cualidades[q][0]);
        }

        // // console.log(permus[0][p])
        var max = simAll[p].reduce((a, b) => { return Math.max(a, b) });
        // console.log(max);
        // console.log(simAll[p].indexOf(max));
        //console.log(cualidades[simAll[p].indexOf(max)]);
        var allMax = getAllIndexes(simAll[p], max);
        allMax.forEach((e) => { simAllEval.push(max); simAllCual.push(cualidades[e]); simAllOri.push(permus[1][p]) });
        // console.log(simAll[p][allMax]);
    }

    // simAll = [];
    // for (var q = 0; q < cualidades.length; q++) {
    // simAll.push(cosinesim(vectorInt(chordValues), cualidades[q][1]));
    // }
    // console.log(simAll)
    // var max = simAll.reduce((a, b) => { return Math.max(a, b) });
    // var allMax = getAllIndexes(simAll, max);
    // console.log(allMax)
    // allMax.forEach((e) => { simAllEval.push(max); simAllCual.push(cualidades[e]); simAllOri.push(chordValues) });


    for (var z = 0; z < simAllEval.length; z++) {
        Tr.push([]);
        // result.push(notesName[simAllOri[z]] + simAllCual[z][0], simAllEval[z]);
        result.push(notesName[simAllOri[z]] + simAllCual[z][0]);
        for (var s = 0; s < simAllCual[z][2].length; s++) {
            Tr[z].push(((simAllCual[z][2][s] + 12) + simAllOri[z]) % 12);
        }
        // console.log(chordValues, Tr[z])
    }

    var maxAll = simAllEval.reduce((a, b) => { return Math.max(a, b) });
    var allChords = getAllIndexes(simAllEval, maxAll);
    // console.log(maxAll)

    for (var allCh = 0; allCh < allChords.length; allCh++) {
        resultMax.push(notesName[simAllOri[allChords[allCh]]] + simAllCual[allChords[allCh]][0]);
    }

    var index = result.indexOf(resultMax[0])
    result.splice(index, 1);
    // console.log(permusR);
    // console.log([simAllEval, simAllCual, simAllOri]);
    // console.log(result, resultMax);
    return [result, resultMax];        /////////////////////////////////////////////////////////SE RECIBE UN ARREGLO CON LOS CONTEXTOS TONALES POSIBLES Y EL CONTEXTO TONAL MAS CERCANO
}