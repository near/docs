#!/usr/bin/env node
/**
 * Script para crear un diccionario de IDs de front matter y rutas reales de archivos.
 * Lee todos los archivos markdown del directorio docs y extrae sus IDs del front matter.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * Encuentra todos los archivos markdown recursivamente en un directorio
 * @param {string} dir - Directorio a explorar
 * @param {string[]} fileList - Lista acumulada de archivos
 * @returns {string[]} Lista de rutas de archivos markdown
 */
function findMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * Extrae el ID del front matter de un archivo markdown
 * @param {string} filePath - Ruta del archivo
 * @returns {string|null} ID del front matter o null si no existe
 */
function extractFrontmatterId(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    return data.id || null;
  } catch (error) {
    console.error(`Error procesando ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Elimina prefijos numéricos de rutas de archivos
 * @param {string} pathStr - Ruta del archivo
 * @returns {string} Ruta sin prefijos numéricos
 */
function removeNumericPrefixes(pathStr) {
  return pathStr
    .split('/')
    .map(part => {
      // Eliminar prefijos numéricos como "01-", "02-", "00-", etc.
      return part.replace(/^\d+-/, '');
    })
    .join('/');
}

/**
 * Crea un diccionario de IDs de front matter y rutas de archivos
 * @param {string} docsDir - Directorio raíz de documentos
 * @returns {Object} Diccionario con IDs como llaves y rutas como valores
 */
function createFrontmatterDictionary(docsDir) {
  const markdownFiles = findMarkdownFiles(docsDir);
  const frontmatterDict = {};
  
  console.log(`📁 Encontrados ${markdownFiles.length} archivos markdown/mdx`);
  
  let filesWithIds = 0;
  let filesWithoutIds = 0;
  
  markdownFiles.forEach(filePath => {
    const frontmatterId = extractFrontmatterId(filePath);
    const relativePath = path.relative(docsDir, filePath);
    
    // Crear el ID jerárquico basado en la ruta del archivo
    const pathWithoutExtension = relativePath.replace(/\.(md|mdx)$/, '');
    
    let hierarchicalId;
    if (frontmatterId) {
      // Si hay ID en front matter, usar la ruta de directorio + ID
      const dirPath = path.dirname(pathWithoutExtension);
      if (dirPath === '.') {
        // Archivo en la raíz
        hierarchicalId = frontmatterId;
      } else {
        // Archivo en subdirectorio - eliminar prefijos numéricos
        const cleanDirPath = removeNumericPrefixes(dirPath);
        hierarchicalId = `${cleanDirPath}/${frontmatterId}`;
      }
      filesWithIds++;
    } else {
      // Si no hay ID, usar la ruta completa del archivo sin prefijos numéricos
      hierarchicalId = removeNumericPrefixes(pathWithoutExtension);
      filesWithoutIds++;
    }
    
    // Normalizar las barras para usar siempre /
    hierarchicalId = hierarchicalId.replace(/\\/g, '/');
    
    // Si el ID ya existe, crear un array con múltiples rutas
    if (frontmatterDict[hierarchicalId]) {
      if (Array.isArray(frontmatterDict[hierarchicalId])) {
        frontmatterDict[hierarchicalId].push(relativePath);
      } else {
        frontmatterDict[hierarchicalId] = [frontmatterDict[hierarchicalId], relativePath];
      }
    } else {
      frontmatterDict[hierarchicalId] = relativePath;
    }
  });
  
  console.log(`✅ Archivos con ID: ${filesWithIds}`);
  console.log(`❌ Archivos sin ID: ${filesWithoutIds}`);
  
  return frontmatterDict;
}

/**
 * Función principal del script
 */
function main() {
  // Directorio de documentos (relativo al directorio website)
  const docsDir = path.join(__dirname, '../../docs');
  
  if (!fs.existsSync(docsDir)) {
    console.error(`❌ Error: El directorio ${docsDir} no existe`);
    process.exit(1);
  }
  
  console.log(`🔍 Procesando archivos en: ${docsDir}`);
  
  // Crear diccionario
  const frontmatterDict = createFrontmatterDictionary(docsDir);
  
  // Mostrar resultados
  console.log('\n📊 === RESULTADOS ===');
  console.log(`📝 Total de IDs únicos encontrados: ${Object.keys(frontmatterDict).length}`);
  
  // Mostrar algunos ejemplos
  console.log('\n🔍 === EJEMPLOS ===');
  let count = 0;
  for (const [id, paths] of Object.entries(frontmatterDict)) {
    if (count < 10) {
      console.log(`ID: '${id}' -> Ruta: ${Array.isArray(paths) ? paths.join(', ') : paths}`);
      count++;
    } else {
      break;
    }
  }
  
  // Guardar en archivo JSON
  const outputFile = path.join(__dirname, '../frontmatter_ids.json');
  fs.writeFileSync(outputFile, JSON.stringify(frontmatterDict, null, 2), 'utf8');
  
  console.log(`\n💾 Diccionario guardado en: ${outputFile}`);
  
  // Mostrar IDs duplicados si existen
  const duplicates = Object.entries(frontmatterDict)
    .filter(([_, paths]) => Array.isArray(paths))
    .reduce((acc, [id, paths]) => {
      acc[id] = paths;
      return acc;
    }, {});
  
  if (Object.keys(duplicates).length > 0) {
    console.log(`\n⚠️  === IDs DUPLICADOS (${Object.keys(duplicates).length}) ===`);
    for (const [id, paths] of Object.entries(duplicates)) {
      console.log(`ID: '${id}' -> Archivos: ${paths.join(', ')}`);
    }
  }
  
  console.log('\n✨ Proceso completado exitosamente!');
}

// Ejecutar el script si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = {
  createFrontmatterDictionary,
  extractFrontmatterId,
  findMarkdownFiles
};