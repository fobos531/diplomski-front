import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as Avatar from '@radix-ui/react-avatar';

const TopBar: React.FunctionComponent = () => {
  const { data } = useSession();

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ display: 'flex', flexDirection: 'row', marginRight: 10 }}>
        {data ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center', marginRight: 10 }}>
              <div style={{ marginRight: 0 }}>{data?.user?.name}</div>
              <button onClick={() => signOut()}>Sign out</button>
            </div>
            {data.user?.image && (
              <Avatar.Root>
                <Avatar.Image src={data?.user?.image} style={{ borderRadius: '20px', width: 80 }} />
                <Avatar.Fallback />
              </Avatar.Root>
            )}
          </>
        ) : (
          <button onClick={() => signIn()}>Sign In</button>
        )}
      </div>
    </div>
  );

  return <></>;
};

export default TopBar;