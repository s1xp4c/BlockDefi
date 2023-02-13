import React, { useEffect, useRef } from 'react';
import jazzicon from '@metamask/jazzicon';

interface MetaMaskAvatarProps {
  account: string;
}

const MetaMaskAvatar: React.FC<MetaMaskAvatarProps> = ({ account }) => {
  // eslint-disable-next-line no-undef
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = avatarRef.current;
    if (element && account) {
      const addr = account.slice(2, 10);
      const seed = parseInt(addr, 16);
      const icon = jazzicon(40, seed);
      if (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      element.appendChild(icon);
    }
  }, [account, avatarRef]);

  return <div ref={avatarRef} />;
};

export default MetaMaskAvatar;
