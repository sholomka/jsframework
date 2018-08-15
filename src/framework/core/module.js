export class Module {
    constructor(config) {
        this.components = config.components;
        this.bootstrapComponent = config.bootstrap;
    }

    start() {
        this.bootstrapComponent.render();
        this.initComponents();
    }

    initComponents() {
        this.components.forEach(c => c.render());
    }
}