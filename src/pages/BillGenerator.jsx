import React, { useRef, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Trash from '../icons/Trash';
import Plus from '../icons/Plus';
import toast, { Toaster } from 'react-hot-toast';

const BillGenerator = () => {
    const customerNameRef = useRef(null);
    const customerNumberRef = useRef(null);
    const billingDateRef = useRef(null);
    const customerAddressRef = useRef(null);

    const [products, setProducts] = useState([
        { id: Date.now(), name: '', quantity: '', price: '', total: 0 }
    ]);

    const addProductRow = () => {
        setProducts([...products, { id: Date.now(), name: '', quantity: '', price: '', total: 0 }]);
        toast.success('Product Row added successfully');
    };

    const removeProductRow = (id) => {
        setProducts(products.filter(product => product.id !== id));
        toast.success('Product Row removed successfully');
    };

    const handleProductChange = (id, field, value) => {
        setProducts(products.map(product =>
            product.id === id
                ? {
                    ...product,
                    [field]: value,
                    total: field === 'quantity' || field === 'price'
                        ? (parseFloat(value || 0) * parseFloat(product[field === 'quantity' ? 'price' : 'quantity'] || 0)) || 0
                        : product.total
                }
                : product
        ));
    };

    const subtotal = products.reduce((sum, product) => sum + product.total, 0);
    const tax = subtotal * 0.18;
    const totalBill = subtotal + tax;

    const generateBill = () => {
        const bill = {
            id: Date.now(),
            clientName: customerNameRef.current.value,
            contactDetails: customerNumberRef.current.value,
            billingDate: billingDateRef.current.value,
            address: customerAddressRef.current.value,
            products,
            productQuantity: products.reduce((sum, p) => sum + Number(p.quantity), 0),
            billingPrice: totalBill.toFixed(2),
        };

        // Retrieve existing bills and update localStorage
        const existingBills = JSON.parse(localStorage.getItem('bills')) || [];
        localStorage.setItem('bills', JSON.stringify([...existingBills, bill]));

        toast.success("Bill Generated and Stored Successfully");

        // Clear form after storing the bill
        customerNameRef.current.value = '';
        customerNumberRef.current.value = '';
        billingDateRef.current.value = '';
        customerAddressRef.current.value = '';
        setProducts([{ id: Date.now(), name: '', quantity: '', price: '', total: 0 }]);
    };

    return (
        <div className='h-screen mt-10 flex flex-col gap-5 pt-8'>
            <Toaster position="top-center" reverseOrder={false} />
            <div className='text-2xl uppercase font-bold flex px-3 pt-3'>
                Generate Bill
            </div>
            <div className='flex gap-4 px-3'>
                <div className='w-1/3'>
                    <Input ref={customerNameRef} type="text" placeholder="Customer Name" label="Customer Name" />
                </div>
                <div className='w-1/3'>
                    <Input ref={customerNumberRef} type="number" placeholder="Customer Number" label="Customer Number" />
                </div>
                <div className='w-1/3'>
                    <Input ref={billingDateRef} type="date" placeholder="Billing Date" label="Billing Date" />
                </div>
            </div>
            <div className='px-3'>
                <Input ref={customerAddressRef} type="text" placeholder="Customer Address" label="Customer Address" />
            </div>

            <div className='text-2xl uppercase font-bold flex px-3 pt-3'>
                Products
            </div>

            {products.map((product, index) => (
                <div key={product.id} className='flex gap-4 px-3 items-center '>
                    <div className='w-1/4'>
                        <Input
                            type="text"
                            placeholder="Product Name"
                            label="Product Name"
                            value={product.name}
                            onChange={(e) => handleProductChange(product.id, 'name', e.target.value)}
                        />
                    </div>
                    <div className='w-1/4'>
                        <Input
                            type="number"
                            placeholder="Product Quantity"
                            label="Product Quantity"
                            value={product.quantity}
                            onChange={(e) => handleProductChange(product.id, 'quantity', e.target.value)}
                        />
                    </div>
                    <div className='w-1/4'>
                        <Input
                            type="number"
                            placeholder="Product Price (in ₹)"
                            label="Product Price (in ₹)"
                            value={product.price}
                            onChange={(e) => handleProductChange(product.id, 'price', e.target.value)}
                        />
                    </div>
                    <div className='w-1/4'>
                        <Input
                            type="number"
                            placeholder="Total Price (in ₹)"
                            label="Total Price (in ₹)"
                            value={product.total}
                            disabled={true}
                        />
                    </div>
                    {index > 0 && (
                        <button
                            className="flex justify-center mt-4 cursor-pointer"
                            onClick={() => removeProductRow(product.id)}
                        >
                            <Trash size={"size-7"} />
                        </button>
                    )}
                </div>
            ))}

            <div className='flex px-3 pt-3'>
                <Button text="Add Fields" onClick={addProductRow} startIcon={<Plus size={"size-5"} />} />
            </div>

            {/* Total Bill Section */}
            <div className='flex flex-col px-3 py-3 border-t mt-5'>
                <div className='flex justify-between text-lg font-semibold'>
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-lg font-semibold'>
                    <span>Tax (18%):</span>
                    <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-xl font-bold border-t pt-2 mt-2'>
                    <span>Total Bill:</span>
                    <span>₹{totalBill.toFixed(2)}</span>
                </div>
            </div>
            <div className='pb-10 flex justify-center '>
                <Button type={"success"} text={"Generate Bill"} onClick={generateBill} />
            </div>
        </div>
    );
};

export default BillGenerator;
