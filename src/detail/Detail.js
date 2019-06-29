// Detail.js
import React, { Component } from "react";
import "./Detail.css";
import products from "./products.json";
// These are the web components that we will be using here
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Table";
import "@ui5/webcomponents/dist/TableColumn";
import "@ui5/webcomponents/dist/TableRow";
import "@ui5/webcomponents/dist/TableCell";
import "@ui5/webcomponents/dist/Badge";
import "@ui5/webcomponents/dist/Dialog";
import "@ui5/webcomponents/dist/Popover";
import "@ui5/webcomponents/dist/Select";
import "@ui5/webcomponents/dist/DatePicker";
import "@ui5/webcomponents/dist/TextArea";

import Header from '../header/Header';
import FilterBar from '../filterbar/FilterBar';


const getBadgeType = type => {
	switch (type) {
		case "In-Stock":
			return "8";
		case "Deterioating":
			return "2";
		case "Re-Stock":
			return "1";
		default:
			return "0";
	}
}

class Detail extends Component {

    state = {
        products: [...products],
        filteredProducts: [...products],
        filterType: "all",
    };

	constructor(props) {
        super(props);
        
        
    }

    applyFilter(filterType) {
        const products = this.filterItems(filterType, this.state.products);
    
        this.setState({
            ...this.state,
            filteredProducts: products,
            filterType: filterType,
        });
    }
    
    filterItems(filterType, items) {
        let filteredProducts = [];
    
        switch (filterType) {
            case "all":
                filteredProducts = items;
                break;
            case "noPerishable":
                filteredProducts = this.filterNoPerishableProducts(items);
                break;
            case "perishable":
                filteredProducts = this.filterPerishableProducts(items);
                break;
            case "alerts":
                filteredProducts = this.filterAlertProducts(items);
                break;
            default:
                filteredProducts = items;
                break;
        }
    
        return filteredProducts;
    }
    
    filterPerishableProducts(items) {
        return items.filter(product => product.perishable);
    }
    
    filterNoPerishableProducts(items) {
        return items.filter(product => !product.perishable);
    }
    
    filterAlertProducts(items) {
        return items.filter(product => (product.status === "Deterioating" || product.status === "Re-Stock"));
    }

    filterVisibleItemsByText(text) {
        const filteredByType = this.filterItems(this.state.filterType, this.state.products); // filter items based on current filter type
        const items = filteredByType.filter(item => item.name.toLowerCase().startsWith(text)); // filter items based on starting text
    
        this.setState({
            ...this.state,
            filteredProducts: items, // update state of filtered items
        });
    }
    
    filter(value) {
        this.filterVisibleItemsByText(value);
    }

    get statusCriteriaMapping() { // a getter for mapping statuses to numbers (suitable for sorting)
        return {
            "In-Stock": 0,
            "Re-Stock": 1,
            "Deterioating": 2,
        }
    }

    sortDesc() {
        const sortedItems = this.state.filteredProducts.sort((a, b) => {
            if (this.statusCriteriaMapping[a.status] > this.statusCriteriaMapping[b.status]) {
                return -1;
            } else if (this.statusCriteriaMapping[a.status] < this.statusCriteriaMapping[b.status]) {
                return 1;
            }
    
            return 0;
        });
    
        this.setState({
            ...this.state,
            filteredProducts: sortedItems,
        });
    }
    
    sortAsc() {
        const sortedItems = this.state.filteredProducts.sort((a, b) => {
            if (this.statusCriteriaMapping[a.status] > this.statusCriteriaMapping[b.status]) {
                return 1;
            } else if (this.statusCriteriaMapping[a.status] < this.statusCriteriaMapping[b.status]) {
                return -1;
            }
    
            return 0;
        });
    
        this.setState({
            ...this.state,
            filteredProducts: sortedItems,
        });
    }

    createProduct(entry) {
        const newItems = [...this.state.products, { key: (this.state.products.length + 1), ...entry }];
    
        this.setState({
            ...this.state,
            products: newItems,
            filteredProducts: this.filterItems(this.state.filterType, newItems),
        });
    }

	render() {
		return (
            
		<div className="detail-page">
            <Header 
            products={this.state.products} // "All Items" tab additional text
            nonPerishableCount={this.filterNoPerishableProducts(this.state.products).length} // "None-Perishable" tab additional text
            perishableCount={this.filterPerishableProducts(this.state.products).length} // "Perishable" tab additional text
            alertCount={this.filterAlertProducts(this.state.products).length} // "Alerts" tab additional text
            tabPress={this.applyFilter.bind(this)} // Event listener when a tab is pressed
            />
            
			<main className="detail-page-content">
            <FilterBar 
            	createProduct={this.createProduct.bind(this)}
            filter={this.filter.bind(this)}
	sortAsc={this.sortAsc.bind(this)}
	sortDesc={this.sortDesc.bind(this)}
    />
				<ui5-table>
					<ui5-table-column slot="columns">
						<ui5-label
							class="table-column-header-content"
						>
							Product
						</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label
							class="table-column-header-content"
						>
							Price
						</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label
							class="table-column-header-content"
						>
							Location
						</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label
							class="table-column-header-content"
						>
							Order
						 date</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label
							class="table-column-header-content"
						>
							Image
						</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label
							class="table-column
							header-content
						"
					>
							Status
						</ui5-label>
					</ui5-table-column>

					{
						this.state.filteredProducts.map((item) =>
							<ui5-table-row key={item.key}>
								<ui5-table-cell>
									<ui5-label class="table-cell-content"><b>{item.name}</b></ui5-label>
								</ui5-table-cell>
								<ui5-table-cell>
									<span className="table-cell-content">{item.price}</span>
								</ui5-table-cell>
								<ui5-table-cell>
									<span className="table-cell-content">{item.location}</span>
								</ui5-table-cell>
								<ui5-table-cell>
									<span className="table-cell-content">{item.orderDate}</span>
								</ui5-table-cell>
								<ui5-table-cell>
									<span className="table-cell-content">
										<img alt="" className="image-cell" src={process.env.PUBLIC_URL + item.img} />
									</span>
								</ui5-table-cell>
								<ui5-table-cell>
									<span className="table-cell-content">
                                        <ui5-badge color-scheme={getBadgeType(item.status)}>
	{item.status}
</ui5-badge>
									</span>
								</ui5-table-cell>
							</ui5-table-row>)
					}
				</ui5-table>
			</main>
		</div>
	)
	}
}

export default Detail;