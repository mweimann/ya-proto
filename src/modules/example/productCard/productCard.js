import { LightningElement, api, track } from 'lwc';
export default class ProductCard extends LightningElement {
    @api icon;
    @api name;
    @api price;
    @api frequency;
    @api description;
    @api capabilities = [];
    @api capabilitiesLink;
    @api bundles = [];
    @api tags = [];
    @track quantity = 0;
    @api relationType = 'bundles';
    @api relatedProducts = [];

    relationTypeTitles = {
        bundles: 'Available as part of:',
        canBeUsedFor: 'Can be used for:',
        availableWith: 'Available with:',
        requiredProducts: 'Required products:',
        // Add more as needed
    };

    get relatedProductsTitle() {
        return this.relationTypeTitles[this.relationType] || 'Related Products:';
    }

    get hasRelatedProducts() {
        return Array.isArray(this.relatedProducts) && this.relatedProducts.length > 0;
    }

    get displayedRelatedProducts() {
        return (this.relatedProducts || []).slice(0, 6);
    }
    get relatedProductsColumn1() {
        return this.displayedRelatedProducts.slice(0, 3);
    }
    get relatedProductsColumn2() {
        return this.displayedRelatedProducts.slice(3, 6);
    }

    get isAddDisabled() {
        return this.quantity === 0;
    }
    get isMinusDisabled() {
        return this.quantity === 0;
    }
    get minusCircleColor() {
        return this.isMinusDisabled ? "#e0e0e0" : "#145de8";
    }
    get minusIconColor() {
        return this.isMinusDisabled ? "#b0b0b0" : "#fff";
    }

    increment() {
        this.quantity += 1;
    }

    decrement() {
        if (this.quantity > 0) {
            this.quantity -= 1;
        }
    }

    get hasBundles() {
        return Array.isArray(this.bundles) && this.bundles.length > 0;
    }

    get displayedBundles() {
        return (this.bundles || []).slice(0, 6);
    }
    get bundlesColumn1() {
        return this.displayedBundles.slice(0, 3);
    }
    get bundlesColumn2() {
        return this.displayedBundles.slice(3, 6);
    }

    get addButtonText() {
        if ((this.tags || []).includes('Upgrades')) return 'Upgrade';
        if ((this.tags || []).includes('Owned')) return 'Add Licences';
        return 'Add to Cart';
    }
} 