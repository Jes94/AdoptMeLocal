import { Col, Row } from "react-bootstrap";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./HomePage.css";

const HomePage = ({ getResults }) => {


  return (
    <div className="container">
      <Row>
      <Col></Col>
      <Col>
      <img src="https://i.imgur.com/5u4ATsD.jpeg" alt="Cat and Dog" className="mainImg"></img>
      </Col>
      <Col></Col>
      </Row>
      <Row>
        <SearchBar searchParams={getResults}/>
      </Row>
    </div>
  );
};

export default HomePage;
