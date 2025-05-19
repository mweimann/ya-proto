import { LightningElement } from 'lwc';
import Navigation from 'example/navigation';

export default class HelloWorldApp extends LightningElement {
    connectedCallback() {
        document.title = 'Your Account';
    }
}
