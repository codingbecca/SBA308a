//a helper object that will allow us to format number as currency
export const priceFormat = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})