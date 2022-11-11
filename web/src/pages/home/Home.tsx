import { useState, useEffect, useRef } from 'react'
import { getDocsList } from '@/http/api'
import nodata from '@/assets/images/nodata.png'
import { Button, Dropdown, Input, MenuProps, message, Modal, Tooltip } from 'antd'
import {
  PlusOutlined,
  SortAscendingOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import ListSort from '@/components/home/listSort/ListSort'
import TilSort from '@/components/home/tilSort/TilSort'
import { Doc } from '@/types'
import { newFolder } from '@/http/api'
import { sortList } from '@/utils'

const Home = () => {
  const navigate = useNavigate()
  const [docsList, setDocsList] = useState<Doc[]>([])
  const [parentId, setParentId] = useState('')
  const [currentMode, setCurrentMode] = useState('0')
  const [folderName, setFolderName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isFolderTop = useRef(true)
  const [sortType, setSortType] = useState('default')

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

  const sort = (dataList: Doc[] = docsList, type: string) => {
    setSortType(type)
    const list = sortList(dataList, type, isFolderTop.current)
    setDocsList([...list])
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
      label: (
        <div className='flex items-center'>
          <div className='w-4'>{sortType === 'default' ? <CheckOutlined /> : null}</div>
          <span onClick={() => sort(docsList, 'default')} className='ml-2'>
            默认
          </span>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className='flex items-center'>
          <div className='w-4'>{sortType === 'updateTime' ? <CheckOutlined /> : null}</div>
          <span onClick={() => sort(docsList, 'updateTime')} className='ml-2'>
            更新时间
          </span>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div className='flex items-center'>
          <div className='w-4'>{sortType === 'createTime' ? <CheckOutlined /> : null}</div>
          <span onClick={() => sort(docsList, 'createTime')} className='ml-2'>
            创建时间
          </span>
        </div>
      ),
    },
    {
      key: '4',
      label: (
        <div className='flex items-center'>
          <div className='w-4'>{sortType === 'name' ? <CheckOutlined /> : null}</div>
          <span onClick={() => sort(docsList, 'name')} className='ml-2'>
            文件名
          </span>
        </div>
      ),
    },
    {
      key: '5',
      label: (
        <div className='flex items-center'>
          <div className='w-4'>{isFolderTop.current ? <CheckOutlined /> : null}</div>
          <span
            className='ml-2'
            onClick={() => {
              isFolderTop.current = !isFolderTop.current
              sort(docsList, sortType)
            }}
          >
            文件夹置顶
          </span>
        </div>
      ),
    },
  ]

  const getList = () => {
    getDocsList({
      parentId,
    }).then((res) => {
      if (res.status) {
        res.body.map((item: Doc) => {
          item.showSetting = false
        })
        setDocsList(sortList(res.body, 'default', true))
      }
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
