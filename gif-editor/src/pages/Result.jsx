import {Container, Row, Col, Stack } from 'react-bootstrap'

const Result = ({gif}) => {
    return (
        <Container fluid>
            <Row>
            <Col>
                <h3>Result</h3>
                <a
                    href={gif}
                    download="gif-file"
                    target="_blank"
                    rel="noreferrer"
                >Click to download</a>
            </Col>
            <Col sm={8}>
                <div className='shaded-bg h-100 m-3 d-flex justify-content-center'>
                    <div className='player-wrapper'>
                    <img src={gif} width="100%" height='auto' />
                    </div>
                </div>
            </Col>
            </Row>
        </Container>
    )
}

export default Result;