import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

interface Props {
  content?: string
}

export default forwardRef((props: Props, ref) => {
  const { content = '' } = props

  const editorRef = useRef<Vditor>()
  const editorComponent = useRef<any>()
  const timer = useRef<any>()
  const editorHasReady = useRef(false)

  const initEditor = () => {
    let editorHeight = editorComponent.current?.offsetHeight
    const options: any = {
      width: '100%',
      height: editorHeight || 600,
      tab: '\t',
      counter: '999999',
      typewriterMode: true,
      mode: 'sv',
      preview: {
        delay: 100,
      },
      outline: true,
      toolbar: [
        {
          hotkey: '⌘-E',
          name: 'emoji',
          tipPosition: 'ne',
        },
        {
          hotkey: '⌘-H',
          name: 'headings',
          tipPosition: 'ne',
        },
        {
          hotkey: '⌘-B',
          name: 'bold',
          prefix: '**',
          suffix: '**',
          tipPosition: 'ne',
        },
        {
          hotkey: '⌘-I',
          name: 'italic',
          prefix: '*',
          suffix: '*',
          tipPosition: 'ne',
        },
        {
          hotkey: '⌘-S',
          name: 'strike',
          prefix: '~~',
          suffix: '~~',
          tipPosition: 'ne',
        },
        {
          hotkey: '⌘-K',
          name: 'link',
          prefix: '[',
          suffix: '](https://)',
          tipPosition: 'n',
        },
        {
          name: '|',
        },
        {
          hotkey: '⌘-L',
          name: 'list',
          prefix: '* ',
          tipPosition: 'n',
        },
        {
          hotkey: '⌘-O',
          name: 'ordered-list',
          prefix: '1. ',
          tipPosition: 'n',
        },
        {
          hotkey: '⌘-J',
          name: 'check',
          prefix: '* [ ] ',
          tipPosition: 'n',
        },
        {
          name: '|',
        },
        {
          hotkey: '⌘-;',
          name: 'quote',
          prefix: '> ',
          tipPosition: 'n',
        },
        {
          hotkey: '⌘-⇧-D',
          name: 'line',
          prefix: '---',
          tipPosition: 'n',
        },
        {
          hotkey: '⌘-U',
          name: 'code',
          prefix: '```\n',
          suffix: '\n```',
          tipPosition: 'n',
        },
        {
          hotkey: '⌘-G',
          name: 'inline-code',
          prefix: '`',
          suffix: '`',
          tipPosition: 'n',
        },
        {
          name: '|',
        },
        {
          hotkey: '⌘-⇧-U',
          name: 'upload',
          tipPosition: 'n',
        },
        {
          hotkey: '⌘-M',
          name: 'table',
          prefix: '| col1',
          suffix: ' | col2 | col3 |\n| --- | --- | --- |\n|  |  |  |\n|  |  |  |',
          tipPosition: 'n',
        },
        {
          name: '|',
        },
        {
          hotkey: '⌘-Z',
          name: 'undo',
          tipPosition: 'n',
        },
        {
          hotkey: '⌘-Y',
          name: 'redo',
          tipPosition: 'n',
        },
        {
          name: '|',
        },
        {
          hotkey: '⌘-⇧-M',
          name: 'edit-mode',
          tipPosition: 'nw',
        },
        {
          hotkey: '⌘-P',
          name: 'both',
          tipPosition: 'nw',
        },
        {
          hotkey: '⌘-⇧-P',
          name: 'preview',
          tipPosition: 'nw',
        },
        {
          name: '|',
        },
        {
          name: 'outline',
          tipPosition: 'nw',
        },
        {
          name: 'export',
          tipPosition: 'nw',
        },
      ],
      after: () => {
        editorHasReady.current = true
        setContent(content)
      },
    }
    editorRef.current = new Vditor('editor-md-dom', options)
    // editorRef.current?.focus()
  }

  const getContent = () => {
    const content = editorRef.current?.getValue()
    return content
  }

  const setContent = (mdStr: string) => {
    if (!editorHasReady.current) {
      timer.current = setInterval(() => {
        editorRef.current?.setValue(mdStr)
        clearInterval(timer.current)
      }, 50)
      return
    }
    editorRef.current?.setValue(mdStr)
  }
  useImperativeHandle(ref, () => ({
    getContent,
  }))

  useEffect(() => {
    initEditor()
    return () => {
      if (editorHasReady && editorRef.current) {
        editorRef.current?.destroy()
      }
      if (timer.current) {
        clearInterval(timer.current)
      }
    }
  }, [])
  return (
    <div className='h-full' ref={editorComponent}>
      <div id='editor-md-dom'></div>
    </div>
  )
})
