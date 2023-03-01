import {templateCache} from "../_framework/templates/templateCache.js";

templateCache.put("templates/helloworld.template.html", "<h1>Hello World</h1>\n\n<button click=\"clickMe\">Press me</button>\n\n<h3>Model.counter: {{model.counter * model.multi}}</h3>\n<h3>Model.multi: {{controller.getMulti()}}</h3>");

templateCache.put("templates/testTemplates/hellounderworld.template.html", "<h1>Hello Underworld</h1>");

templateCache.put("templates/testTemplates2/further/hellocloud.template.html", "<h1>Hello Cloud</h1>");

templateCache.put("templates/testTemplates2/further/hellosea.template.html", "<h1>Hello Sea</h1>");

templateCache.put("templates/testTemplates2/hellosky.template.html", "<h1>Hello Sky</h1>");

