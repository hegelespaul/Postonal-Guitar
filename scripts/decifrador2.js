let list = [[0, 4, 7, 11], [2, 5, 9, 0], [6, 8, 10, 0], [2, 5, 7, 9], [1, 4, 6, 11], [2, 3, 7, 0], [6, 11, 10, 0], [2, 3, 5, 9]]
let notes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

let cualidades = [
    //////////////////////////////3 NOTAS

    ['maj', [0, 0, 1, 1, 1, 0], [0, 4, 7]],
    ['min', [0, 0, 1, 1, 1, 0], [0, 3, 7]],
    ['dim', [0, 0, 2, 0, 1, 0], [0, 3, 6]],
    ['aug', [0, 0, 0, 3, 0, 0], [0, 4, 8]],
    ['sus2', [0, 1, 0, 0, 2, 0], [0, 2, 7]],
    ['sus4', [0, 1, 0, 0, 2, 0], [0, 5, 7]],

    ///////////////////////////////4NOTAS
    ['6', [0, 1, 2, 1, 2, 0], [0, 4, 7, 9]],
    ['m6', [0, 1, 2, 1, 1, 1], [0, 3, 7, 9]],
    ['maj7', [1, 0, 1, 2, 2, 0], [0, 4, 7, 11]],
    ['m7', [0, 1, 2, 1, 2, 0], [0, 3, 7, 10]],
    ['mMaj7', [1, 0, 1, 3, 1, 0], [0, 3, 7, 11]],
    ['7', [0, 1, 2, 1, 1, 1], [0, 4, 7, 10]],
    ['7#5', [0, 2, 0, 2, 0, 2], [0, 4, 8, 10]],
    ['7b5', [0, 2, 0, 3, 0, 1], [0, 4, 6, 10]],
    ['7sus4', [0, 2, 1, 0, 3, 0], [0, 5, 7, 10]],
    ['7sus2', [0, 2, 1, 1, 2, 0], [0, 2, 7, 10]],
    ['m7b5', [0, 1, 2, 1, 1, 1], [0, 3, 6, 10]],
    ['dim7', [0, 0, 4, 0, 0, 2], [0, 3, 6, 9]]

]

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

function cosSimAcomodador(A) {
    var resultado = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    for (var i = 0; i < A.length; i++) {
        var note = A[i];
        resultado.splice(note, 1, note);
    }
    // console.log(resultado);
    return resultado;
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
    var similarityR = roundTo(similarity, 8);
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

function chordNm(chordValues) {
    var simAll = [];
    var simAllEval = [];
    var simAllCual = [];
    var simAllOri = [];
    var result = [];
    var resultMax = [];


    cosinesim(vectorInt(chordValues), cualidades[0][1]);
    var permus = transA0(chordValues);

    for (var p = 0; p < permus[0].length; p++) {
        simAll.push([]);

        for (var q = 0; q < cualidades.length; q++) {
            simAll[p].push(cosinesim(cosSimAcomodador(permus[0][p]), cosSimAcomodador(cualidades[q][2])));
            // console.log(cosSimAcomodador(permus[0][p],p),cosSimAcomodador(cualidades[q][2]),cosinesim(cosSimAcomodador(permus[0][p]), cosSimAcomodador(cualidades[q][2])));
        }
        // console.log(permus[0][p])
        // console.log(simAll[p]);
        var max = simAll[p].reduce((a, b) => { return Math.max(a, b) });
        // console.log(max);
        // console.log(simAll[p].indexOf(max));
        // console.log(cualidades[simAll[p].indexOf(max)]);
        var allMax = getAllIndexes(simAll[p], max);
        allMax.forEach((e) => { simAllEval.push(max); simAllCual.push(cualidades[e]); simAllOri.push(permus[1][p]) });
        // console.log(allMax);
    }

    for (var z = 0; z < simAllEval.length; z++) {
        result.push(notes[simAllOri[z]] + simAllCual[z][0], simAllEval[z]);
    }

    var maxAll = simAllEval.reduce((a, b) => { return Math.max(a, b) });
    var allChords = getAllIndexes(simAllEval, maxAll);

    allChords.forEach((e) => {
        resultMax.push(notes[simAllOri[e]] + simAllCual[e][0]);
    })

    // console.log([simAllEval, simAllCual, simAllOri]);
    console.log(result, resultMax);
    return [result, resultMax];
}

list.forEach((e) => {
    return chordNm(e);
})
