/*
Component Registry Objects:
- tag
- componentObject
 */

function registerComponent(tag, component) {
    if (this._registry[tag]) {
        console.log('this component is already registered');
        return;
    }

    this._registry[tag] = component;
}

function getComponent(tag) {
    return this._registry[tag];
}

function getTags() {
    let tags = [];
    for(const tag in this._registry) {
        tags.push(tag);
    }
    return tags;
}

export const ComponentRegistry = {
    _registry: {},
    registerComponent: registerComponent,
    getComponent: getComponent,
    getTags: getTags
};