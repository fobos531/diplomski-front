import { Title } from 'app/features/titles/types';
import Link from 'next/link';
import { Card, Col, Row, Button, Text } from '@nextui-org/react';
import { getPosterUrl } from 'app/misc/imgHelpers';

interface TitleCardProps {
  title: Title;
  type: 'movie' | 'tv';
}

const TitleCard: React.FC<TitleCardProps> = ({ title, type }) => {
  const url = `/${type}/${title.id}`;

  return (
    <Link href={url} passHref>
      <div className="m-1 relative hover:cursor-pointer">
        <Card css={{ h: '300px', w: '200px', flexShrink: 0 }}>
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              src={getPosterUrl(title.poster_path, 'w780')}
              objectFit="cover"
              width="100%"
              height="100%"
              alt={title.original_name}
            />
          </Card.Body>
          <Card.Footer
            isBlurred
            css={{
              position: 'absolute',
              bgBlur: '#0f111466',
              borderTop: '$borderWeights$light solid $gray800',
              bottom: 0,
              zIndex: 1,
            }}>
            <Row justify="center">
              <Link href={url} passHref>
                <Text css={{ color: '#94f9f0', textAlign: 'center' }} size={12} weight="bold">
                  {title.title || title.original_title || title.original_name}
                </Text>
              </Link>
            </Row>
          </Card.Footer>
        </Card>
      </div>
    </Link>
  );
};

export default TitleCard;
