import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Navigation extends NavigationMixin(LightningElement) {
    connectedCallback() {
        // Define the navigation items
        this.navigationItems = [
            {
                label: 'Home',
                name: 'home',
                type: 'standard__webPage',
                attributes: {
                    url: '/'
                }
            },
            {
                label: 'About',
                name: 'about',
                type: 'standard__webPage',
                attributes: {
                    url: '/about'
                }
            }
        ];
    }

    handleNavigation(event) {
        const { name } = event.target.dataset;
        const item = this.navigationItems.find(item => item.name === name);
        
        if (item) {
            this[NavigationMixin.Navigate](item);
        }
    }
} 