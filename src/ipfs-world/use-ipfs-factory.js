// https://github.com/ipfs/js-ipfs/blob/master/examples/browser-create-react-app/src/hooks/use-ipfs-factory.js

import Ipfs from 'ipfs'
import { useEffect, useState } from 'react'

let ipfs = null

/*
 * A quick demo using React hooks to create an ipfs instance.
 * Next steps would be to store the ipfs instance on the context
 * so use-ipfs calls can grab it from there rather than expecting
 * it to be passed in.
 */


export const useIpfsFactory = () => {
  const [isIpfsReady, setIpfsReady] = useState(Boolean(ipfs));
  const [ipfsInitError, setIpfsInitError] = useState(null);

  useEffect(() => {
    async function startIpfs () {
      if (ipfs) {
        console.log('IPFS already started');
        // @ts-ignore
      } else if (window.ipfs && window.ipfs.enable) {
        console.log('Found window.ipfs');
        // @ts-ignore
        ipfs = await window.ipfs.enable({ commands: ['id'] });
      } else {
        try {
          console.time('IPFS Started');
          ipfs = await Ipfs.create();
          console.timeEnd('IPFS Started');
        } catch (error) {
          console.error('IPFS init error:', error);
          ipfs = null;
          setIpfsInitError(error);
        }
      }
      setIpfsReady(Boolean(ipfs));
    }

    startIpfs();

    return function cleanup () {
      if (ipfs && ipfs.stop) {
        console.log('Stopping IPFS');
        ipfs.stop().catch(err => console.error(err));
        ipfs = null;
        setIpfsReady(false);
      }
    }
  }, []);

  return { ipfs, isIpfsReady, ipfsInitError };
}

