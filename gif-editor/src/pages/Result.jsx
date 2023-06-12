import {Container, Row, Col, Stack } from 'react-bootstrap'

const Result = ({gif, onButtonClick}) => {
    return (
        <Container fluid className='vh-70'>
            <Row className='h-100'>
            <Col>
                <Stack>
                <h3 className='mx-5 my-3'>Result</h3>
                <a
                    href={gif}
                    download="gif-file"
                    target="_blank"
                    rel="noreferrer"
                >Click to download</a>
                
                </Stack>
            </Col>
            <Col sm={8}>
                <div className='shaded-bg h-100 m-3 d-flex justify-content-center'>
                    <div className='player-wrapper'>
                    <img src={gif} width="100%" height='auto' />
                    </div>
                </div>
            </Col>
            </Row>
            <Row>
                <Col>
                    <a onClick={() => onButtonClick(2)}>Previous</a>
                </Col>
                <Col sm={8}></Col>
            </Row>
        </Container>
    )
}

export default Result;