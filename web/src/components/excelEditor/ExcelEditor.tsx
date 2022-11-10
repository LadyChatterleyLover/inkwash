import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import Spreadsheet from 'x-data-spreadsheet'
import 'x-data-spreadsheet/dist/locale/zh-cn'

interface Props {
  content?: string
}

export default forwardRef((props: Props, ref) => {
  const { content } = props
  const editor = useRef<any>()

  const initEditor = () => {
    const options: any = {
      showToolbar: true,
      showGrid: true,
      showContextmenu: true,
      view: {
        height: () => document.documentElement.clientHeight - 71,
        width: () => document.documentElement.clientWidth,
      },
      row: {
        len: 100,
        height: 25,
      },
      col: {
        len: 26,
        width: 100,
        indexWidth: 60,
        minWidth: 60,
      },
      style: {
        bgcolor: '#ffffff',
        align: 'left',
        valign: 'middle',
        textwrap: false,
        strike: false,
        underline: false,
        color: '#0a0a0a',
        font: {
          name: 'Helvetica',
          size: 10,
          bold: false,
          italic: false,
        },
      },
    }
    Spreadsheet.locale('zh-cn', (window.x_spreadsheet as any).$messages['zh-cn'])
    editor.current = new Spreadsheet(document.getElementById('excel-edit')!, options)
    editor.current.validate()
  }

  const getContent = () => {
    const content = editor.current.getData()
    return JSON.stringify(content)
  }
  const setContent = (dataStr: string) => {
    try {
      dataStr = JSON.parse(dataStr)
    } catch (e) {
      console.log(e)
    }
    editor.current.loadData(dataStr)
  }
  useImperativeHandle(ref, () => ({
    getContent,
  }))
  useEffect(() => {
    initEditor()
    return () => {
      editor.current = null
    }
  }, [])

  return (
    <div className='h-full'>
      <div className='h-full' id='excel-edit'></div>
    </div>
  )
})
