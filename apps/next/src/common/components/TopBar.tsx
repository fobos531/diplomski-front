import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const TopBar: React.FunctionComponent = () => {
  const { data } = useSession();

  return (
    <>
      {data ? (
        <>
          <div>{data?.user?.name}</div>
          {data.user?.image && <Image src={data.user?.image} width={100} height={100} />}
        </>
      ) : null}
    </>
  );

  return <></>;
};

export default TopBar;
