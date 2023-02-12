import {TemplateLoader} from "../templates/templateLoader.js";
import {renderDoc} from "../renderDoc.js";

function render(el) {
    if (!this.template) {
        if(!this.templateURL) {
            console.error('No Template URL given, cannot Render Component');
            return;
        }

        this.template = TemplateLoader.loadTemplate(this.templateURL);
    }

    const component = this;

    el.innerHTML = this.template;

    registerClicks.call(this, el);

    renderDoc(el);

    if (component.postRender && typeof component.postRender === "function") {
        component.postRender();
    }
}

function registerClicks(el) {
    const component = this;

    const clickElements = el.querySelectorAll('[click]');
    for (const clickEl of clickElements) {
        const clickFn = clickEl.getAttribute('click');
        if (component[clickFn] && typeof component[clickFn] === "function") {
            clickEl.addEventListener('click', () => {
                component[clickFn].call(component)
            });
        }
    }
}

export const Component = {
    model: null,
    templateURL: null,
    element: null,
    render: render
};