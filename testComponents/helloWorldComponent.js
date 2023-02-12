import {Component} from "../_framework/components/Component.js";
import {ComponentRegistry} from "../_framework/components/registry.js";

function clickMe() {
    console.log(++this.counter);
}

const HelloWorldComponent = {
    __proto__: Component,
    templateURL: 'templates/helloworld.template.html',
    counter: 0,
    clickMe: clickMe
}

ComponentRegistry.registerComponent('main-container', HelloWorldComponent);