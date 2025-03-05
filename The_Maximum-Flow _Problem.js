// Mengembalikan true jika ada jalur dari sumber 's' ke tujuan 't' 
// dalam graf residual. Juga mengisi array induk[] untuk menyimpan jalur
function bfs(grafResidual, sumber, tujuan, induk) {
    const dikunjungi = new Array(jumlahSimpul).fill(false);
    const antrian = [];
    antrian.push(sumber);
    dikunjungi[sumber] = true;
    induk[sumber] = -1;

    while (antrian.length !== 0) {
        const u = antrian.shift();

        for (let v = 0; v < jumlahSimpul; v++) {
            if (!dikunjungi[v] && grafResidual[u][v] > 0) {
                antrian.push(v);
                induk[v] = u;
                dikunjungi[v] = true;
            }
        }
    }

    return dikunjungi[tujuan];
}

// Mengembalikan aliran maksimum dari sumber ke tujuan dalam graf yang diberikan
function fordFulkerson(graf, sumber, tujuan) {
    const grafResidual = [];
    for (let u = 0; u < jumlahSimpul; u++) {
        grafResidual[u] = new Array(jumlahSimpul);
        for (let v = 0; v < jumlahSimpul; v++) {
            grafResidual[u][v] = graf[u][v];
        }
    }

    const induk = new Array(jumlahSimpul);
    let aliranMaksimum = 0;

    while (bfs(grafResidual, sumber, tujuan, induk)) {
        let aliranJalur = Number.MAX_VALUE;
        for (let v = tujuan; v !== sumber; v = induk[v]) {
            const u = induk[v];
            aliranJalur = Math.min(aliranJalur, grafResidual[u][v]);
        }

        for (let v = tujuan; v !== sumber; v = induk[v]) {
            const u = induk[v];
            grafResidual[u][v] -= aliranJalur;
            grafResidual[v][u] += aliranJalur;
        }

        aliranMaksimum += aliranJalur;
    }

    return aliranMaksimum;
}

// Kode utama (Driver code)
const jumlahSimpul = 6;
const graf = [
    [0, 16, 13, 0, 0, 0],
    [0, 0, 10, 12, 0, 0],
    [0, 4, 0, 0, 14, 0],
    [0, 0, 9, 0, 0, 20],
    [0, 0, 0, 7, 0, 4],
    [0, 0, 0, 0, 0, 0]
];

console.log("Aliran maksimum adalah " + fordFulkerson(graf, 0, 5));
