import { NextPage } from 'next';

import Link from 'next/link';

import { Button, Container, Text } from '@nextui-org/react';

const Home: NextPage = () => {
  return (
    <Container display="flex" justify="center" alignItems="center" className="h-screen">
      <div className="flex flex-col place-content-center">
        <Text
          h1
          size={60}
          css={{
            textGradient: '45deg, $blue600 -20%, $pink600 50%',
            textAlign: 'center',
          }}
          weight="bold">
          CineSimul
        </Text>
        <Text
          h1
          size={60}
          css={{
            textGradient: '45deg, $yellow600 -20%, $red600 100%',
            textAlign: 'center',
          }}
          weight="bold">
          Lose yourself in movies.
        </Text>
        <Link href="/home" passHref>
          <Button color="primary" shadow auto>
            <Text>Let's go</Text>
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default Home;
