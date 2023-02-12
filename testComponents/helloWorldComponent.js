import {Component} from "../_framework/components/Component.js";
import {ComponentRegistry} from "../_framework/components/registry.js";

let model = {
    counter: 0
};

function clickMe() {
    this.model.counter += 1;
}

function postRender() {
    console.log('I just got rendered!');
    console.log('Counter is at: ' + this.model.counter);
}

const HelloWorldComponent = {
    __proto__: Component,
    templateURL: 'templates/helloworld.template.html',
    model: model,
    clickMe: clickMe,
    postRender: postRender
}

ComponentRegistry.registerComponent('main-container', HelloWorldComponent);