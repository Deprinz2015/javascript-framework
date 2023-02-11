import {templates} from './templateCache.js';

const loadTemplate = (path) => {
    if(!templates[path]) {
        throw new Error(`This template does not exist: "${path}"`);
    }

    const tmp = document.createElement('template');
    tmp.innerHTML = templates[path];
    return tmp.innerHTML;
};

export const TemplateLoader = {
    loadTemplate: loadTemplate
};