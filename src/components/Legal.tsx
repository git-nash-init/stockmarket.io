import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : theme.palette.background.paper,
  boxShadow: theme.palette.mode === 'light' ? '0 2px 8px rgba(0,0,0,0.1)' : theme.shadows[2],
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  paddingBottom: theme.spacing(1),
}));

const SubSectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

const ContentText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.7,
  marginBottom: theme.spacing(2),
  textAlign: 'justify',
}));

const Legal: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            color: 'primary.main',
            mb: 2 
          }}
        >
          Legal Information
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          Please review our legal policies and terms of service
        </Typography>
      </Box>

      {/* Privacy Policy Section */}
      <StyledPaper id="privacy-policy">
        <SectionTitle variant="h4" component="h2">
          Privacy Policy
        </SectionTitle>
        
        <SubSectionTitle variant="h6">Information We Collect</SubSectionTitle>
        <ContentText variant="body1">
          We collect information you provide directly to us, such as when you create an account, 
          subscribe to our services, or contact us for support. This may include your name, 
          email address, and other contact information.
        </ContentText>

        <SubSectionTitle variant="h6">How We Use Your Information</SubSectionTitle>
        <ContentText variant="body1">
          We use the information we collect to provide, maintain, and improve our services, 
          process transactions, send you technical notices and support messages, and communicate 
          with you about products, services, and promotional offers.
        </ContentText>

        <SubSectionTitle variant="h6">Data Protection</SubSectionTitle>
        <ContentText variant="body1">
          We implement appropriate technical and organizational security measures to protect 
          your personal information against unauthorized access, alteration, disclosure, or 
          destruction. We regularly review our security practices and update them as necessary.
        </ContentText>

        <SubSectionTitle variant="h6">Cookie Policy</SubSectionTitle>
        <ContentText variant="body1">
          Our website uses cookies to enhance your browsing experience and provide personalized 
          content. You can control cookie settings through your browser preferences. By continuing 
          to use our site, you consent to our use of cookies as described in this policy.
        </ContentText>
      </StyledPaper>

      <Divider sx={{ my: 4 }} />

      {/* Terms of Service Section */}
      <StyledPaper id="terms-of-service">
        <SectionTitle variant="h4" component="h2">
          Terms of Service
        </SectionTitle>

        <SubSectionTitle variant="h6">Acceptance of Terms</SubSectionTitle>
        <ContentText variant="body1">
          By accessing and using TheStockMarket platform, you accept and agree to be bound by 
          the terms and provision of this agreement. If you do not agree to abide by the above, 
          please do not use this service.
        </ContentText>

        <SubSectionTitle variant="h6">Service Description</SubSectionTitle>
        <ContentText variant="body1">
          TheStockMarket provides financial market analysis, stock information, and educational 
          content. Our services are intended for informational purposes only and should not be 
          considered as financial advice for investment decisions.
        </ContentText>

        <SubSectionTitle variant="h6">User Responsibilities</SubSectionTitle>
        <ContentText variant="body1">
          Users are responsible for maintaining the confidentiality of their account information 
          and for all activities that occur under their account. You agree to immediately notify 
          us of any unauthorized use of your account or any other breach of security.
        </ContentText>

        <SubSectionTitle variant="h6">Prohibited Activities</SubSectionTitle>
        <ContentText variant="body1">
          You may not use our service for any illegal or unauthorized purpose. You must not, 
          in the use of the service, violate any laws in your jurisdiction including but not 
          limited to copyright laws, trademark laws, or securities regulations.
        </ContentText>

        <SubSectionTitle variant="h6">Termination</SubSectionTitle>
        <ContentText variant="body1">
          We may terminate or suspend your account and bar access to the service immediately, 
          without prior notice or liability, under our sole discretion, for any reason whatsoever 
          and without limitation, including but not limited to a breach of the Terms.
        </ContentText>
      </StyledPaper>

      <Divider sx={{ my: 4 }} />

      {/* Disclaimer Section */}
      <StyledPaper id="disclaimer">
        <SectionTitle variant="h4" component="h2">
          Disclaimer
        </SectionTitle>

        <SubSectionTitle variant="h6">Investment Risk Warning</SubSectionTitle>
        <ContentText variant="body1">
          All investments carry risk and past performance is not indicative of future results. 
          The content on this platform is for educational and informational purposes only and 
          should not be construed as professional investment advice.
        </ContentText>

        <SubSectionTitle variant="h6">No Financial Advice</SubSectionTitle>
        <ContentText variant="body1">
          TheStockMarket does not provide personalized financial advice. All information, 
          analysis, and content provided on this platform are general in nature and are not 
          tailored to your specific financial situation or investment objectives.
        </ContentText>

        <SubSectionTitle variant="h6">Accuracy of Information</SubSectionTitle>
        <ContentText variant="body1">
          While we strive to provide accurate and up-to-date information, we make no representations 
          or warranties of any kind, express or implied, about the completeness, accuracy, 
          reliability, suitability, or availability of the information contained on the platform.
        </ContentText>

        <SubSectionTitle variant="h6">Market Volatility</SubSectionTitle>
        <ContentText variant="body1">
          Financial markets are inherently volatile and unpredictable. Stock prices can fluctuate 
          significantly based on various factors including economic conditions, company performance, 
          and market sentiment. Always conduct your own research before making investment decisions.
        </ContentText>

        <SubSectionTitle variant="h6">Professional Consultation</SubSectionTitle>
        <ContentText variant="body1">
          Before making any investment decisions, we strongly recommend consulting with qualified 
          financial advisors, accountants, or other professionals who can provide personalized 
          advice based on your individual circumstances and risk tolerance.
        </ContentText>
      </StyledPaper>

      <Divider sx={{ my: 4 }} />

      {/* Refund Policy Section */}
      <StyledPaper id="refund-policy">
        <SectionTitle variant="h4" component="h2">
          Refund Policy
        </SectionTitle>

        <SubSectionTitle variant="h6">Subscription Refunds</SubSectionTitle>
        <ContentText variant="body1">
          We offer a 30-day money-back guarantee for all premium subscriptions. If you are not 
          satisfied with our service within the first 30 days of your subscription, you may 
          request a full refund.
        </ContentText>

        <SubSectionTitle variant="h6">How to Request a Refund</SubSectionTitle>
        <ContentText variant="body1">
          To request a refund, please contact our customer support team within 30 days of your 
          initial purchase. Include your account information and reason for the refund request. 
          We will process approved refunds within 5-10 business days.
        </ContentText>

        <SubSectionTitle variant="h6">Non-Refundable Items</SubSectionTitle>
        <ContentText variant="body1">
          Certain services and purchases are non-refundable, including one-time consultation 
          fees, custom analysis reports that have been delivered, and subscriptions that have 
          been active for more than 30 days.
        </ContentText>

        <SubSectionTitle variant="h6">Partial Refunds</SubSectionTitle>
        <ContentText variant="body1">
          In some cases, we may offer partial refunds at our discretion. This typically applies 
          to situations where there have been service interruptions or technical issues that 
          have significantly impacted your user experience.
        </ContentText>

        <SubSectionTitle variant="h6">Processing Time</SubSectionTitle>
        <ContentText variant="body1">
          Approved refunds will be processed using the original payment method. Depending on 
          your bank or credit card company, it may take additional time for the refund to 
          appear in your account.
        </ContentText>

        <SubSectionTitle variant="h6">Contact Information</SubSectionTitle>
        <ContentText variant="body1">
          For any refund requests or questions about our refund policy, please contact our 
          support team through the Contact Us page or email us directly. We are committed to 
          providing excellent customer service and will work with you to resolve any issues.
        </ContentText>
      </StyledPaper>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          For questions about these policies, please contact us through our Contact page.
        </Typography>
      </Box>
    </Container>
  );
};

export default Legal;
