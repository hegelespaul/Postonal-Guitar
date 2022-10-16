let all = [];
// let dat = [0,5,7,9,3,2,8,11,10];
let dat = amplify.store("complemento");
let chunkIndx = [];

if(dat.length ==7){
    chunkIndx = [];
    chunkIndx.push(4);
}

if(dat.length ==8){
    chunkIndx = [];
    chunkIndx.push(4);
    chunkIndx.push(5);
}

if(dat.length ==9){
    chunkIndx = [];
    chunkIndx.push(3);
    chunkIndx.push(5);
    chunkIndx.push(6);
}

// var permArr = [],
//     usedChars = [];

// function permute(input) {
//     var i, ch;
//     for (i = 0; i < input.length; i++) {
//         ch = input.splice(i, 1)[0];
//         usedChars.push(ch);
//         if (input.length == 0) {
//             permArr.push(usedChars.slice());
//         }
//         permute(input);
//         input.splice(i, 0, ch);
//         usedChars.pop();
//     }
//     return permArr
// };

// function permute(permutation) {
//     var length = permutation.length,
//         result = [permutation.slice()],
//         c = new Array(length).fill(0),
//         i = 1, k, p;
  
//     while (i < length) {
//       if (c[i] < i) {
//         k = i % 2 && c[i];
//         p = permutation[i];
//         permutation[i] = permutation[k];
//         permutation[k] = p;
//         ++c[i];
//         i = 1;
//         result.push(permutation.slice());
//       } else {
//         c[i] = 0;
//         ++i;
//       }
//     }
//     return result;
//   }

// const permutations = arr => {
//     if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
//     return arr.reduce(
//         (acc, item, i) =>
//             acc.concat(
//                 permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [
//                     item,
//                     ...val,
//                 ])
//             ),
//         []
//     );
// }

//   console.log(permutations(dat))


var swap = function (array, pos1, pos2) {
    var temp = array[pos1];
    array[pos1] = array[pos2];
    array[pos2] = temp;
  };

  var heapsPermute = function (array, n, results = []) {
    n = n || array.length;
    if (n === 1) {
      results.push(array.slice());
    } else {
      for (var i = 1; i <= n; i += 1) {
        heapsPermute(array, n - 1, results);
        if (n % 2) {
          var j = 1;
        } else {
          var j = i;
        }
        swap(array, j - 1, n - 1);
      }
    }
    return results;
  };


  function permutaciones(notes) {
    var fPrR2;
    var formaPrimaIn2;
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
    return fPrR2;
}

// const swap = (arr, i , j) =>{
//     [arr[i], arr[j]] = [arr[j], arr[i]];
// }

// var permute = function(nums, start = 0, answer = []){
//     if (start === nums.length - 1){
//         answer.push([...nums]);
//     }
//     for(let i = start; i < nums.length;i++){
//         swap(nums, start, i);
//         permute(nums, start + 1, answer)
//         swap(nums, start, i);
//     }
//     return answer;
// };

var perm = heapsPermute(dat);
console.log(permutaciones(dat))

for(var a=0; a < chunkIndx.length;a++){
all = [];
for (var j = 0; j < perm.length; j++) {
    var turn = perm[j]
    let chunks = _.chunk(turn, chunkIndx[a]);  ///////////
    chunks.forEach(function (e) { e.sort() });
    chunks.sort(([a, b], [c, d]) => a - c || d - b);
    all.push(chunks)
}

let lut = {},
    red = all.filter(a => lut[a] ? false : lut[a] = true);

var allFpperm = [];
for (var i = 0; i < red.length; i++) {
    allFpperm.push([]);
    for (var j = 0; j < all[i].length; j++) {
        allFpperm[i].push(permutaciones(all[i][j]));
    }
}

let lut2 = {},
    red2 = allFpperm.filter(a => lut2[a] ? false : lut2[a] = true);

console.log(red2);
}


// function transA0(acorde) {
//     var result = [];

//     for (var i = 0; i < acorde.length; i++) {
//         result.push([]);
//         for (var j = 0; j < acorde.length; j++) {
//             result[i].push(Math.abs((acorde[j] + 12) - acorde[i]) % 12);
//         }
//         result[i].sort((a, b) => a - b);
//     }
//     return [result, acorde];
// }


// const combinations = ( collection, combinationLength ) => {
//     let head, tail, result = [];
//     if ( combinationLength > collection.length || combinationLength < 1 ) { return []; }
//     if ( combinationLength === collection.length ) { return [ collection ]; }
//     if ( combinationLength === 1 ) { return collection.map( element => [ element ] ); }
//     for ( let i = 0; i < collection.length - combinationLength + 1; i++ ) {
//       head = collection.slice( i, i + 1 );
//       tail = combinations( collection.slice( i + 1 ), combinationLength - 1 );
//       for ( let j = 0; j < tail.length; j++ ) { result.push( head.concat( tail[ j ] ) ); }
//     }
//     return result;
//   }

//   console.log(combinations([0,1,2,3,4,5,6,7,8,9,10,11], 3))


// const rotations = ([l, ...ls], right=[]) =>
//   l !== void 0 ? [[l, ...ls, ...right], ...rotations(ls, [...right, l])] : []

// const permutations = ([x, ...xs]) =>
//   x !== void 0 ? permutations(xs).flatMap((p) => rotations([x, ...p])) : [[]]

// console.log(permutations(dat))