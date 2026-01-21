import { Typography, Button, Divider } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Title level={2}>
        <LockOutlined /> Privacy Policy
      </Title>

      <Paragraph>
        BookLend respects your privacy. We only collect information needed to run the platform, such as your profile, book listings, and request history.
      </Paragraph>

      <Divider />

      <Title level={4}>Contact Information</Title>

      <Paragraph>
        Your phone number or WhatsApp is hidden until a borrow request is accepted. 
        Once accepted, you can contact the lender or borrower to arrange book pickup safely.
      </Paragraph>

      <Divider />

      <Title level={4}>Payments & Security</Title>

      <Paragraph>
        BookLend does not collect any payment details, bank information, or card info. 
        All user data is stored securely and is only visible to authorized users.
      </Paragraph>

      <Divider />

      <Title level={4}>Sharing Books Safely</Title>

      <Paragraph>
        Users are encouraged to provide accurate book details and meet in safe places. 
        Borrowers can request books even if they are already listed, and lenders can respond if they have the book in their location.
      </Paragraph>

      <div className="mt-8">
        <Link to="/">
          <Button>← Back to Home Page</Button>
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
