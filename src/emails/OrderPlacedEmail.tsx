// this file used for react email. 

import React from 'react';
import { Html, Body, Container, Heading, Text, Hr } from '@react-email/components';

const OrderPlacedEmail = ({ order }) => {
  console.log('Rendering OrderPlacedEmail with:', order); 
  console.log('Order Items:', order.items); 
  order.items.forEach(item => {
    console.log(`Item ID: ${item.id}`);
    console.log(`Item Name: ${item.title}`);
    console.log(`Item Quantity: ${item.quantity}`);
  });
  
  return (
    <Html>
      <Body style={{ backgroundColor: '#f4f4f4', fontFamily: 'Arial, sans-serif', color: '#333333', padding: '20px' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Heading style={{ textAlign: 'center', color: '#ff6f61', marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>Order Confirmation</Heading>
          <Text style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px' }}>Dear Customer,</Text>
          <Text style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px' }}>Thank you for your order! Below are the details:</Text>
          
          <Container style={{ padding: '20px', backgroundColor: '#fafafa', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e0e0e0' }}>
            <Text style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '16px' }}>Order ID: <span style={{ fontWeight: 'normal', color: '#555555' }}>{order.id}</span></Text>
            <Text style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '16px' }}>Status: <span style={{ fontWeight: 'normal', color: '#555555' }}>{order.status}</span></Text>
            <Hr style={{ border: 'none', borderTop: '1px solid #e0e4e8', margin: '20px 0' }} />
            <Text style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '16px' }}>Items:</Text>
            <ul style={{ paddingLeft: '20px', marginBottom: '20px', listStyleType: 'circle' }}>
              {order.items.map((item) => (
                  <li key={item.id} style={{ marginBottom: '15px' }}>
                    <Text style={{ color: '#ff6f61', fontWeight: 'bold', fontSize: '16px' }}>{item.title}</Text>
                    <Text style={{ display: 'block', fontSize: '14px', color: '#777777' }}>Quantity: {item.quantity}</Text>
                  </li>
              ))}
            </ul>
          </Container>

          <Text style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px' }}>Best regards,</Text>
          <Text style={{ fontSize: '18px', lineHeight: '1.6', color: '#ff6f61', fontWeight: 'bold' }}>THE TRENDZZ</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderPlacedEmail;
