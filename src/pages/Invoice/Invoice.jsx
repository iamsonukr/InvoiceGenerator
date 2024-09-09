// Invoice.js
import React from 'react';
import './Invoice.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';




const Invoice = ({
  logo,
  sellerDetails,
  placeOfSupply,
  billingDetails,
  shippingDetails,
  orderDetails,
  invoiceDetails,
  reverseCharge,
  items,
  signature,
}) => {
  const calculateAmounts = (item) => {
    const netAmount = item.unitPrice * item.quantity - (item.discount || 0);
    const taxAmount = netAmount * item.taxRate / 100;
    const totalAmount = netAmount + taxAmount;
    return { netAmount, taxAmount, totalAmount };
  };

  const handleDownload = () => {
    const input = document.querySelector('.invoice-container');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('invoice.pdf');
    });
  };
  
 

  const totalAmounts = items.reduce(
    (totals, item) => {
      const { netAmount, taxAmount } = calculateAmounts(item);
      totals.net += netAmount;
      totals.tax += taxAmount;
      totals.total += netAmount + taxAmount;
      return totals;
    },
    { net: 0, tax: 0, total: 0 }
  );

  const amountInWords = (amount) => {
    // Function to convert number to words, implement as per your requirement
    return 'One Thousand One Hundred And Ninety-Five only';
  };

  return (
    <div className="invoice-container">
      <header className="invoice-header">
        <img src={logo} alt="Company Logo" className="invoice-logo" />
        <h2>Tax Invoice/Bill of Supply/Cash Memo</h2>
      </header>

      <div className="invoice-section">
        <div className="invoice-seller">
          <p><strong>Sold By :</strong></p>
          <p>{sellerDetails.name}</p>
          <p>{sellerDetails.address}</p>
          <p>PAN No: {sellerDetails.pan}</p>
          <p>GST Registration No: {sellerDetails.gst}</p>
        </div>
        <div className="invoice-bill-ship">
          <div>
            <p><strong>Billing Address :</strong></p>
            <p>{billingDetails.name}</p>
            <p>{billingDetails.address}</p>
            <p>State/UT Code: {billingDetails.stateCode}</p>
          </div>
          <div>
            <p><strong>Shipping Address :</strong></p>
            <p>{shippingDetails.name}</p>
            <p>{shippingDetails.address}</p>
            <p>State/UT Code: {shippingDetails.stateCode}</p>
          </div>
        </div>
      </div>

      <div className="invoice-details">
        <p><strong>Order Number :</strong> {orderDetails.orderNo}</p>
        <p><strong>Order Date :</strong> {orderDetails.orderDate}</p>
        <p><strong>Invoice Number :</strong> {invoiceDetails.invoiceNo}</p>
        <p><strong>Invoice Date :</strong> {invoiceDetails.invoiceDate}</p>
        <p><strong>Reverse Charge :</strong> {reverseCharge ? 'Yes' : 'No'}</p>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Unit Price</th>
            <th>Qty</th>
            <th>Net Amount</th>
            <th>Tax Rate</th>
            <th>Tax Amount</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const { netAmount, taxAmount, totalAmount } = calculateAmounts(item);
            return (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.unitPrice}</td>
                <td>{item.quantity}</td>
                <td>{netAmount}</td>
                <td>{item.taxRate}%</td>
                <td>{taxAmount}</td>
                <td>{totalAmount}</td>
              </tr>
            );
          })}
          <tr className="invoice-totals">
            <td colSpan="3">Total</td>
            <td>{totalAmounts.net}</td>
            <td></td>
            <td>{totalAmounts.tax}</td>
            <td>{totalAmounts.total}</td>
          </tr>
        </tbody>
      </table>

      <div className="invoice-footer">
        <p><strong>Amount in Words :</strong> {amountInWords(totalAmounts.total)}</p>
        <div className="invoice-signature">
          <p>For {sellerDetails.name}</p>
          <img src={signature} alt="Signature" className="signature-img" />
          <p>Authorized Signatory</p>
        </div>
      </div>
      <button onClick={handleDownload}>Download PDF</button>;
    </div>
  );
};

export default Invoice;
