import {Component} from "../../_framework/components/Component.js";
import {ComponentRegistry} from "../../_framework/components/registry.js";

const model = {
    counter: 0,
    multi: 3
};

const controller = {
    clickMe: clickMe,
    getMulti: getMulti
}

function clickMe() {
    this.model.counter += 1;
}

function getMulti() {
    return this.model.multi;
}

const HelloWorldComponent = {
    __proto__: Component,
    templateURL: 'templates/helloworld.template.html',
    model: model,
    controller: controller
}

ComponentRegistry.registerComponent('main-container', HelloWorldComponent);