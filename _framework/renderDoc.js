import {ComponentRegistry} from "./components/registry.js";

// TODO Rendering

export const renderDoc = (doc) => {
    for(const tag of ComponentRegistry.getTags()) {
        const component = ComponentRegistry.getComponent(tag);
        if(!component) {
            continue;
        }

        const elements = doc.getElementsByTagName(tag);
        for (const el of elements) {
            let comp = el.my_comp ? el.my_comp : ComponentRegistry.createNewComponentObject(tag, el);
            el.my_comp = comp;
            comp.render();
        }
    }
}