import { FilterDropdown, useTable } from "@refinedev/antd"
import { GetFieldsFromList } from "@refinedev/nestjs-query"
import { useParams } from "react-router-dom"
import { Button, Card, Input, Select, Space, Table } from "antd"
import { MailOutlined, PhoneOutlined, SearchOutlined, TeamOutlined } from "@ant-design/icons"

import { CompanyContactsTableQuery } from "../../graphql/types"
import { COMPANY_CONTACTS_TABLE_QUERY } from "../../graphql/queries"
import { Text } from "../../components/text"
import { Contact } from "../../graphql/schema.types"
import CustomAvatar from "../../components/custom-avatar"
import { ContactStatusTag } from "../../components"
import { statusOptions } from "../../constants"

const CompanyContactsTable = () => {
    const params = useParams()

    const { tableProps } = useTable<GetFieldsFromList<CompanyContactsTableQuery>>({
        resource: 'contacts',
        syncWithLocation: false,
        sorters: {
            initial: [{
                field: 'createdAt',
                order: 'desc'
            }]
        },
        filters: {
            initial: [{
                field: 'jobTitle',
                value: "",
                operator: 'contains'
            }, {
                field: 'name',
                value: "",
                operator: 'contains'
            }, {
                field: 'status',
                value: undefined,
                operator: 'in'
            }],
            permanent: [{
                field: 'company.id',
                operator: 'eq',
                value: params?.id as string
            }]
        },
        meta: {
            gqlQuery: COMPANY_CONTACTS_TABLE_QUERY
        }
    })

    return (
        <Card
            styles={{
                header: { borderBottom: '1px solid #d9d9d9', marginBottom: '1px' },
                body: { padding: 0 }
            }}
            title={
                <Space size='middle'>
                    <TeamOutlined />
                    <Text>Contacts</Text>
                </Space>
            }
            extra={
                <>
                    <Text className="tertiary">Total Contacts: </Text>
                    <Text strong>
                        {/*if pagination is not disabled and total is provided then show the total */}
                        {tableProps?.pagination !== false && tableProps.pagination?.total}
                    </Text>
                </>
            }
        >
            <Table
                {...tableProps}
                rowKey='id'
                pagination={{
                    ...tableProps.pagination,
                    showSizeChanger: false
                }}
            >
                <Table.Column<Contact> 
                    title='Name'
                    dataIndex='name'
                    render={(_, record) => (
                        <Space>
                            <CustomAvatar name={record.name} src={record.avatarUrl} />
                            <Text style={{ whiteSpace: 'nowrap' }}>
                                {record.name}
                            </Text>
                        </Space>
                    )}
                    filterIcon={<SearchOutlined />}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input placeholder="Seach Name" />
                        </FilterDropdown>
                    )}
                />
                <Table.Column 
                    title='Title'
                    dataIndex='jobTitle'
                    filterIcon={<SearchOutlined />}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input placeholder="Seach Title" />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<Contact> 
                    title='Stage'
                    dataIndex='status'
                    render={(_, record) => (
                        <ContactStatusTag status={record.status} />
                    )}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ width: '200px' }}
                                mode="multiple"
                                placeholder='Select Stage'
                                options={statusOptions}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<Contact> 
                    dataIndex='id'
                    width={112}
                    render={(_, record) => (
                        <Space>
                            <Button 
                                size="small"
                                href={`mailto:${record.email}`}
                                icon={<MailOutlined />}
                            />
                            <Button 
                                size="small"
                                href={`tel:${record.phone}`}
                                icon={<PhoneOutlined />}
                            />
                        </Space>
                    )}
                />
            </Table>
        </Card>
    )
}

export default CompanyContactsTable