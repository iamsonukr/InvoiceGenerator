import React, { useState } from 'react';
import Invoice from './pages/Invoice/Invoice';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    sellerDetails: {
      name: '',
      address: '',
      pan: '',
      gst: '',
    },
    placeOfSupply: '',
    billingDetails: {
      name: '',
      address: '',
      stateCode: '',
    },
    shippingDetails: {
      name: '',
      address: '',
      stateCode: '',
    },
    orderDetails: {
      orderNo: '',
      orderDate: '',
    },
    invoiceDetails: {
      invoiceNo: '',
      invoiceDate: '',
    },
    reverseCharge: false,
    items: [],
    logo: '',
    signature: '',
  });

  const [item, setItem] = useState({
    description: '',
    unitPrice: 0,
    quantity: 1,
    discount: 0,
    taxRate: 0,
  });

  const [showInvoice, setShowInvoice] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const path = name.split('.');
    if (path.length === 2) {
      setFormData({
        ...formData,
        [path[0]]: {
          ...formData[path[0]],
          [path[1]]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, item],
    });
    setItem({
      description: '',
      unitPrice: 0,
      quantity: 1,
      discount: 0,
      taxRate: 0,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowInvoice(true);
  };

  return (
    <div className="App">
      <h1>Invoice Generator</h1>
      {!showInvoice && (
        <form onSubmit={handleSubmit}>
          <h2>Seller Details</h2>
          <input
            type="text"
            name="sellerDetails.name"
            placeholder="Seller Name"
            value={formData.sellerDetails.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="sellerDetails.address"
            placeholder="Seller Address"
            value={formData.sellerDetails.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="sellerDetails.pan"
            placeholder="PAN No."
            value={formData.sellerDetails.pan}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="sellerDetails.gst"
            placeholder="GST Registration No."
            value={formData.sellerDetails.gst}
            onChange={handleChange}
            required
          />

          <h2>Place of Supply</h2>
          <input
            type="text"
            name="placeOfSupply"
            placeholder="Place of Supply"
            value={formData.placeOfSupply}
            onChange={handleChange}
            required
          />

          <h2>Billing Details</h2>
          <input
            type="text"
            name="billingDetails.name"
            placeholder="Billing Name"
            value={formData.billingDetails.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="billingDetails.address"
            placeholder="Billing Address"
            value={formData.billingDetails.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="billingDetails.stateCode"
            placeholder="Billing State/UT Code"
            value={formData.billingDetails.stateCode}
            onChange={handleChange}
            required
          />

          <h2>Shipping Details</h2>
          <input
            type="text"
            name="shippingDetails.name"
            placeholder="Shipping Name"
            value={formData.shippingDetails.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="shippingDetails.address"
            placeholder="Shipping Address"
            value={formData.shippingDetails.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="shippingDetails.stateCode"
            placeholder="Shipping State/UT Code"
            value={formData.shippingDetails.stateCode}
            onChange={handleChange}
            required
          />

          <h2>Order Details</h2>
          <input
            type="text"
            name="orderDetails.orderNo"
            placeholder="Order Number"
            value={formData.orderDetails.orderNo}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="orderDetails.orderDate"
            placeholder="Order Date"
            value={formData.orderDetails.orderDate}
            onChange={handleChange}
            required
          />

          <h2>Invoice Details</h2>
          <input
            type="text"
            name="invoiceDetails.invoiceNo"
            placeholder="Invoice Number"
            value={formData.invoiceDetails.invoiceNo}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="invoiceDetails.invoiceDate"
            placeholder="Invoice Date"
            value={formData.invoiceDetails.invoiceDate}
            onChange={handleChange}
            required
          />

          <h2>Reverse Charge</h2>
          <select
            name="reverseCharge"
            value={formData.reverseCharge}
            onChange={handleChange}
            required
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>

          <h2>Items</h2>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={item.description}
            onChange={handleItemChange}
            required
          />
          <input
            type="number"
            name="unitPrice"
            placeholder="Unit Price"
            value={item.unitPrice}
            onChange={handleItemChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={item.quantity}
            onChange={handleItemChange}
            required
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount"
            value={item.discount}
            onChange={handleItemChange}
          />
          <input
            type="number"
            name="taxRate"
            placeholder="Tax Rate (%)"
            value={item.taxRate}
            onChange={handleItemChange}
            required
          />
          <button type="button" onClick={addItem}>
            Add Item
          </button>

          <h2>Logo and Signature</h2>
          <input
            type="text"
            name="logo"
            placeholder="Logo URL"
            value={formData.logo}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="signature"
            placeholder="Signature Image URL"
            value={formData.signature}
            onChange={handleChange}
            required
          />

          <button type="submit">Generate Invoice</button>
        </form>
      )}

      {showInvoice && (
        <Invoice
          logo={formData.logo}
          sellerDetails={formData.sellerDetails}
          placeOfSupply={formData.placeOfSupply}
          billingDetails={formData.billingDetails}
          shippingDetails={formData.shippingDetails}
          orderDetails={formData.orderDetails}
          invoiceDetails={formData.invoiceDetails}
          reverseCharge={formData.reverseCharge}
          items={formData.items}
          signature={formData.signature}
        />
      )}
    </div>
  );
}

export default App;
