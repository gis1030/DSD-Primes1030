
// ----------------------------------------------------------------------
// 1. Funciones javascript a usar con archivos GeoJSON
// ----------------------------------------------------------------------

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para Contar Valores Específicos por Propiedad de Referencia
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function countValuesByReference(data, referenceProperty, valueToCount) {
    const allReferenceValues = new Set();
    const allValueToCountValues = new Set();

    // Paso 1: Recorrer los datos para obtener todos los valores únicos
    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const refValue = subFeature.properties[referenceProperty];
                    const valToCount = subFeature.properties[valueToCount];
                    if (refValue !== undefined) allReferenceValues.add(refValue);
                    if (valToCount !== undefined) allValueToCountValues.add(valToCount);
                });
            }
        });
    }

    // Paso 2: Inicializar el objeto de conteo con 0s para todas las combinaciones
    const counts = { 'TotalData': 0 };
    allReferenceValues.forEach(refValue => {
        counts[refValue] = { 'Total': 0 };
        allValueToCountValues.forEach(valToCount => {
            counts[refValue][valToCount] = 0;
        });
    });

    // Paso 3: Recorrer los datos nuevamente para realizar el conteo
    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const refValue = subFeature.properties[referenceProperty];
                    const valToCount = subFeature.properties[valueToCount];

                    if (refValue !== undefined && valToCount !== undefined) {
                        counts[refValue][valToCount]++;
                        counts[refValue]['Total']++;
                        counts['TotalData']++;
                    }
                });
            }
        });
    }
    return counts;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para contar elementos con una propiedad específica en un rango de años
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// const startYear = 2021;
// const endYear = 2025;
//const countedByQuartierWithPrimes = countElementsWithSpecificPropertyByYearRange(json_PrimesVelo1030, 'Quartier', 'primes', startYear, endYear);
// console.log(`Recuento de 'primes' por 'Quartier' entre ${startYear} y ${endYear}:`, countedByQuartierWithPrimes);

function countElementsWithSpecificPropertyByYearRange(data, referenceProperty, detailProperty, startYear, endYear) {
    const counts = {
        'TotalData': 0
    };

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const year = subFeature.properties.year;
                    const referenceValue = subFeature.properties[referenceProperty];
                    const detailValue = subFeature.properties[detailProperty];

                    if (year >= startYear && year <= endYear && referenceValue !== undefined && detailValue !== undefined) {

                        if (!counts[referenceValue]) {
                            counts[referenceValue] = {
                                'Total': 0,
                                'Details': {}
                            };
                        }

                        // Incrementar el contador total y el general
                        counts[referenceValue]['Total']++;
                        counts['TotalData']++;

                        if (!counts[referenceValue]['Details'][detailValue]) {
                            counts[referenceValue]['Details'][detailValue] = 0;
                        }
                        counts[referenceValue]['Details'][detailValue]++;
                    }
                });
            }
        });
    }
    return counts;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para contar elementos con una propiedad específica en un rango de años
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const startYear = 2021;
// const endYear = 2025;
// const countedByQuartierWithPrimes = countElementsWithDetails(json_PrimesVelo1030, 'Quartier', 'primes', startYear, endYear);
// console.log(`Recuento de 'primes' por 'Quartier' entre ${startYear} y ${endYear}:`, countedByQuartierWithPrimes);

