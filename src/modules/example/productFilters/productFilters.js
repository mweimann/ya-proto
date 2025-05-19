import { LightningElement, api } from 'lwc';

export default class ProductFilters extends LightningElement {
    @api selectedFilter = 'All';
    @api searchQuery = '';

    filters = [
        { label: 'All', value: 'All', icon: '/public/assets/product-icons/all-filter-icon.svg' },
        { label: 'Agentforce', value: 'Agentforce', icon: '/public/assets/product-icons/agentforce-filter-icon.svg' },
        { label: 'Sales', value: 'Sales', icon: '/public/assets/product-icons/sales-filter-icon.svg' },
        { label: 'Service', value: 'Service', icon: '/public/assets/product-icons/service-filter-icon.svg' },
        { label: 'Marketing', value: 'Marketing', icon: '/public/assets/product-icons/marketing-filter-icon.svg' },
        { label: 'Commerce', value: 'Commerce', icon: '/public/assets/product-icons/commerce-filter-icon.svg' },
        { label: 'Data', value: 'Data', icon: '/public/assets/product-icons/data-filter-icon.svg' },
        { label: 'Slack', value: 'Slack', icon: '/public/assets/product-icons/slack-filter-icon.svg' },
        { label: 'Credits', value: 'Credits', icon: '/public/assets/product-icons/platform-filter-icon.svg' },
        { label: 'CRM', value: 'CRM', icon: '/public/assets/product-icons/sales-filter-icon.svg' },
        { label: 'Storage', value: 'Storage', icon: '/public/assets/product-icons/platform-filter-icon.svg' }
    ];

    get filtersWithSelected() {
        return this.filters.map(filter => ({
            ...filter,
            selected: filter.value === this.selectedFilter,
            showIcon: filter.value !== 'All'
        }));
    }

    handleFilterClick(event) {
        const value = event.currentTarget.dataset.value;
        this.selectedFilter = value;
        this.dispatchEvent(new CustomEvent('filterchange', { detail: { filter: value } }));
    }

    handleSearchInput(event) {
        this.searchQuery = event.target.value;
        this.dispatchEvent(new CustomEvent('searchchange', { detail: { query: this.searchQuery } }));
    }

    isSelected(filter) {
        return filter.value === this.selectedFilter;
    }
} 