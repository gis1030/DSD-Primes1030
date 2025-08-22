// Defaults
Chart.defaults.color = '#444'; //'#ffff';
Chart.defaults.borderColor = '#444'; '#ffff';
Chart.defaults.font.size = 12;
Chart.defaults.font.family = 'Verdana';

// -----------------------------------------------------------
// 1. Funciones de renderizado de gráficos
// -----------------------------------------------------------

// 1.1. Gráfico de dona para Primes Velo por año
function modelDoughnutChart1(Data011, id) {
    var labels = [];
    var dataValues = [];

    labels = getUniqueValues(Data011, 'year');
    for (let i = 0; i < labels.length; i++) {
        dataValues[i] = countIdsBySpecificYear(Data011, labels[i]);
    }

    const data = {
        labels: labels,
        datasets: [{
            data: dataValues,
            backgroundColor: styles.color.alphas.map(eachColor => eachColor),
            borderColor: styles.color.solids.map(eachColor => eachColor),
            borderWidth: 1
        }]
    }

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'right'
            },
        },
    }

    new Chart(id, { type: 'doughnut', data, options })

}

// 1.2. Gráfico de dona para Facade Vert por año
function modelDoughnutChart2(Data012, id) {
    var labels = [];
    var dataValues = [];

    /*
    labels = getUniqueValues(Data012, 'year');
    for (let i = 0; i < labels.length; i++) {
        dataValues[i] = countIdsBySpecificYear(Data012, labels[i]);
    }
    */

    labels = ['1998-2001', '2002-2019', '2020-2021', '2022-2023', '2024-2025'];
    dataValues[0] = countIdsByYearRange(Data012, 1998, 2001);
    dataValues[1] = countIdsByYearRange(Data012, 2002, 2019);
    dataValues[2] = countIdsByYearRange(Data012, 2020, 2021);
    dataValues[3] = countIdsByYearRange(Data012, 2022, 2023);
    dataValues[4] = countIdsByYearRange(Data012, 2024, 2025);

    const data = {
        labels: labels,
        datasets: [{
            data: dataValues,
            backgroundColor: styles.color.alphas.map(eachColor => eachColor),
            borderColor: styles.color.solids.map(eachColor => eachColor),
            borderWidth: 1
        }]
    }

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'right'
            },
        },
    }

    new Chart(id, { type: 'doughnut', data, options })
}

// 1.3. Gráfico de dona para Primes Compostiere por año
function modelDoughnutChart3(Data013, id) {
    var labels = [];
    var dataValues = [];

    labels = ['2010-2015', '2016-2018', '2019-2020', '2021-2023', '2024-2025'];
    dataValues[0] = countIdsByYearRange(Data013, 2010, 2015);
    dataValues[1] = countIdsByYearRange(Data013, 2016, 2018);
    dataValues[2] = countIdsByYearRange(Data013, 2019, 2020);
    dataValues[3] = countIdsByYearRange(Data013, 2021, 2023);
    dataValues[4] = countIdsByYearRange(Data013, 2024, 2025);

    const data = {
        labels: labels,
        datasets: [{
            data: dataValues,
            backgroundColor: styles.color.alphas.map(eachColor => eachColor),
            borderColor: styles.color.solids.map(eachColor => eachColor),
            borderWidth: 1
        }]
    }

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'right'
            },
        },
    }

    new Chart(id, { type: 'doughnut', data, options })
}

