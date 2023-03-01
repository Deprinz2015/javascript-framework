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
    for (const tag in this._registry) {
        tags.push(tag);
    }
    return tags;
}

function createNewComponentObject(tag, el) {
    const component = this._registry[tag];

    let createdComponent = Object.create(component, {
        model: {
            value: component.model,
            writable: true
        },
        element: {
            value: el
        }
    });

    const proxyHandler = {
        set(target, prop) {
            const response = Reflect.set(...arguments);
            createdComponent.render();
            return response;
        }
    };

    createdComponent.model = new Proxy(Object.create(component.model), proxyHandler);

    console.log(createdComponent);

    return createdComponent;
}

export const ComponentRegistry = {
    _registry: {},
    registerComponent: registerComponent,
    getComponent: getComponent,
    getTags: getTags,
    createNewComponentObject: createNewComponentObject
};