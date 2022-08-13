import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import * as Avatar from '@radix-ui/react-avatar';
import { useRouter } from 'next/router';

const TopBar: React.FunctionComponent = () => {
  const { data } = useSession();
  const router = useRouter();

  const handleOpenWatchList = () => {
    router.push('/watchlist');
  };

  const handleOpenSearch = () => {
    router.push('/search');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {data && (
        <div>
          <button onClick={handleOpenWatchList}>My watchlist</button>
          <button onClick={handleOpenSearch}>Search</button>
        </div>
      )}

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
};

export default TopBar;
