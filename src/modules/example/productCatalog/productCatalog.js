import { LightningElement, track } from 'lwc';

export default class ProductCatalog extends LightningElement {
    @track allProducts = [];
    @track products = [];
    @track selectedFilter = 'All';
    @track searchQuery = '';

    connectedCallback() {
        document.title = 'Product Catalog';
        fetch('/public/assets/products.json')
            .then(response => response.json())
            .then(data => {
                this.allProducts = data;
                this.applyFilters();
            })
            .catch(error => {
                this.allProducts = [];
                this.products = [];
            });
    }

    handleFilterChange(event) {
        this.selectedFilter = event.detail.filter;
        this.applyFilters();
    }

    handleSearchChange(event) {
        this.searchQuery = event.detail.query;
        this.applyFilters();
    }

    applyFilters() {
        let filtered = this.allProducts;
        // Filter by selected filter (tag/category)
        if (this.selectedFilter && this.selectedFilter !== 'All') {
            filtered = filtered.filter(product =>
                (product.tags || []).some(tag => tag.toLowerCase().includes(this.selectedFilter.toLowerCase()))
            );
        }
        // Filter by search query (name, tag, description, capabilities)
        if (this.searchQuery && this.searchQuery.trim() !== '') {
            const q = this.searchQuery.trim().toLowerCase();
            filtered = filtered.filter(product => {
                return (
                    (product.name && product.name.toLowerCase().includes(q)) ||
                    (product.description && product.description.toLowerCase().includes(q)) ||
                    (product.tags && product.tags.some(tag => tag.toLowerCase().includes(q))) ||
                    (product.capabilities && product.capabilities.some(cap => cap.toLowerCase().includes(q)))
                );
            });
        }
        this.products = filtered;
    }
} 