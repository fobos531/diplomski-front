import { View, Text, Image } from 'react-native';

import { getProfileUrl } from 'app/misc/imgHelpers';
import { Cast } from 'app/features/movies/types';

interface CastMemberProps {
  member: Cast;
}

const CastMember: React.FC<CastMemberProps> = ({ member }) => {
  return (
    <View>
      <Image source={{ uri: getProfileUrl(member.profile_path, 'h632') }} style={{ width: 150, height: 150, borderRadius: 10 }} />
      <Text>{member.name || member.original_name}</Text>
    </View>
  );
};

export default CastMember;
