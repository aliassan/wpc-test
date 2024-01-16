import React from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading'

//const Loading = () => <div>Loading...</div>;

const ReactQuill = Loadable({
  loader: () => import(/* webpackChunkName: "react-quill" */ 'react-quill'),
  loading: Loading,
});

const QuillEditorStyles = Loadable({
  loader: () => import(/* webpackChunkName: "react-quill-styles" */ '../../css/vendor/style.css'),
  loading: () => {return null},
});

//const isClient = typeof window !== 'undefined';

export default function Editor({ value, onChange, modules, formats }) {
  if (__isClient__) {
    return (
      <>
        <h4 className="my-h4">Is Working..</h4>
      </>
    );
  } else {
    return <Loading />;
  }
}
