//customize our template -----> this file used for react email. 

import React from 'react';
import { Html, Body, Container, Heading, Text, Link } from '@react-email/components';

const InviteEmail = ({ token }) => {
  const inviteLink = `https://yourapp.com/invite?token=${token}`;

  return (
    <Html>
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#ffffff' }}>
          <Heading style={{ textAlign: 'center', color: '#333333' }}>You're Invited!</Heading>
          <Text>Dear User,</Text>
          <Text>You have been invited to join our platform. Please click the link below to accept the invitation:</Text>
          <Link href={inviteLink}>Accept Invitation</Link>
          <Text>If you did not expect this email, you can ignore it.</Text>
          <Text>Best regards,</Text>
          <Text>The Trendzz</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default InviteEmail;