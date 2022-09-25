let list = [[0, 4, 7, 11], [2, 5, 9, 0], [6, 8, 10, 0], [2, 5, 7, 9], [1, 4, 6, 11], [2, 3, 7, 0], [6, 11, 10, 0], [2, 3, 5, 9]]
let cualidades = [['maj', [0, 0, 1, 1, 1, 0], [0, 4, 7]], ['min', [0, 0, 1, 1, 1, 0], [0, 3, 7]]]


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
    //console.log(similarity);
    return similarity;
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
console.log(transA0([0, 3, 7]))

////////////////////////////////////////////////////REVISAR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

for (var i = 0; i < list.length; i++) {
    cosinesim(vectorInt(list[i]), cualidades[0][1]);
    var permus = transA0(list[i]);
    console.log(permus);

    // for (var j = 0; j > permus.length; j++) {
    //     console.log(cosinesim(cosSimAcomodador(permus[i][0][j]), cosSimAcomodador(cualidades[j][2])));
    // }
};
