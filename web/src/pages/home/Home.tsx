import { useState, useEffect } from 'react'
import { getDocsList } from '@/http/api'
import nodata from '@/assets/images/nodata.png'
import { Button, Dropdown, Input, MenuProps, message, Modal, Tooltip } from 'antd'
import { PlusOutlined, SortAscendingOutlined, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import ListSort from '@/components/home/listSort/ListSort'
import TilSort from '@/components/home/tilSort/TilSort'
import { Doc } from '@/types'
import { newFolder } from '@/http/api'

const Home = () => {
  const navigate = useNavigate()
  const [docsList, setDocsList] = useState<Doc[]>([])
  const [parentId, setParentId] = useState('')
  const [currentMode, setCurrentMode] = useState('0')
  const [folderName, setFolderName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const clickItem = (key: string) => {
    if (key === '1') {
      navigate('/edit?type=docs')
    }
    if (key === '2') {
      navigate('/edit?type=sheet')
    }
    if (key === '3') {
      setIsModalOpen(true)
    }
  }

  const handleOk = () => {
    newFolder({
      parentId,
      title: folderName,
    }).then((res: any) => {
      if (res.status) {
        message.success('创建成功')
        getList()
        handleCancel()
      } else {
        message.error(res.msg)
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setFolderName('')
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span onClick={() => clickItem('1')}>文档</span>,
    },
    {
      key: '2',
      label: <span onClick={() => clickItem('2')}>表格</span>,
    },
    {
      key: '3',
      label: <span onClick={() => clickItem('3')}>文件夹</span>,
    },
  ]
  const sortItems: MenuProps['items'] = [
    {
      key: '1',
      label: <span>默认</span>,
    },
    {
      key: '2',
      label: <span>更新时间</span>,
    },
    {
      key: '3',
      label: <span>创建时间</span>,
    },
    {
      key: '4',
      label: <span>文件名</span>,
    },
    {
      key: '5',
      label: <span>文件夹置顶</span>,
    },
  ]

  const getList = () => {
    getDocsList({
      parentId,
    }).then((res: any) => {
      if (res.status) {
        res.body.map((item: Doc) => {
          item.showSetting = false
        })
        setDocsList(res.body)
      }
      console.log(res)
    })
  }

  useEffect(() => {
    getList()
  }, [])
  return (
    <div className='w-full'>
      <div className='w-full flex items-center justify-between leading-8'>
        <div className='flex-1 pt-[10px]'>
          <div className='font-bold'>工作台</div>
        </div>
        <div className='w-[200px] flex items-center'>
          <Dropdown menu={{ items }} placement='bottom' arrow>
            <Button icon={<PlusOutlined />}>新建</Button>
          </Dropdown>
          <div
            className='inline-block h-[18px] align-middle mx-5'
            style={{
              border: '1px solid #ddd',
            }}
          ></div>
          <div className='flex items-center cursor-pointer relative top-[2px]'>
            <Dropdown menu={{ items: sortItems }} placement='bottom' arrow>
              <Tooltip title='排序'>
                <div>
                  <SortAscendingOutlined className='text-lg mr-2' />
                </div>
              </Tooltip>
            </Dropdown>
            <Tooltip title='平铺'>
              <div onClick={() => setCurrentMode('0')}>
                <AppstoreOutlined
                  className='text-lg mr-2'
                  style={{
                    color: currentMode === '0' ? '#000' : '#ccc',
                  }}
                />
              </div>
            </Tooltip>
            <Tooltip title='列表'>
              <div onClick={() => setCurrentMode('1')}>
                <UnorderedListOutlined
                  className='text-lg mr-2'
                  style={{
                    color: currentMode === '1' ? '#000' : '#ccc',
                  }}
                />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      {docsList.length ? (
        <div>
          {currentMode === '0' ? (
            <ListSort list={docsList} getList={getList} />
          ) : (
            <TilSort list={docsList} getList={getList} />
          )}
        </div>
      ) : (
        <div className='flex justify-center flex-col items-center mt-[80px]'>
          <img src={nodata} alt='nodata' />
          <div className='mt-1'>暂无数据</div>
        </div>
      )}
      <Modal title='新建文件夹' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder='请输入文件夹名' value={folderName} onChange={(e) => setFolderName(e.target.value)} />
      </Modal>
    </div>
  )
}

export default Home
