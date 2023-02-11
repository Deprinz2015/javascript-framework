console.log('Loading Templates...');

const fs = require('fs');
const path = require('path');

const pathToTemplates = 'src/templates';
const pathToTemplateCache = 'src/js/templates/templateCache.js';

const templateCacheString = 'export const templates = {{templates}};';

const loadAllFilesFromDir = async (dir) => {
    let filePaths = [];

    const files = await fs.promises.readdir(dir);

    for(const file of files) {
        const fullPath = path.join(dir, file);
        const fileStat = await fs.promises.stat(fullPath);

        if (fileStat.isFile()) {
            if(file.endsWith('.template.html')) {
                filePaths.push(fullPath);
            }
        }
        else if (fileStat.isDirectory()) {
            filePaths.push(...(await loadAllFilesFromDir(fullPath)));
        }
    }

    return filePaths;
};

const compileTemplates = async () => {
    const files = await loadAllFilesFromDir(pathToTemplates);

    let templates = {};

    for(const file of files) {
        const templateString = await fs.promises.readFile(file, 'utf-8');
        templates[file] = templateString.trim();
    }

    const jsonString = JSON.stringify(templates, null, 4);
    const resultTemplateString = templateCacheString.replace('{{templates}}', jsonString);

    await fs.promises.writeFile(pathToTemplateCache, resultTemplateString, 'utf-8');
};





compileTemplates()
    .then(function () {
        console.log('Finished Compiling Templates');
    })
    .catch(function (reason) {
        console.error(reason);
        console.log('\n\n');
        console.error('Something went wrong');
    });