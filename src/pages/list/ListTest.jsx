import React, { Component } from 'react'
import { Layout, Typography, Table, Button, Row, Col, Divider, Popconfirm, Icon } from "antd"
import SearchInput, { createFilter } from 'react-search-input'
import LayoutComponent from '../../layout/LayoutComponent'
const { Title } = Typography
const KEYS_TO_FILTERS = ['name', 'type', 'quantity', 'time']

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    ellipsis: true
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    ellipsis: true
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
    ellipsis: true
  },
  {
    title: 'Time (minutes)',
    dataIndex: 'time',
    key: 'time',
    align: 'center',
    ellipsis: true
  },
  {
    title: 'CreatedAt',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    ellipsis: true
  },
  {
    title: 'ModifiedAt',
    dataIndex: 'modifiedAt',
    key: 'modifiedAt',
    align: 'center',
    ellipsis: true
  },
  {
    title: 'Actions',
    key: 'action',
    align: 'center',
    render: (text, record) => (
      <span>
        <a><Icon type="edit" theme='twoTone' style={{ fontSize: '26px' }} /></a>
        <Divider type="vpoststical" />
        <Popconfirm
          title="Are you sure delete this test?"
          okText="Yes"
          cancelText="No"
        >
          <a><Icon type="delete" theme='twoTone' style={{ fontSize: '26px' }} twoToneColor='#f51000' /></a>
        </Popconfirm>
      </span>
    )
  }
]

const data = [];
const quantity = [10, 15, 20, 30, 40, 50, 60]
const time = [10, 15, 20, 30, 45, 60, 90, 120]
const type = ['ReactJS', 'PHP', 'Python', 'Golang', 'MySQL', 'HTML&CSS']
for (let i = 1; i < 46; i++) {
  data.push({
    key: i,
    name: `Test ${i}`,
    type: type[Math.floor(Math.random() * type.length)],
    quantity: quantity[Math.floor(Math.random() * quantity.length)],
    time: time[Math.floor(Math.random() * time.length)],
    createdAt: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
    modifiedAt: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
  })
}

class ListTest extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    inputSearch: '',
  }

  handleInputChange = (value) => {
    this.setState({
      inputSearch: value
    })
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  render() {
    const filtered = data.filter(createFilter(this.state.inputSearch, KEYS_TO_FILTERS))
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [
        {
          // selected odd row
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          // selected even row
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    }
    return (
      <LayoutComponent>
        <Layout>
          <Row>
            <Col span={6} className='title-wrapper'>
              <Title level={3}>List Tests</Title>
            </Col>
            <Col span={12} className='search-wrapper'>
              <SearchInput className="search-input" onChange={this.handleInputChange} />
            </Col>
            <Col span={6} className='button-wrapper button-test-wrapper'>
              <Button type="primary" onClick={() => { this.props.history.push('/test/create') }}>Add</Button>
              {
                selectedRowKeys.length > 0 ? (
                  <Button type="danger">Delete</Button>
                ) : (
                    <Button type="danger" disabled>Delete</Button>
                  )
              }
            </Col>
          </Row>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filtered}
            size='small'
            pagination={{ pageSize: 10 }}
            style={{ whiteSpace: 'unset' }}
          ></Table>
        </Layout>
      </LayoutComponent>
    )
  }
}

export default ListTest
