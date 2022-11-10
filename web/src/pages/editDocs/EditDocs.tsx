import ExcelEditor from '@/components/excelEditor/ExcelEditor'
import MarkdownEditor from '@/components/markdownEditor/MarkdownEditor'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Dropdown, MenuProps, Input, message } from 'antd'
import { DownOutlined, DoubleLeftOutlined } from '@ant-design/icons'
import { createDocument } from '@/http/api'
import { useNavigate } from 'react-router-dom'

const EditDocs = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type')
  const [value, setValue] = useState('')
  const markdownRef = useRef<any>()
  const excelRef = useRef<any>()

  const items: MenuProps['items'] = [
    {
      label: '存为模板',
      key: '1',
    },
  ]

  const render = () => {
    if (type === 'docs') {
      return <MarkdownEditor ref={markdownRef} />
    }
    if (type === 'sheet') {
      return <ExcelEditor ref={excelRef} />
    }
  }

  const save = () => {
    const title = value || '新建文档'
    let content = ''
    if (type === 'docs') {
      content = markdownRef.current.getContent()
    }
    if (type === 'excel') {
      content = excelRef.current.getContent()
    }
    createDocument({
      content,
      title,
      parentId: '',
      type,
    }).then((res: any) => {
      if (res.status) {
        message.success('创建成功')
        navigate('/dashboard/work')
      } else {
        message.error(res.msg)
      }
    })
  }

  return (
    <div className='h-full'>
      <div className='flex items-center h-12 p-4'>
        <div>
          <Button icon={<DoubleLeftOutlined />}>返回</Button>
        </div>
        <div className='flex-1 flex justify-center'>
          <div className='  w-[680px]'>
            <Input
              placeholder='请输入标题'
              className='w-full'
              style={{
                border: 'none',
                borderBottom: '1px solid #eee',
              }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Dropdown.Button icon={<DownOutlined />} menu={{ items }} type='primary' onClick={save}>
            保存
          </Dropdown.Button>
        </div>
      </div>
      {render()}
    </div>
  )
}

export default EditDocs
