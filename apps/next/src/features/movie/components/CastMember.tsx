import React from 'react';

import { Card, Col, Row, Button, Text } from '@nextui-org/react';
import { Cast } from 'app/features/movies/types';
import { getProfileUrl } from 'app/misc/imgHelpers';

interface CastMemberProps {
  member: Cast;
}

const CastMember: React.FC<CastMemberProps> = ({ member }) => {
  return (
    <Card css={{ h: '250px', w: '150px', flexShrink: 0, marginRight: 20 }}>
      <Card.Body css={{ p: 0 }}>
        <Card.Image src={getProfileUrl(member.profile_path + '', 'h632')} objectFit="cover" width="100%" height="100%" alt={member.name} />
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
        <Row>
          <Col>
            <Row justify="center">
              <Button flat auto rounded css={{ color: '#94f9f0', bg: '#94f9f026' }}>
                <Text css={{ color: 'inherit' }} size={12} weight="bold">
                  {member.name}
                </Text>
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default CastMember;
