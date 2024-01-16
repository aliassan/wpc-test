import React, {useRef, useEffect} from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading'
//import Quill from 'react-quill'

//const Loading = () => <div>Loading...</div>;

const ReactQuill = Loadable({
  loader: () => import(/* webpackChunkName: "react-quill" */ 'react-quill'),
  loading: Loading,
});

/*const ReactQuillWithRef = React.forwardRef((props, ref) => {
  return <ReactQuill {...props} ref={ref}/>
})*/

/*const QuillEditorStyles = Loadable({
  loader: () => import(/* webpackChunkName: "react-quill-styles" */ /*'../../css/vendor/quill.snow.css'),
  loading: () => {return null},
})*/

//const isClient = typeof window !== 'undefined';

export default function Editor({value, onChange, formats, toolbar}) {
  if (__isClient__) {
    //const MyQuillToolbar = toolbar
    let quillRef = useRef(null)

    const undo = () => {
        //this.quill.history.undo()
    }

    const redo = () => {
        //this.quill.history.redo()
    }

    const modules = {
        /*toolbar: {
          container: '.ql-toolbar-container',
          handlers: {undo, redo}
        },*/
        toolbar: [
          ['bold', 'italic'],
          [{'list': 'ordered'}, {'list': 'bullet'}]
        ],
        history: {
            delay: 2000,
            maxStack: 500,
            userOnly: false
        }
      }

    const EditorToolbar = toolbar

    /*useEffect(() => {
      if(quillRef.current)
        console.log('quillRef - useEffect: ', quillRef)
    }, [quillRef.current])*/

    return (
      <>
        <EditorToolbar/>
        <ReactQuill
          value={value}
          modules={modules}
          formats={formats}
          onChange={onChange}
        />
      </>
    );
  } else {
    return <Loading />;
  }
}
