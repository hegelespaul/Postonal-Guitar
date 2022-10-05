
var fPrR = [];

var input = amplify.store("pisadas");
/////////////////////////////////////////

function dodeca() {
    function permutaciones() {

        var tricorde = input;
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

        var formaPrimaIn = formaPrimaCal.indexOf(Math.min(...formaPrimaCal));
        fPrR = `(${formaPrimaSel[formaPrimaIn]}) ${formaPrimaOri[formaPrimaIn]}`;
        return permu;
    }
    console.log("permutaciones", permutaciones(), "</br>");

    console.log("formaPrima", fPrR, "</br>");

    /////////////////////////////////////////
    /////////////////////////////////////////

    function reverse() {
        var rev = input.map((x) => x);
        for (let i = 0, j = rev.length - 1; i < j; i++, j--)
            [rev[i], rev[j]] = [rev[j], rev[i]];
        return rev;
    }

    console.log("retrogrado", reverse(), "</br>");

    /////////////////////////////////////////

    function inv() {
        var p1 = input[0];
        var res = [];
        input.forEach(function (unaNota) {
            var nuevoValor = (unaNota - p1) * -1 + p1;
            res.push((nuevoValor + 12) % 12);
        });
        return res;
    }
    console.log("inversion", inv(), "</br>");

    /////////////////////////////////////////

    function matrix() {
        var p1 = input[0];
        var res = [];
        var mres = [];
        input.forEach(function (unaNota) {
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
        for (var i = 0; i < input.length; i++) {
            m0.push((input[i] + res[0] + 12) % 12);
            m1.push((input[i] + res[1] + 12) % 12);
            m2.push((input[i] + res[2] + 12) % 12);
            m3.push((input[i] + res[3] + 12) % 12);
            m4.push((input[i] + res[4] + 12) % 12);
            m5.push((input[i] + res[5] + 12) % 12);
            m6.push((input[i] + res[6] + 12) % 12);
            m7.push((input[i] + res[7] + 12) % 12);
            m8.push((input[i] + res[8] + 12) % 12);
            m9.push((input[i] + res[9] + 12) % 12);
            m10.push((input[i] + res[10] + 12) % 12);
            m11.push((input[i] + res[11] + 12) % 12);
        }
        for (var i = 0; i < input.length; i++) {
            var mv = r[i];
            mres.push(mv);
        }
        return mres;
    }
    console.log("matrix:", matrix(), "</br>");
};
/////////////////////////////////////////