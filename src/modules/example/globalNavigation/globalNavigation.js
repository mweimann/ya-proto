import { LightningElement, api } from 'lwc';

export default class GlobalNavigation extends LightningElement {
    @api currentRoute;

    get productCatalogClass() {
        return this.currentRoute === 'product-catalog' ? 'slds-context-bar__item slds-is-active' : 'slds-context-bar__item';
    }
    get accountClass() {
        return this.currentRoute === 'account' ? 'slds-context-bar__item slds-is-active' : 'slds-context-bar__item';
    }
    get contractsClass() {
        return this.currentRoute === 'contracts' ? 'slds-context-bar__item slds-is-active' : 'slds-context-bar__item';
    }
    get invoicesClass() {
        return this.currentRoute === 'invoices' ? 'slds-context-bar__item slds-is-active' : 'slds-context-bar__item';
    }
} 