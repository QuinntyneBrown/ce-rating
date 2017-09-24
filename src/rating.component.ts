import { BehaviorSubject } from "rxjs/BehaviorSubject";

const template = document.createElement("template");
const html = require("./rating.component.html");
const css = require("./rating.component.css");

export class RatingComponent extends HTMLElement {
    constructor() {
        super();
    }

    public rating$: BehaviorSubject<number> = new BehaviorSubject(0);

    static get observedAttributes () {
        return [
            "rating"
        ];
    }

    async connectedCallback() {
    
        template.innerHTML = `<style>${css}</style>${html}`; 

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  

        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'rating');
        this._bind();
    }

    private async _bind() {
        this.rating$.subscribe(rating => {
            for (let i = 1; i <= 5; i++) {
                let imageElement = document.createElement("img");
                imageElement.src = rating >= i
                    ? "src/ic_star_black_18px.svg"
                    : "src/ic_star_border_black_18px.svg";                
                this.shadowRoot.appendChild(imageElement);
            }
        });
    }
    
    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "rating":
                this.rating$.next(Number(newValue));
                break;
        }
    }
}

customElements.define(`ce-rating`,RatingComponent);
