import React, { useState } from 'react';
import slate from '@react-page/plugins-slate';
import image from '@react-page/plugins-image';
import Editor from '@react-page/editor';
import spacer from '@react-page/plugins-spacer';
import divider from '@react-page/plugins-divider';

import data from '../../file.json';

const cellPlugins = [slate(), image, spacer, divider];

const ReactPage = () => {
  const [value, setValue] = useState(null);
  const [readOnly, setReadOnly] = useState(false);

  const downloadFile = async () => {
    const fileName = 'file';
    const json = JSON.stringify(value);
    const blob = new Blob([json], { type: 'application/json' });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEditClick = () => {
    setReadOnly(!readOnly);
    downloadFile();
    console.log(data);
  };
  return (
    <div>
      <Editor
        cellPlugins={cellPlugins}
        value={value}
        onChange={setValue}
        readOnly={readOnly}
      />
      <button onClick={handleEditClick}>Edit</button>
      <Editor
        cellPlugins={cellPlugins}
        value={data}
        onChange={setValue}
        readOnly={true}
      />
    </div>
  );
  //TODO check the docs for images and background
};

export default ReactPage;
