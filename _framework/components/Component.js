import {TemplateLoader} from "../templates/templateLoader.js";
import {renderDoc} from "../renderDoc.js";
import {eventListeners} from "../eventListeners/eventListeners.js";

function render() {
    if (!this.template) {
        if(!this.templateURL) {
            console.error('No Template URL given, cannot Render Component');
            return;
        }

        this.template = TemplateLoader.loadTemplate(this.templateURL);
    }

    const component = this;

    this.element.innerHTML = this.template;

    replaceBindings.call(this, this.element);

    registerListeners.call(this, this.element);

    renderDoc(this.element);

    if (component.postRender && typeof component.postRender === "function") {
        component.postRender.call(this);
    }
}

function replaceBindings(el) {
    const component = this;
    const model = component.model;
    const controller = component.controller;

    const bindingIndices = [...el.innerHTML.matchAll(new RegExp(/\{\{.*}}/, 'gi'))];

    for(const match of bindingIndices) {
        const expression = match[0]
            .replace('{{', '')
            .replace(new RegExp('}}$'), '');

        const funcExpression = new Function('model', 'controller', `"use strict"; return (${expression});`);

        el.innerHTML = el.innerHTML.replace(match[0], funcExpression(model, controller));
    }
}

function registerListeners(el) {
    const component = this;

    if(!component.controller) {
        return;
    }

    for(const listener of eventListeners) {
        const elements = el.querySelectorAll(`[${listener.attribute}]`);
        for(const element of elements) {
            const fnName = element.getAttribute(listener.attribute);
            if(component.controller[fnName] && typeof component.controller[fnName] === 'function'){
                const fn = component.controller[fnName];
                element.addEventListener(listener.event, fn);
            }
        }
    }
}

export const Component = {
    model: {},
    templateURL: null,
    element: null,
    render: render
};