// 1.4. Gráfico de barras por años
function yearsBarChart(Data011, Data012, Data013, id) {
    var labels = [];
    var dataValues_Data011 = [];
    var dataValues_Data012 = [];
    var dataValues_Data013 = [];
    var dataValues = [];

    // label > Periodos de estudio
    labels = ['1998-2013', '2014-2017', '2018-2020', '2021', '2022', '2023', '2024', '2025'];

    //DataValues > Total Primas por periodo > Grafica lineal
    dataValues[0] = countIdsByYearRange(Data011, 1998, 2013) + countIdsByYearRange(Data012, 1998, 2013) + countIdsByYearRange(Data013, 1998, 2013);
    dataValues[1] = countIdsByYearRange(Data011, 2014, 2017) + countIdsByYearRange(Data012, 2014, 2017) + countIdsByYearRange(Data013, 2014, 2017);
    dataValues[2] = countIdsByYearRange(Data011, 2018, 2020) + countIdsByYearRange(Data012, 2018, 2020) + countIdsByYearRange(Data013, 2018, 2020);
    dataValues[3] = countIdsByYearRange(Data011, 2021, 2021) + countIdsByYearRange(Data012, 2021, 2021) + countIdsByYearRange(Data013, 2021, 2021);
    dataValues[4] = countIdsByYearRange(Data011, 2022, 2022) + countIdsByYearRange(Data012, 2022, 2022) + countIdsByYearRange(Data013, 2022, 2022);
    dataValues[5] = countIdsByYearRange(Data011, 2023, 2023) + countIdsByYearRange(Data012, 2023, 2023) + countIdsByYearRange(Data013, 2023, 2023);
    dataValues[6] = countIdsByYearRange(Data011, 2024, 2024) + countIdsByYearRange(Data012, 2024, 2024) + countIdsByYearRange(Data013, 2024, 2024);
    dataValues[7] = countIdsByYearRange(Data011, 2025, 2025) + countIdsByYearRange(Data012, 2025, 2025) + countIdsByYearRange(Data013, 2025, 2025);

    // Type des Primes par année
    //primesByYear_Data011 = countValuesByReference(Data011, 'year', 'primes');
    //primesByYear_Data012 = countValuesByReference(Data012, 'year', 'primes');
    //primesByYear_Data013 = countValuesByReference(Data013, 'year', 'primes');

    // Primes Velo Electrique
    dataValues_Data011[0] = countElementsWithSpecificPropertyByYearRange(Data011, 'year', 'primes', 1998, 2013).TotalData;
    dataValues_Data011[1] = countElementsWithSpecificPropertyByYearRange(Data011, 'year', 'primes', 2014, 2017).TotalData;
    dataValues_Data011[2] = countElementsWithSpecificPropertyByYearRange(Data011, 'year', 'primes', 2018, 2020).TotalData;
    dataValues_Data011[3] = countElementsWithSpecificPropertyByYearRange(Data011, 'year', 'primes', 1998, 2013).TotalData;
    dataValues_Data011[4] = countElementsWithSpecificPropertyByYearRange(Data011, 'year', 'primes', 2022, 2022).TotalData;
    dataValues_Data011[5] = countElementsWithSpecificPropertyByYearRange(Data011, 'year', 'primes', 2023, 2023).TotalData;
    dataValues_Data011[6] = countElementsWithSpecificPropertyByYearRange(Data011, 'year', 'primes', 2024, 2024).TotalData;
    dataValues_Data011[7] = countElementsWithSpecificPropertyByYearRange(Data011, 'year', 'primes', 2025, 2025).TotalData;

    // Primes Facade vert
    dataValues_Data012[0] = countElementsWithSpecificPropertyByYearRange(Data012, 'year', 'primes', 1998, 2013).TotalData;
    dataValues_Data012[1] = countElementsWithSpecificPropertyByYearRange(Data012, 'year', 'primes', 2014, 2017).TotalData;
    dataValues_Data012[2] = countElementsWithSpecificPropertyByYearRange(Data012, 'year', 'primes', 2018, 2020).TotalData;
    dataValues_Data012[3] = countElementsWithSpecificPropertyByYearRange(Data012, 'year', 'primes', 1998, 2013).TotalData;
    dataValues_Data012[4] = countElementsWithSpecificPropertyByYearRange(Data012, 'year', 'primes', 2022, 2022).TotalData;
    dataValues_Data012[5] = countElementsWithSpecificPropertyByYearRange(Data012, 'year', 'primes', 2023, 2023).TotalData;
    dataValues_Data012[6] = countElementsWithSpecificPropertyByYearRange(Data012, 'year', 'primes', 2024, 2024).TotalData;
    dataValues_Data012[7] = countElementsWithSpecificPropertyByYearRange(Data012, 'year', 'primes', 2025, 2025).TotalData;

    // Primes Facade vert
    dataValues_Data013[0] = countElementsWithSpecificPropertyByYearRange(Data013, 'year', 'primes', 1998, 2013).TotalData;
    dataValues_Data013[1] = countElementsWithSpecificPropertyByYearRange(Data013, 'year', 'primes', 2014, 2017).TotalData;
    dataValues_Data013[2] = countElementsWithSpecificPropertyByYearRange(Data013, 'year', 'primes', 2018, 2020).TotalData;
    dataValues_Data013[3] = countElementsWithSpecificPropertyByYearRange(Data013, 'year', 'primes', 1998, 2013).TotalData;
    dataValues_Data013[4] = countElementsWithSpecificPropertyByYearRange(Data013, 'year', 'primes', 2022, 2022).TotalData;
    dataValues_Data013[5] = countElementsWithSpecificPropertyByYearRange(Data013, 'year', 'primes', 2023, 2023).TotalData;
    dataValues_Data013[6] = countElementsWithSpecificPropertyByYearRange(Data013, 'year', 'primes', 2024, 2024).TotalData;
    dataValues_Data013[7] = countElementsWithSpecificPropertyByYearRange(Data013, 'year', 'primes', 2025, 2025).TotalData;

    // console.log('Datos por año Prime Velo Electrique:', dataValues_Data011);
    // console.log('Datos por año Prime Facade Vert:', dataValues_Data012);
    // console.log('Datos por año Prime Compostiere:', dataValues_Data013);
    // console.log('Datos por año:', primesByYear_Data012[2021].TotalData);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Primes octrayes par la DSD',
                data: dataValues,
                tension: 0.5,
                backgroundColor: styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids.map(eachColor => eachColor),
                borderWidth: 2,
            },
            {
                type: 'bar',
                label: 'Velo Electrique',
                data: dataValues_Data011,
                backgroundColor: styles.color.alphas[2],
                borderColor: styles.color.solids[2],
                borderWidth: 1,
                barPercentage: 0.9
            },
            {
                type: 'bar',
                label: 'Facade Vert',
                data: dataValues_Data012,
                backgroundColor: styles.color.alphas[3],
                borderColor: styles.color.solids[3],
                borderWidth: 1,
                barPercentage: 0.9
            },
            {
                type: 'bar',
                label: 'Compostiere',
                data: dataValues_Data013,
                backgroundColor: styles.color.alphas[4],
                borderColor: styles.color.solids[4],
                borderWidth: 1,
                barPercentage: 0.9
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                position: 'right',
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Total Primes'
                },
                suggestedMin: 0,
                suggestedMax: 250
            },
        },
        maintainAspectRatio: false,
        scaleFontColor: Chart.defaults.color,
    };

    new Chart(id, { type: 'line', data, options });
}