function countElementsWithDetails(data, referenceProperty, detailProperty, startYear, endYear) {
    const counts = {};

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const year = subFeature.properties.year;
                    const referenceValue = subFeature.properties[referenceProperty];
                    const detailValue = subFeature.properties[detailProperty];

                    // Filtrar por rango de año y verificar la existencia de propiedades
                    if (year >= startYear && year <= endYear && referenceValue !== undefined && detailValue !== undefined) {

                        // Inicializar el objeto para el valor de referencia si no existe
                        if (!counts[referenceValue]) {
                            counts[referenceValue] = {
                                'Total': 0,
                                'Details': {}
                            };
                        }

                        // Incrementar el contador total
                        counts[referenceValue]['Total']++;

                        // Inicializar y/o incrementar el contador para el valor de detalle
                        if (!counts[referenceValue]['Details'][detailValue]) {
                            counts[referenceValue]['Details'][detailValue] = 0;
                        }
                        counts[referenceValue]['Details'][detailValue]++;
                    }
                });
            }
        });
    }
    return counts;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para contar elementos con una propiedad específica en un rango de años
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//const startYear = 2021;
// const endYear = 2025;
// const countedByQuartierWithPrimes = countElementsWithSpecificPropertyByYearRange(json_PrimesVelo1030, 'Quartier', 'primes', startYear, endYear);
// console.log(`Recuento de 'primes' por 'Quartier' entre ${startYear} y ${endYear}:`, countedByQuartierWithPrimes);

function countElementsWithSpecificPropertyByYearRange_OLD(data, referenceProperty, detailProperty, startYear, endYear) {
    const counts = {};

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const year = subFeature.properties.year;
                    const referenceValue = subFeature.properties[referenceProperty];
                    const detailValue = subFeature.properties[detailProperty];

                    if (year >= startYear && year <= endYear && referenceValue !== undefined && detailValue !== undefined) {
                        // Inicializar el objeto para el valor de referencia si no existe
                        if (!counts[referenceValue]) {
                            counts[referenceValue] = {
                                'Total': 0,
                                'Details': {}
                            };
                        }

                        // Incrementar el contador total
                        counts[referenceValue]['Total']++;

                        // Inicializar y/o incrementar el contador para el valor de detalle
                        if (!counts[referenceValue]['Details'][detailValue]) {
                            counts[referenceValue]['Details'][detailValue] = 0;
                        }
                        counts[referenceValue]['Details'][detailValue]++;
                    }
                });
            }
        });
    }
    return counts;
}


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para Contar y Desglosar Elementos
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const countedByYearWithQuartier = countElementsWithDetails(json_PrimesVelo1030, 'year', 'Quartier');
// console.log('Recuento por año con desglose de barrios:', countedByYearWithQuartier);
// Ejemplo de salida para un año:
/*
{
  "2021": {
    "Total": 150,
    "Details": {
      "Helmet-Hamoir": 30,
      "Terdelt-Fleur": 45,
      "Bienfaiteurs": 75
    }
  },
  "2022": { ... }
}
*/

function countElementsWithDetails_02(data, referenceProperty, detailProperty) {
    const counts = {};

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const referenceValue = subFeature.properties[referenceProperty];
                    const detailValue = subFeature.properties[detailProperty];

                    if (referenceValue !== undefined && detailValue !== undefined) {
                        // Inicializar el objeto para el valor de referencia si no existe
                        if (!counts[referenceValue]) {
                            counts[referenceValue] = {
                                'Total': 0,
                                'Details': {}
                            };
                        }

                        // Incrementar el contador total
                        counts[referenceValue]['Total']++;

                        // Inicializar y/o incrementar el contador para el valor de detalle
                        if (!counts[referenceValue]['Details'][detailValue]) {
                            counts[referenceValue]['Details'][detailValue] = 0;
                        }
                        counts[referenceValue]['Details'][detailValue]++;
                    }
                });
            }
        });
    }
    return counts;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para Contar Valores Específicos por Propiedad de Referencia
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// a. Contar los tipos de 'primes' por 'Quartier'
// const primesByQuartier = countValuesByReference(json_PrimesVelo1030, 'Quartier', 'primes');
// console.log('Tipos de primes por barrio con total:', primesByQuartier);
//
// Ejemplo de salida para "Helmet-Hamoir":
// "Helmet-Hamoir": { "TotalData": 52, "VAE": 30, "cargo": 10, "Prime vélo électrique": 18 }

