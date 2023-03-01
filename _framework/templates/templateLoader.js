import {templateCache} from './templateCache.js';

const loadTemplate = (path) => {
    if(!templateCache.get(path)) {
        throw new Error(`This template does not exist: "${path}"`);
    }

    const tmp = document.createElement('template');
    tmp.innerHTML = templateCache.get(path);
    return tmp.innerHTML;
};

export const TemplateLoader = {
    loadTemplate: loadTemplate
};