// 1.5. Gráfico de barras por quartiers
function quartierBarChart(Data011, Data012, Data013, id) {
    var labels = [];
    var dataValues_Data011 = [];
    var dataValues_Data012 = [];
    var dataValues_Data013 = [];
    var dataValues = [];

    // label > Periodos de estudio
    labels = ['Bienfaiteurs', 'Cerisiers', 'Colignon', 'Coteaux-Josaphat', 'Helmet-Hamoir', 'Jardin', 'Linthout', 'Nord', 'Palais-Reine', 'Parc Josaphat', 'Plasky', 'Reyers', 'Terdelt-Fleur'];

    // Primes Velo Electrique
    const primesByQuartier_Data011 = countValuesByReference(Data011, 'Quartier', 'primes');
    // Primes Facade Vert
    const primesByQuartier_Data012 = countValuesByReference(Data012, 'Quartier', 'primes');
    // Primes Compostiere
    const primesByQuartier_Data013 = countValuesByReference(Data013, 'Quartier', 'primes');

    //DataValues > Total Primas por Quartier > Grafica lineal
    var data01 = 0;
    var data02 = 0;
    var data03 = 0;
    for (let i = 0; i < labels.length; i++) {
        //console.log('quartier:', labels[i]);
        const label = labels[i];
        if (primesByQuartier_Data011[label] !== undefined) {
            data01 = primesByQuartier_Data011[label].Total;
        } else {
            data01 = 0;
        }

        if (primesByQuartier_Data012[label] !== undefined) {
            data02 = primesByQuartier_Data012[label].Total;
        } else {
            data02 = 0;
        }

        if (primesByQuartier_Data013[label] !== undefined) {
            data03 = primesByQuartier_Data013[label].Total;
        } else {
            data03 = 0;
        }
        dataValues[i] = data01 + data02 + data03; // Total Primas por Quartier
        dataValues_Data011[i] = data01; // Total Primes por Velo Electrique
        dataValues_Data012[i] = data02; // Total Primes por Facade Vert
        dataValues_Data013[i] = data03; // Total Primes por Compostiere
    }
    //console.log('Datos por quartier:', dataValues);
    //console.log('Datos por quartier (velo electrique):', dataValues_Data011);
    //console.log('Datos por quartier (facade vert):', dataValues_Data012);
    //console.log('Datos por quartier (compostiere):', dataValues_Data013);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Primes octrayes par la DSD',
                data: dataValues,
                tension: 0.5,
                backgroundColor: styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids.map(eachColor => eachColor),
                borderWidth: 2,
            },
            {
                type: 'bar',
                label: 'Velo Electrique',
                data: dataValues_Data011,
                backgroundColor: styles.color.alphas[2],
                borderColor: styles.color.solids[2],
                borderWidth: 1,
                barPercentage: 0.9
            },
            {
                type: 'bar',
                label: 'Facade Vert',
                data: dataValues_Data012,
                backgroundColor: styles.color.alphas[3],
                borderColor: styles.color.solids[3],
                borderWidth: 1,
                barPercentage: 0.9
            },
            {
                type: 'bar',
                label: 'Compostiere',
                data: dataValues_Data013,
                backgroundColor: styles.color.alphas[4],
                borderColor: styles.color.solids[4],
                borderWidth: 1,
                barPercentage: 0.9
            }
        ]
    };

    const options = {
        indexAxis: 'x',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
            bar: {
                borderWidth: 2,
            }
        },
        plugins: {
            legend: {
                position: 'right',
            }
        },

        scales: {
            x: {
                display: true,
                title: {
                    display: true
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Total Primes'
                },
                suggestedMin: 0,
                suggestedMax: 250
            },
        },
        maintainAspectRatio: false,
        scaleFontColor: Chart.defaults.color
    };

    new Chart(id, { type: 'line', data, options });

}

