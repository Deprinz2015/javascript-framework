export const templateCache = {
    templates: {},
    put: function (url, template) {
        this.templates[url] = template;
    },
    get: function (url) {
        return this.templates[url];
    }
};