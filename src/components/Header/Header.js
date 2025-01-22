import react from "react";
import styles from "./Header.module.css";
import { Row, Col } from "react-bootstrap";

function Header() {
  return (
    <Row>
      <Col>
        <div className={styles.ahead}>Todos</div>
      </Col>
    </Row>
  );
}

export default Header;