// 1.6. Gráfico de dona para Primes Velo por quartier
function modelDoughnutChart4(Data011, id) {
    var labels = [];
    var dataValues = [];

    labels = getUniqueValues(Data011, 'Quartier');
    primesByQuartier = countValuesByReference(Data011, 'Quartier', 'primes');
    console.log('Primes by Quartier:', primesByQuartier);
    console.log('Labels (Quartier):', labels);

    //DataValues > Total Primas por Quartier > Grafica lineal
    var data01 = 0;
    for (let i = 0; i < labels.length; i++) {
        //console.log('quartier:', labels[i]);
        const label = labels[i];
        if (primesByQuartier[label] !== undefined) {
            data01 = primesByQuartier[label].Total;
        } else {
            data01 = 0;
        }
        dataValues[i] = data01; // Total Primes por Velo Electrique
    }
    console.log('Data Values (Velo Electrique):', dataValues);

    const data = {
        labels: labels,
        datasets: [{
            data: dataValues,
            backgroundColor: styles.color.alphas.map(eachColor => eachColor),
            borderColor: styles.color.solids.map(eachColor => eachColor),
            borderWidth: 1
        }]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'right'
            },
        },
    }

    new Chart(id, { type: 'doughnut', data, options })
}

// 1.7. Gráfico de dona para Primes Facade Vert por quartier
function modelDoughnutChart5(Data012, id) {
    var labels = [];
    var dataValues = [];

    labels = getUniqueValues(Data012, 'Quartier');
    primesByQuartier = countValuesByReference(Data012, 'Quartier', 'primes');
    console.log('Primes by Quartier:', primesByQuartier);
    console.log('Labels (Quartier):', labels);

    //DataValues > Total Primas por Quartier > Grafica lineal
    var data01 = 0;
    for (let i = 0; i < labels.length; i++) {
        //console.log('quartier:', labels[i]);
        const label = labels[i];
        if (primesByQuartier[label] !== undefined) {
            data01 = primesByQuartier[label].Total;
        } else {
            data01 = 0;
        }
        dataValues[i] = data01; // Total Primes por Velo Electrique
    }
    console.log('Data Values (Velo Electrique):', dataValues);

    const data = {
        labels: labels,
        datasets: [{
            data: dataValues,
            backgroundColor: styles.color.alphas.map(eachColor => eachColor),
            borderColor: styles.color.solids.map(eachColor => eachColor),
            borderWidth: 1
        }]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'right'
            },
        },
    }

    new Chart(id, { type: 'doughnut', data, options })
}

