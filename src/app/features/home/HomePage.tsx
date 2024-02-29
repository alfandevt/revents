import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react';

function HomePage() {
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container>
        <Header as={'h1'} inverted>
          <Image
            size='massive'
            src='/logo.png'
            alt='logo'
            style={{ marginBotom: 12 }}
          />
        </Header>
        <Button size='huge' inverted as={Link} to='/events'>
          Get started
          <Icon name='caret right' inverted />
        </Button>
      </Container>
    </Segment>
  );
}

export default HomePage;