function countValuesByReference_00(data, referenceProperty, valueToCount) {
    const counts = {};

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const referenceValue = subFeature.properties[referenceProperty];
                    const valueCounted = subFeature.properties[valueToCount];

                    if (referenceValue !== undefined && valueCounted !== undefined) {
                        // Inicializar el objeto para la propiedad de referencia si no existe
                        if (!counts[referenceValue]) {
                            counts[referenceValue] = {
                                TotalData: 0
                            };
                        }
                        // Inicializar el contador para el valor específico si no existe
                        if (!counts[referenceValue][valueCounted]) {
                            counts[referenceValue][valueCounted] = 0;
                        }

                        // Incrementar el contador específico y el total
                        counts[referenceValue][valueCounted]++;
                        counts[referenceValue].TotalData++;
                    }
                });
            }
        });
    }
    return counts;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para contar elementos con una propiedad específica
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Contar elementos por 'year' que tienen una propiedad 'Quartier'
// const countedByYearWithQuartier = countElementsWithSpecificProperty(json_PrimesVelo1030, 'year', 'Quartier');
// console.log('Recuento de elementos por año con propiedad Quartier:', countedByYearWithQuartier);

function countElementsWithSpecificProperty(data, referenceProperty, specificProperty) {
    const counts = {};

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const referenceValue = subFeature.properties[referenceProperty];

                    if (referenceValue !== undefined && subFeature.properties[specificProperty] !== undefined) {
                        if (!counts[referenceValue]) {
                            counts[referenceValue] = 0;
                        }
                        counts[referenceValue]++;
                    }
                });
            }
        });
    }
    return counts;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para sumar los valores de cualquier 
// propiedad numérica basándose en cualquier otra propiedad de referencia.
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// a. Sumar 'NTotal' por 'year'
// -------------
// const sumNTotalByYear = sumValuesByProperty(json_PrimesVelo1030, 'year', 'NTotal');
//console.log('Suma de NTotal por año:', sumNTotalByYear);
// b. Sumar 'NTotal' por tipo de 'primes'
// -------------
// const sumNTotalByPrimes = sumValuesByProperty(json_PrimesVelo1030, 'primes', 'NTotal');
// console.log('Suma de NTotal por tipo de prime:', sumNTotalByPrimes);
// c. Sumar 'NTotal' por 'Quartier'
// -------------
// const sumNTotalByQuartier = sumValuesByProperty(json_PrimesVelo1030, 'Quartier', 'NTotal');
// console.log('Suma de NTotal por barrio:', sumNTotalByQuartier);

function sumValuesByProperty(data, referenceProperty, valueProperty) {
    const totals = {};

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const referenceValue = subFeature.properties[referenceProperty];
                    const valueToSum = subFeature.properties[valueProperty];

                    // Verifica que ambas propiedades existan y que el valor a sumar sea un número
                    if (referenceValue !== undefined && typeof valueToSum === 'number') {
                        if (!totals[referenceValue]) {
                            totals[referenceValue] = 0;
                        }
                        totals[referenceValue] += valueToSum;
                    }
                });
            }
        });
    }
    return totals;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para obtener valores únicos de una propiedad específica
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// a.
// const uniqueYears2 = getUniqueValues(json_PrimesVelo1030, 'year');
// console.log('Años únicos:', uniqueYears2);
// b.
// const uniquePrimes = getUniqueValues(json_PrimesVelo1030, 'primes');
// console.log('Tipos de primes únicos:', uniquePrimes);
// c.
// const uniqueQuartiers = getUniqueValues(json_PrimesVelo1030, 'Quartier');
// console.log('Barrios únicos:', uniqueQuartiers);

function getUniqueValues(data, propertyName) {
    const uniqueValues = new Set();

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    // Verifica si la propiedad existe en el objeto
                    if (subFeature.properties && subFeature.properties[propertyName]) {
                        uniqueValues.add(subFeature.properties[propertyName]);
                    }
                });
            }
        });
    }

    // Convierte el Set a un array y lo ordena
    return Array.from(uniqueValues).sort();
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para contar IDs por rango de años
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const startYear = 2021;
// const endYear = 2022;
// const countForRange = countIdsByYearRange(json_PrimesVelo1030, startYear, endYear);
// console.log(`Número de IDs entre el ${startYear} y el ${endYear}: ${countForRange}`);