// 1.8. Gráfico de dona para Primes Compostiere por quartier
function modelDoughnutChart6(Data013, id) {
    var labels = [];
    var dataValues = [];

    labels = getUniqueValues(Data013, 'Quartier');
    primesByQuartier = countValuesByReference(Data013, 'Quartier', 'primes');
    console.log('Primes by Quartier:', primesByQuartier);
    console.log('Labels (Quartier):', labels);

    //DataValues > Total Primas por Quartier > Grafica lineal
    var data01 = 0;
    for (let i = 0; i < labels.length; i++) {
        //console.log('quartier:', labels[i]);
        const label = labels[i];
        if (primesByQuartier[label] !== undefined) {
            data01 = primesByQuartier[label].Total;
        } else {
            data01 = 0;
        }
        dataValues[i] = data01; // Total Primes por Velo Electrique
    }
    console.log('Data Values (Velo Electrique):', dataValues);

    const data = {
        labels: labels,
        datasets: [{
            data: dataValues,
            backgroundColor: styles.color.alphas.map(eachColor => eachColor),
            borderColor: styles.color.solids.map(eachColor => eachColor),
            borderWidth: 1
        }]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'right'
            },
        },
    }

    new Chart(id, { type: 'doughnut', data, options })
}
// -----------------------------------------------------------
// 2. Función principal para orquestar la visualización
// -----------------------------------------------------------

const printCharts = () => {
    // Remove loading message, show chart panels 
    const DataALL = dataWorld;
    const Data011 = json_PrimesVelo1030;
    const Data012 = json_PrimesFacadeVert1030;
    const Data013 = json_PrimesCompostiere1030;

    // Call each chart function passing the coasters and DOM Canvas tag ID to be rendered
    //compareRadialChart(DataALL, 'chart2')
    modelDoughnutChart1(Data011, 'chart011')
    modelDoughnutChart2(Data012, 'chart012')
    modelDoughnutChart3(Data013, 'chart013')
    yearsBarChart(Data011, Data012, Data013, 'chart020')

    quartierBarChart(Data011, Data012, Data013, 'chart030')
    modelDoughnutChart4(Data011, 'chart021')
    modelDoughnutChart5(Data012, 'chart022')
    modelDoughnutChart6(Data013, 'chart023')
    /*
    const primesByQuartier = countValuesByReference(json_PrimesVelo1030, 'Quartier', 'primes');
    console.log('Tipos de primes por barrio:', primesByQuartier);

    const countedByYearWithQuartier = countElementsWithSpecificProperty(json_PrimesVelo1030, 'year', 'Quartier');
    console.log('Recuento de elementos por año con propiedad Quartier:', countedByYearWithQuartier);

    const countedByYearWithQuartierDetails = countElementsWithDetails(json_PrimesVelo1030, 'year', 'Quartier');
    console.log('Recuento de elementos por año con desglose de barrios:', countedByYearWithQuartierDetails);
    */

}

// -----------------------------------------------------------
// 3. Ejecución del código al cargar la página
// -----------------------------------------------------------

// Se asegura de que el código se ejecute cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', printCharts);