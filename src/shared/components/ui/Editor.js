import React, {useRef, useEffect, useState} from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading'
//import Quill from 'quill'

const LoadableReactQuill = Loadable({
  loader: () => import(/* webpackChunkName: "react-quill" */ 'react-quill'),
  loading: Loading,
  render(loaded, props) {
    const ReactQuill = loaded.default
    const Quill = ReactQuill.Quill
    const quillRef = props.forwardedRef

    const icons = Quill.import('ui/icons')

    //console.log("icons: ", icons)

    icons['undo'] = `<svg viewBox="0 0 18 18">
      <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
      <path
        class="ql-stroke"
        d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
      />
    </svg>`

    icons['redo'] = `<svg viewbox="0 0 18 18">
        <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
        <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
      </svg>`

    const modules = {
      toolbar: {
        container: [
          ['bold', 'italic'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          ['undo', 'redo']
        ],
        handlers: {
          'undo': () => quillRef.current.editor.history.undo(),
          'redo': () => quillRef.current.editor.history.redo()
        }
      },
    }

    const handleOnChange = (contents, delta, source, editor) => {
      // console.log('handleOnChange: ', props.onChange)
      console.log('contents: ', contents);
      console.log('delta: ', delta);
      console.log('sourse: ', source);
      console.log('editor: ', editor);
    }

    const formats = ['bold', 'italic', 'list']

    return <ReactQuill
      value={props.value}
      onChange={handleOnChange}
      modules={modules}
      formats={formats}
      ref={props.forwardedRef}
    />
  }
});

const ReactQuillWithRef = React.forwardRef((props, ref) => {
  return <LoadableReactQuill {...props} forwardedRef={ref}/>
})

/*const QuillEditorStyles = Loadable({
  loader: () => import(/* webpackChunkName: "react-quill-styles" */ /*'../../css/vendor/quill.snow.css'),
  loading: () => {return null},
})*/

export default function Editor({value, onChange, formats, toolbar}) {
  if (typeof window !== 'undefined') {
    //const MyQuillToolbar = toolbar
    let quillRef = useRef(null)

    const [isQuillReady, setIsQuillReady] = useState(false)

    const [modules, setModules] = useState({
      toolbar: {
        container: [
          ['bold', 'italic'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          ['undo', 'redo']
        ],
        handlers: {
          'undo': () => quillRef.current.editor.history.undo(),
          'redo': () => quillRef.curremt.editor.history.redo()
        }
      },
    })

    const handleUndo = () => {
      console.log('Something hapening in undo')
      this.quill.history.undo();
    }

    const handleRedo = () => {
      console.log('Something hapening in redo')
      this.quill.history.redo();
    }

    const EditorToolbar = toolbar

    //const memoizedModules = useMemo(() => modules, [modules])
    

    /*useEffect(async () => {

      if(quillRef.current) {
        console.log('quillRef: ', quillRef.current)

        /*if(!isQuillReady) {

          const quillMod = await import('quill')
          const Quill = quillMod.default
          console.log('Quill: ', Quill)

          const icons = Quill.import('ui/icons')

          console.log('icons: ', icons)

          Quill.register('modules/history', {
            undo: {
              name: 'undo',
              title: 'Undo',
              icon: 'fa fa-undo',
              result: function() {
                //if(quillRef.current)
                  quillRef.current.editor.history.undo();
              },
            },
            redo: {
              name: 'redo',
              title: 'Redo',
              icon: 'fa fa-repeat',
              result: function() {
                //if(quillRef.current)
                  quillRef.current.editor.history.redo();
              },
            },
          })

          modules.toolbar =  [
              ['bold', 'italic'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              ['undo, redo']
            ]

          modules.history =  {
                delay: 2000,
                maxStack: 500,
                userOnly: false
            }
        }

        setIsQuillReady(true)
      }

    })*/

    //        <EditorToolbar/>

    return (
      <>
        <ReactQuillWithRef
          ref={quillRef}
          value={value}
          onChange={onChange}
        />
      </>
    );
  } else {
    return <Loading />;
  }
}
