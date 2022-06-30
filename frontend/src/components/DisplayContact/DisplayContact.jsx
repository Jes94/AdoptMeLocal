// Bootstrap Imports
import { Offcanvas } from "react-bootstrap"
// React Imports
import { useState } from "react"


const DisplayContact = (props) => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    return (
        <>
        <button onClick={handleShow} className="btn btn-primary btn-sm" style={{width:'10rem',textAlign:'center', alignContent:'right', background:"#008000", border: "#008000"}}>Contact Info</button>
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Contact Information</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>{props.contact}</Offcanvas.Body>
        </Offcanvas>
        </>
    );
}

export default DisplayContact;