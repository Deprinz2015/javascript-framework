import {TemplateLoader} from "./templates/templateLoader.js";

/*
Component has:
- tag-name (only valid in kebab-case)
- template-url
*/

let components = [];

const registerComponent = (component) => {
    component.render = () => {
        if (!component.templateURL) {
            return;
        }

        const elements = document.getElementsByTagName(component.tag);
        for (const el of elements) {
            el.innerHTML = TemplateLoader.loadTemplate(component.templateURL);
        }

        if(component.postRender && typeof component.postRender === "function") {
            component.postRender();
        }
    };



    components.push(component);
};


const render = async () => {
    for (const component of components) {
        component.render();
    }
};

export const Framework = {
    registerComponent: registerComponent
};

// TODO Only render when changes happen
setInterval(render, 100);