function countIdsByYearRange(data, startYear, endYear) {
    let count = 0;

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            // Navegar a través de la FeatureCollection anidada
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const year = subFeature.properties.year;

                    // Verificar si el objeto tiene un 'id' y si el 'year' está dentro del rango especificado
                    if (subFeature.properties && subFeature.properties.id && year >= startYear && year <= endYear) {
                        count++;
                    }
                });
            }
        });
    }
    return count;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para contar IDs para un año específico
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const countFor2025 = countIdsBySpecificYear(json_PrimesVelo1030, 2025);
// console.log(`Número de IDs para el año 2025: ${countFor2025}`);

function countIdsBySpecificYear(data, yearToCount) {
    let count = 0;

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            // Navegar a través de la FeatureCollection anidada
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const year = subFeature.properties.year;

                    // Verifica si el objeto tiene un 'id' y si el 'year' coincide con el deseado
                    if (subFeature.properties && subFeature.properties.id && year === yearToCount) {
                        count++;
                    }
                });
            }
        });
    }
    return count;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para contar IDs por año
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const idCounts = countIdsByYear(json_PrimesVelo1030);
// console.log('Número de IDs por año:', idCounts);

function countIdsByYear(data) {
    const counts = {};

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            // Navegar a través de la FeatureCollection anidada
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const year = subFeature.properties.year;

                    if (year && subFeature.properties.id) {
                        // Si el año aún no está en el objeto, inicialízalo en 0
                        if (!counts[year]) {
                            counts[year] = 0;
                        }
                        // Incrementa el contador para ese año
                        counts[year]++;
                    }
                });
            }
        });
    }

    return counts;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para crear conjuntos de datos por año
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const datasetsByYear = createDatasetsByYear(json_PrimesVelo1030);
// console.log('Datos del año 2025:', datasetsByYear[2025]);

function createDatasetsByYear(data) {
    const datasets = {};

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            // Accede a las características anidadas que contienen los datos
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const year = subFeature.properties.year;

                    // Verifica que el objeto tenga un 'id' y un 'year'
                    if (subFeature.properties && subFeature.properties.id && year) {
                        if (!datasets[year]) {
                            datasets[year] = [];
                        }
                        datasets[year].push(subFeature);
                    }
                });
            }
        });
    }

    return datasets;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para obtener años únicos
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const uniqueYears = getUniqueYears(json_PrimesVelo1030); >> Para ver el resultado en la consola
// console.log('Años únicos encontrados:', uniqueYears); >> Para acceder a los datos de un año específico, por ejemplo 2025:

function getUniqueYears(data) {
    const years = new Set();

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            // Como el archivo tiene una FeatureCollection anidada, se debe iterar sobre sus 'features' internas
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    if (subFeature.properties && subFeature.properties.year) {
                        years.add(subFeature.properties.year);
                    }
                });
            }
        });
    }

    // Convierte el Set a un array y lo ordena para una mejor presentación
    return Array.from(years).sort();
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  Función para contar IDs en los datos
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const numberOfIds = countIds(json_PrimesVelo1030);
// console.log(`El número total de IDs es: ${numberOfIds}`);

function countIds(data) {
    let count = 0;
    // Comprueba si el objeto es un FeatureCollection
    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        // Itera sobre las características de la colección principal
        data.features.forEach(feature => {
            // Si la característica es a su vez una FeatureCollection, itera sobre sus características
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    // Si la característica tiene una propiedad 'id', incrementa el contador
                    if (subFeature.properties && subFeature.properties.id) {
                        count++;
                    }
                });
            } else if (feature.properties && feature.properties.id) {
                // Si la característica tiene una propiedad 'id', incrementa el contador
                count++;
            }
        });
    }
    return count;
}