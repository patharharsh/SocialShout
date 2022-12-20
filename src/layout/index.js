import Header from "./header";
import Container from 'react-bootstrap/Container';

const Layout = (props) => {
    return (
        <>
            <Header userData={props.userData} />
            <main>
                <Container>
                    {props.children}
                </Container>
            </main>
        </>
    )
}

export default Layout;