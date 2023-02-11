import {Framework} from "../_framework/main.js";

const mainContainer = {
    tag: 'main-container',
    templateURL: 'templates/helloworld.template.html',
    clickMe: function () {
        this.model.counter += 1;
        console.log(this.model.counter);
    }
};


Framework.registerComponent(mainContainer);