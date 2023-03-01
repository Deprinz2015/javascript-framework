console.log('Loading Templates...');

const fs = require('fs');
const path = require('path');

const pathToTemplates = 'templates';
const pathToTemplateCache = 'src/templates.js';

const templateCacheString = 'import {templateCache} from "../_framework/templates/templateCache.js";\n\n';
const templatePutString = 'templateCache.put({{url}}, {{template}});\n\n';

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
    let resultTemplateString = templateCacheString;

    for(let key in templates) {
        resultTemplateString += templatePutString
            .replace('{{url}}', JSON.stringify(key))
            .replace('{{template}}', JSON.stringify(templates[key]));
    }

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