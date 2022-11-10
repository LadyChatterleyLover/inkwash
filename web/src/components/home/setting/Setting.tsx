import React from 'react'
import { Dropdown, MenuProps, message, Modal } from 'antd'
import { SettingOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import { delDocument } from '@/http/api'
import { Doc } from '@/types'

const { confirm } = Modal

interface Props {
  current: Doc | null
  getList: () => void
  type: '0' | '1'
}

const Setting = (props: Props) => {
  const { current, getList, type } = props

  const del = () => {
    confirm({
      title: `确认要删除${current?.title}吗?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        delDocument({
          id: current?._id,
        }).then((res: any) => {
          if (res.status) {
            message.success('删除成功')
            getList()
          } else {
            message.error(res.msg)
          }
        })
      },
      onCancel() {
        message.info('已取消操作')
      },
    })
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>编辑</span>,
    },
    {
      key: '2',
      label: <span>新标签打开</span>,
    },
    {
      key: '3',
      label: <span>复制链接</span>,
    },
    {
      key: '4',
      label: <span>访问设置</span>,
    },
    {
      key: '5',
      label: <span>协作设置</span>,
    },
    {
      key: '6',
      label: (
        <span style={{ color: 'red' }} onClick={del}>
          删除
        </span>
      ),
    },
  ]

  return (
    <Dropdown menu={{ items }} arrow placement='bottom'>
      <div className={`${type === '0' ? 'absolute top-2 right-3 cursor-pointer ' : 'cursor-pointer w-fit'}`}>
        <SettingOutlined style={{ color: '#999' }} />
      </div>
    </Dropdown>
  )
}

export default Setting
