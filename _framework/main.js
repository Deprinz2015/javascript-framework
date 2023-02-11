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

            const clickElements = el.querySelectorAll('[click]');

            for (const clickEl of clickElements) {
                const clickFn = clickEl.getAttribute('click');
                if (component[clickFn] && typeof component[clickFn] === "function") {
                    clickEl.addEventListener('onclick', component[clickFn]);
                }
            }
        }

        if (component.postRender && typeof component.postRender === "function") {
            component.postRender();
        }
    };

    if (!component.model) {
        component.model = {};
    }

    const proxyHandler = {
        set(obj, prop, value) {
            obj.render();
            return Reflect.set(...arguments);
        }
    };

    const proxyComponent = new Proxy(component, proxyHandler);

    components.push(proxyComponent);

    render();
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
//setInterval(render, 2000);