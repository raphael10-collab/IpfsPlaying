import all from 'it-all';
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';

//import { useIpfsFactory } from './ipfs-hooks/use-ipfs-factory.js'
//import useIpfs from './ipfs-hooks/use-ipfs.js'

import Ipfs from 'ipfs';
// https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#importing-files-from-the-file-system

const { globSource } = Ipfs;

// options specific to globSource
const globSourceOptions = {
  recursive: true,
};


import dotProp from 'dot-prop';

import "../../../node_modules/tachyons";

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Dndelement from './dndelement';

//import { MUIGridLayout } from '../../ui/mui/MUIGridLayout';
//import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';




// https://docs.ipfs.io/concepts/ipns/#example-ipns-setup-with-js-sdk-api







const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    border: '0.2px dotted gray',
    margin: theme.spacing(2, 0),
  },
}));


const items = [
    <div key={0}>first</div>,
    <div key={1}>second</div>
];

declare interface Window {
  api: {
    send: (channel: string, ...arg: any) => void;
    receive: (channel: string, func: (event: any, ...arg: any) => void) => void;
    // https://github.com/frederiksen/angular-electron-boilerplate/blob/master/src/preload/preload.ts
    // https://www.electronjs.org/docs/all#ipcrenderersendtowebcontentsid-channel-args
    electronIpcSendTo: (window_id: string, channel: string, ...arg: any) => void;
    electronIpcSend: (channel: string, ...arg: any) => void;
    electronIpcOn: (channel: string, listener: (event: any, ...arg: any) => void) => void;
    electronIpcSendSync: (channel: string, ...arg: any) => void;
    electronIpcOnce: (channel: string, listener: (event: any, ...arg: any) => void) => void;
    electronIpcRemoveListener:  (channel: string, listener: (event: any, ...arg: any) => void) => void;
    electronIpcRemoveAllListeners: (channel: string) => void;
  },

}

// https://github.com/electron/electron/issues/21437#issuecomment-573522360


const getFileExtension = (filepath: string): string => {
  let baseName = filepath.split(/[\\/]/).pop(); // extracts file name from full path
  let pos = baseName.lastIndexOf("."); // gets the last position of `.`
  if (baseName === "" || pos < 1) { // if the file name is empty or ...
    return ""; // the dot not found (-1) or comes first (0)
  }
  else {
    return baseName.slice(pos + 1); // extracts extension ignoring "."
  }
}

const App = () => {

  const [win, setWin] = useState("A-Type");

  //const { ipfs, ipfsInitError } = useIpfsFactory();

  //const [ipfsNodeState, setIpfsNodeState] = useState({
    //id: null,
    //agentVersion: null,
    //protocolVersion: null,
    //addedFileHash: null,
    //addedFileContents: null
  //});
  //const id = useIpfs(ipfs, 'id');


  let filePath_1 = '/home/marco/Downloads/Art21Costituzione.jpg';
  let filePath_2 = '/home/marco/Downloads/VitaminaCAlimenti.pdf';
  let filePaths = ['/home/marco/Downloads/Art21Costituzione.jpg', '/home/marco/Downloads/VitaminaCAlimenti.pdf'];

  // https://github.com/electron/electron/issues/7193

  // https://medium.com/jspoint/working-with-files-i-o-in-an-electron-application-b4d2de403f54

  // IMPORTANT: 
  // https://www.electronjs.org/docs/api/file-object
  // https://github.com/feross/drag-drop

  // https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929

  // https://github.com/react-dnd/react-dnd


  function handleSecondWindowType (fp: string) {
    let fileExtens = getFileExtension(fp);
    if (fileExtens.includes('jpg')) {
      setWin("A-Type");
      // https://stackoverflow.com/questions/53753181/webcontents-send-and-ipcrenderer-on-not-working
      //window.api.send('open-type-A-window', '');
      //window.api.electronIpcOn('window-A-opened', (event, args) => {
        //console.log("Window ID Just Opened: ", args);
        //if (args === 'ok') {
          //console.log("I can now send the filepath to the second window");
          //window.api.electronIpcSend('window-A-channel', filePath_1);
        //}
      //});
    }
  }

  // https://github.com/ipfs/js-ipfs/blob/master/examples/browser-webpack/src/components/app.js

  // https://proto.school/regular-files-api/03

  const ops = async () => {
    const node = await Ipfs.create({ repo: String(Math.random() + Date.now()) });
    console.log('Ipfs node is ready');

    // https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#example
    // https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#importing-files-from-the-file-system
    // https://proto.school/regular-files-api/03

    const files = [
      {
        path: '/home/marco/Downloads/Art21Costituzione.jpg',
        content: 'Art21Costituzione'
      },
      {
        path: '/home/marco/Downloads/VitaminaCAlimenti.pdf',
        content: 'VitaminaCAlimenti'
      }
    ];

    // https://proto.school/regular-files-api/03

    //let results = [];
    //for await (const result of node.addAll(files)) {
      //results.push(result);
    //}
    //results.map(result => console.log(result));

    let results = await all(node.addAll(files));
    results.map(result => console.log(result));
    

    //const addOptions = {
      //pin: true,
      //wrapWithDirectory: true,
      //timeout: 10000
    //};

    //for await (const file of node.addAll(globSource('/home/marco/Downloads', globSourceOptions), addOptions)) {
      //console.log(file);
    //}

  }

  ops();



  useEffect(() => {
    //handleSecondWindowType(filePath_1);
  },[]);

  const sendFilePathFunct = () => {

    // https://stackoverflow.com/questions/53753181/webcontents-send-and-ipcrenderer-on-not-working

    if (win === "A-Type") {
      window.api.send('open-type-A-window', '');
      // https://stackoverflow.com/questions/53753181/webcontents-send-and-ipcrenderer-on-not-working
      window.api.electronIpcOn('window-A-opened', (event, args) => {
        console.log("Window ID Just Opened: ", args);
        if (args === 'ok') {
          console.log("I can now send the filepath to the second window");
          window.api.electronIpcSend('window-A-channel', filePath_1);
        }
      });

      window.api.electronIpcOn('window-A-channel', (event, args) => {
        console.log("App.tsx-Message from main.ts: ", args);
      });
    }
  }

  const Title = ({ children }) => {
    return (
      <h2 className='f5 ma0 pb2 tracked aqua fw4 montserrat'>{children}</h2>
    )
  }

  const IpfsId = (props) => {
    if (!props) return null
    return (
      <section className='bg-snow mw7 center mt5'>
        <h1 className='f3 fw4 ma0 pv3 aqua montserrat tc' data-test='title'>Connected to IPFS</h1>
        <div className='pa4'>
          {['id', 'agentVersion'].map((key) => (
            <div className='mb4' key={key}>
              <Title>{key}</Title>
              <div className='bg-white pa2 br2 truncate monospace' data-test={key}>{props[key]}</div>
            </div>
          ))}
        </div>
      </section>
    )
  }

    return (
      <div className='container'>
        <h2 className='heading'>
            Multiple Selective Windows Communication
        </h2>



        <DndProvider backend={HTML5Backend}>
          <Dndelement />
        </DndProvider>



        <p>
          <button id="sendFilePath" onClick={() => {
            sendFilePathFunct();
          }}>Send File Path to the Second Window</button>
        </p>



      </div>
    );
}

export default hot(module)(App);
