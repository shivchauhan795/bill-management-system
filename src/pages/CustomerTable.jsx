import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Trash from '../icons/Trash';
import View from '../icons/View';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Button from '../components/Button';


const CustomerTable = () => {
    const [bills, setBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const storedBills = JSON.parse(localStorage.getItem('bills')) || [];
        setBills(storedBills);
    }, []);

    const openModal = (bill) => {
        setSelectedBill(bill);
        setIsOpen(true);
    };

    const closeModal = () => {
        setSelectedBill(null);
        setIsOpen(false);
    };

    const deleteBill = (id) => {
        const updatedBills = bills.filter((bill) => bill.id !== id);
        setBills(updatedBills);
        localStorage.setItem('bills', JSON.stringify(updatedBills));
    };

    const downloadBill = (bill) => {
        if (!bill) return;

        const doc = new jsPDF();


        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("Dainty Consultants", 20, 20);
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text("India, India", 20, 30);
        doc.text("Email: contact@dainty.com | Phone: +91-1234567890", 20, 40);
        doc.line(20, 45, 190, 45);


        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text(`Invoice`, 160, 55);
        doc.setFontSize(10);
        doc.text(`Invoice No: #${bill.id}`, 160, 65);
        doc.text(`Date: ${bill.billingDate}`, 160, 75);


        doc.setFontSize(12);
        doc.text("Bill To:", 20, 65);
        doc.setFontSize(10);
        doc.text(`Client Name: ${bill.clientName}`, 20, 75);
        doc.text(`Contact: ${bill.contactDetails}`, 20, 85);
        doc.text(`Address: ${bill.address}`, 20, 95);


        const tableColumn = ["Item", "Quantity", "Price (₹)", "Total (₹)"];
        const tableRows = [];

        tableRows.push([
            "Products",
            bill.productQuantity,
            bill.billingPrice / bill.productQuantity,
            bill.billingPrice
        ]);


        autoTable(doc, {
            startY: 110,
            head: [tableColumn],
            body: tableRows,
            theme: "grid",
            styles: { fontSize: 10 },
            headStyles: { fillColor: [22, 160, 133] },
        });


        doc.setFontSize(12);
        doc.text(`Subtotal: ₹${bill.billingPrice}`, 140, doc.lastAutoTable.finalY + 10);
        doc.text(`GST (18%): ₹${(bill.billingPrice * 0.18).toFixed(2)}`, 140, doc.lastAutoTable.finalY + 20);
        doc.setFont("helvetica", "bold");
        doc.text(`Total Payable: ₹${(bill.billingPrice * 1.18).toFixed(2)}`, 140, doc.lastAutoTable.finalY + 30);


        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.text("Thank you for your business!", 20, doc.lastAutoTable.finalY + 50);
        doc.text("For any queries, contact: contact@dainty.com", 20, doc.lastAutoTable.finalY + 60);


        doc.save(`Invoice_${bill.clientName}.pdf`);
    };
    return (
        <div className='h-screen mt-10 p-5'>
            <div className='text-2xl uppercase font-bold mb-5'>Customer Bills</div>
            <table className='w-full border-collapse border border-gray-300'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='border p-2'>Client Name</th>
                        <th className='border p-2'>Product Quantity</th>
                        <th className='border p-2'>Billing Date</th>
                        <th className='border p-2'>Contact Details</th>
                        <th className='border p-2'>Address</th>
                        <th className='border p-2'>Billing Price (₹)</th>
                        <th className='border p-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((bill) => (
                        <tr key={bill.id} className="border">
                            <td className="border p-2">{bill.clientName}</td>
                            <td className="border p-2">{bill.productQuantity}</td>
                            <td className="border p-2">{bill.billingDate}</td>
                            <td className="border p-2">{bill.contactDetails}</td>
                            <td className="border p-2">{bill.address}</td>
                            <td className="border p-2">{bill.billingPrice}</td>
                            <td className=" p-2 flex gap-2 justify-center items-center">
                                <div className='cursor-pointer' onClick={() => openModal(bill)}>
                                    <View size="size-5" />
                                </div>
                                <div className='cursor-pointer' onClick={() => deleteBill(bill.id)}>
                                    <Trash size="size-5" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isOpen && selectedBill && (
                <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Bill Details</h2>
                        <p><strong>Client Name:</strong> {selectedBill.clientName}</p>
                        <p><strong>Product Quantity:</strong> {selectedBill.productQuantity}</p>
                        <p><strong>Billing Date:</strong> {selectedBill.billingDate}</p>
                        <p><strong>Contact Details:</strong> {selectedBill.contactDetails}</p>
                        <p><strong>Address:</strong> {selectedBill.address}</p>
                        <p><strong>Billing Price:</strong> ₹{selectedBill.billingPrice}</p>
                        <br />
                        <p><strong>Products:</strong></p>
                        <br />
                        <ul className='flex flex-wrap gap-3 rounded-2xl'>
                            {selectedBill.products.map((product) => (
                                <li className='border w-fit p-2 rounded-2xl flex flex-col gap-1' key={product.id}>
                                    <p><strong>Name:</strong> {product.name}</p>
                                    <p><strong>Quantity:</strong> {product.quantity}</p>
                                    <p><strong>Price:</strong> ₹{product.price}</p>
                                    <p><strong>Total:</strong> ₹{product.total}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 flex justify-between">
                            <Button text={"Download Bill"} onClick={() => downloadBill(selectedBill)} type={"success"} />
                            <Button text={"Close"} onClick={closeModal} type={"alert"} />
                        </div>
                    </div>
                </Dialog>
            )}
        </div>
    );
};

export default CustomerTable;
