class Observable  {
    constructor(dataObj) {
        this.emitter = {};
        this.observeData(dataObj);
        this.dataObj = dataObj;
    }

    get data() {
        return this.dataObj;
    }

    subscribe(property, eventHandler) {
        if (!this.emitter[property]) {
            this.emitter[property] = [];
        }

        this.emitter[property].push(eventHandler);
    }

    emit(event) {
        if (!this.emitter[event] || this.emitter[event].length === 0) {
            return;
        }

        this.emitter[event].forEach(eventHandler => eventHandler());
    }

    makeReactive(object, key) {
        let value = object[key];

        Object.defineProperty(object, key, {
            get() {
                return value;
            },
            set: newValue => {
                value = newValue;
                this.emit(key);
            },
        });
    }

    observeData(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                this.makeReactive(obj, key)
            }
        }
        this.parseDom(document.body, obj);
    }

    syncNode(node, obj, property) {
        node.textContent = obj[property];
        this.subscribe(property, () => node.textContent = obj[property] || '');
    }


    parseDom(DOMTree, observable) {
        const nodes = DOMTree.querySelectorAll('[s-text]');
        nodes.forEach(node => this.syncNode(node, observable, node.attributes['s-text'].value))
    }
}


let App = new Observable ({
    firstName: 'Yurii',
    lastName: 'Sholom',
    age: 25,
    title: 'Game of Thrones',
});

function updateText(property, event) {
    App.data[property] = event.target.value;
}













