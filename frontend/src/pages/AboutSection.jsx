import { Typography, Button, Divider } from "antd";
import { InfoCircleOutlined, BookOutlined, SafetyOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Title level={2}>
        <InfoCircleOutlined /> About BookLend
      </Title>

      <Paragraph>
        <strong>BookLend</strong> is a community platform that makes it easy for people to borrow and lend books in their local area. 
        Our goal is to help book lovers share knowledge, save money, and find books they want quickly. 
        Everyone in the community can post books, browse available books, or request a book they need.
      </Paragraph>

      <Divider />

      <Title level={4}>
        <BookOutlined /> How It Works
      </Title>

      <Paragraph>
        Users can list books they want to lend, including details like the title, author, location, and price per week (if they want to suggest one). 
        Borrowers can send requests for these books. Each request has a status: Pending, Accepted, Rejected, Cancelled, or Returned. 
      </Paragraph>

      <Paragraph>
        Even if a book is already listed and borrowed on the platform, borrowers can request the same book from other users. 
        Users can also request book that is not listed in plateform from same location users.
        This way, more people can share the same book, and lenders have the option to respond if they have it.
      </Paragraph>

      <Paragraph>
        Once a request is accepted, the borrower can see the lender's contact information to arrange pickup safely. 
        After returning the book, the request can be marked as Returned.
      </Paragraph>

      <Divider />

      <Title level={4}>
        <SafetyOutlined /> Safety & Payments
      </Title>

      <Paragraph>
        BookLend does not handle payments. Any price shown is only for reference. 
        Borrowers and lenders agree on payment and book exchange directly, usually in person or via phone or WhatsApp.
      </Paragraph>

      <Paragraph>
        To improve trust, lenders are encouraged to provide accurate book details. 
        Adding the the ISBN number in particular page of book as borrower asks is optional but can help borrowers verify the correct edition before borrowing.
      </Paragraph>

      <div className="mt-8">
        <Link to="/">
          <Button>← Back to Home Page</Button>
        </Link>
      </div>
    </div>
  );
};

export default About;