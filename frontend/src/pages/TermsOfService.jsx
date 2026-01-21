import { Typography, Button, Divider } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const TermsOfService = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Title level={2}>
        <FileTextOutlined /> Terms of Service
      </Title>

      <Paragraph>
        By using BookLend, you agree to follow these rules. BookLend is only for sharing books in your community. 
        Users are expected to behave responsibly and treat others respectfully.
      </Paragraph>

      <Divider />

      <Title level={4}>Using the Platform</Title>

      <Paragraph>
        Users can post books they own to lend and request books from others. Borrowers can cancel requests while they are pending, and lenders have the right to accept or reject requests.
      </Paragraph>

      <Paragraph>
        Even if a book is already listed, borrowers can request it from other users nearby who may have it. This makes it easier for everyone to share the same book in the community.
      </Paragraph>

      <Divider />

      <Title level={4}>Payments & Book Exchange</Title>

      <Paragraph>
        BookLend does not process payments. Any price listed is only for reference. 
        Borrowers and lenders handle payments and exchange directly, usually in person or via phone/WhatsApp.
      </Paragraph>

      <Divider />

      <Title level={4}>User Responsibility</Title>

      <Paragraph>
        Users should provide correct book information and return borrowed books in good condition. 
        Users are encouraged to meet in safe places and communicate politely. 
        BookLend is not responsible for lost, damaged books or disputes between users.
      </Paragraph>

      <div className="mt-8">
        <Link to="/">
          <Button>← Back to Home Page</Button>
        </Link>
      </div>
    </div>
  );
};

export default TermsOfService;
