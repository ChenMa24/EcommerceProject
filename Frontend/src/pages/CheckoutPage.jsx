import './checkout-header.css';
import './CheckoutPage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function CheckoutPage({ cartItems }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);

    useEffect(() => {
        axios.get('/api/delivery-options')
            .then((response) => {
                setDeliveryOptions(response.data);
            })
            .catch((error) => {
                console.error('Error fetching delivery options:', error);
            });
    }, []);

    // Helper function to get delivery option by ID
    const getDeliveryOption = (deliveryOptionId) => {
        return deliveryOptions.find(option => option.id === deliveryOptionId) || {};
    };

    return (
        <>
            <title>Checkout</title>

            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link"
                            href="/">{cartItems.reduce((total, item) => total + item.quantity, 0)} items</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {cartItems.map((cartItem) => {
                            const currentDeliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
                            return (
                                <div key={cartItem.id} className="cart-item-container">
                                    <div className="delivery-date">
                                        Delivery date: Tuesday, June 21
                                    </div>

                                    <div className="cart-item-details-grid">
                                        <img className="product-image"
                                            src={cartItem.product.image} />

                                        <div className="cart-item-details">
                                            <div className="product-name">
                                                {cartItem.product.name}
                                            </div>
                                            <div className="product-price">
                                                ${cartItem.product.priceCents / 100}
                                            </div>
                                            <div className="product-quantity">
                                                <span>
                                                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                                </span>
                                                <span className="update-quantity-link link-primary">
                                                    Update
                                                </span>
                                                <span className="delete-quantity-link link-primary">
                                                    Delete
                                                </span>
                                            </div>
                                        </div>

                                        <div className="delivery-options">
                                            <div className="delivery-options-title">
                                                Choose a delivery option:
                                            </div>
                                            {deliveryOptions.map((option) => (
                                                <div key={option.id} className="delivery-option">
                                                    <input
                                                        type="radio"
                                                        checked={cartItem.deliveryOptionId === option.id}
                                                        className="delivery-option-input"
                                                        name={`delivery-option-${cartItem.id}`}
                                                    />
                                                    <div>
                                                        <div className="delivery-option-date">
                                                            {option.deliveryDays} days
                                                        </div>
                                                        <div className="delivery-option-price">
                                                            {option.priceCents === 0 ? 'FREE' : `$${(option.priceCents / 100).toFixed(2)}`}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>

                        <div className="payment-summary-row">
                            <div>Items ({cartItems.reduce((total, item) => total + item.quantity, 0)}):</div>
                            <div className="payment-summary-money">${(cartItems.reduce((total, item) => total + item.product.priceCents * item.quantity, 0) / 100).toFixed(2)}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">${(cartItems.reduce((total, item) => {
                                const deliveryOption = getDeliveryOption(item.deliveryOptionId);
                                return total + (deliveryOption.priceCents || 0);
                            }, 0) / 100).toFixed(2)}</div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">${(cartItems.reduce((total, item) => {
                                const deliveryOption = getDeliveryOption(item.deliveryOptionId);
                                return total + item.product.priceCents * item.quantity + (deliveryOption.priceCents || 0);
                            }, 0) / 100).toFixed(2)}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">${(cartItems.reduce((total, item) => {
                                const deliveryOption = getDeliveryOption(item.deliveryOptionId);
                                return total + item.product.priceCents * item.quantity + (deliveryOption.priceCents || 0);
                            }, 0) / 100 * 0.1).toFixed(2)}</div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">${(cartItems.reduce((total, item) => {
                                const deliveryOption = getDeliveryOption(item.deliveryOptionId);
                                return total + item.product.priceCents * item.quantity + (deliveryOption.priceCents || 0);
                            }, 0) / 100 * 1.1).toFixed(2)}</div>
                        </div>

                        <button className="place-order-button button-primary">
                            Place your order
                        </button>
                    </div>
                </div>
            </div>
        </>)
}