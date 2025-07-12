import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const initialFormState = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    airFryerCost: '',
    spidrPin: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'spidrPin') {
      const digits = value.replace(/\D/g, '');
      const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1-').slice(0, 19);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare clean data
    const cleanData = {
      ...formData,
      phone: formData.phone.replace(/\D/g, ''),
      spidrPin: formData.spidrPin.replace(/-/g, '')
    };
    
    console.log('Form submitted:', cleanData);
    
    // Reset form and disable button
    setFormData(initialFormState);
    setIsSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="spidr-form">
      <h2 className="form-title">Contact Information</h2>
      
      <div className="form-group">
        <label htmlFor="firstName" className="form-label">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="form-input"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="form-input"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="phone" className="form-label">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="form-input"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(123) 456-7890"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="airFryerCost" className="form-label">Guess the Air Fryer's Cost ($)</label>
        <input
          type="number"
          id="airFryerCost"
          name="airFryerCost"
          className="form-input"
          value={formData.airFryerCost}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="spidrPin" className="form-label">Spidr PIN</label>
        <input
          type="text"
          id="spidrPin"
          name="spidrPin"
          className="form-input"
          value={formData.spidrPin}
          onChange={handleChange}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          maxLength={19}
          required
        />
      </div>
      
      <button 
        type="submit" 
        className="submit-btn"
        disabled={isSubmitted}
      >
        {isSubmitted ? 'Submitted' : 'Submit'}
      </button>
    </form>
  );
};

export default Form;