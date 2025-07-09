import { Edit, useForm, useSelect } from "@refinedev/antd"
import { GetFieldsFromList } from "@refinedev/nestjs-query"
import { Col, Form, Input, InputNumber, Row, Select } from "antd"

import { UPDATE_COMPANY_MUTATION } from "../../graphql/mutations"
import { UsersSelectQuery } from "../../graphql/types"
import { USERS_SELECT_QUERY } from "../../graphql/queries"
import CustomAvatar from "../../components/custom-avatar"
import { getNameIntitials } from "../../utilities"
import SelectOptionWithAvatar from "../../components/select-option-with-avatar"
import { businessTypeOptions, companySizeOptions, industryOptions } from "../../constants"
import CompanyContactsTable from "./contacts-table"

const EditPage = () => {
    const { formLoading, formProps, queryResult, saveButtonProps } = useForm({
        redirect: false,
        meta: {
            gqlMutation: UPDATE_COMPANY_MUTATION,
        }
    })
    
    const { avatarUrl, name } = queryResult?.data?.data || {}

    const { selectProps, queryResult: queryResultUsers } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
        resource: 'users',
        optionLabel: 'name',
        pagination: {
            mode: 'off'
        },
        meta: {
            gqlQuery: USERS_SELECT_QUERY
        }
    })

    return (
        <div>
            <Row gutter={[32, 32]}>
                <Col xs={24} xl={12}>
                    <Edit
                        isLoading={formLoading}
                        saveButtonProps={saveButtonProps}
                        breadcrumb={false}
                    >
                        <Form {...formProps} layout="vertical">
                            <CustomAvatar 
                                shape="square" 
                                src={avatarUrl} 
                                name={getNameIntitials(name || "")}
                                style={{
                                    width: 96,
                                    height: 96,
                                    marginBottom: '24px'
                                }}
                            />
                            <Form.Item
                                label='Sales Owner'
                                name='salesOwnerId'
                                initialValue={formProps?.initialValues?.salesOwner?.id}
                            >
                                <Select
                                    placeholder='Please Select a Sales Owner'
                                    {...selectProps}
                                    options={
                                        queryResultUsers.data?.data.map((user) => ({
                                            value: user.id,
                                            label: (
                                                <SelectOptionWithAvatar 
                                                    name={user.name}
                                                    avatarUrl={user.avatarUrl ?? undefined}
                                                />
                                            )
                                        })) ?? []
                                    }
                                />
                            </Form.Item>
                            <Form.Item label='Company Size' name='companySize'>
                                <Select 
                                    placeholder='Select the Company Size'
                                    options={companySizeOptions} />
                            </Form.Item>
                            <Form.Item name="totalRevenue" label="Revenue">
                                <InputNumber 
                                    autoFocus
                                    addonBefore='$'
                                    min={0}
                                    placeholder="0.00"
                                />
                            </Form.Item>
                            <Form.Item label='Industry' name='industry'>
                                <Select 
                                    placeholder='Select the Industry'
                                    options={industryOptions} 
                                />
                            </Form.Item>
                            <Form.Item label='Business Type' name='businessType'>
                                <Select 
                                    placeholder='Select the Business Type'
                                    options={businessTypeOptions} 
                                />
                            </Form.Item>
                            <Form.Item label='Country' name='country'>
                                <Input placeholder="Country"/>
                            </Form.Item>
                            <Form.Item label='Website' name='website'>
                                <Input placeholder="Website"/>
                            </Form.Item>
                        </Form>
                    </Edit>
                </Col>
                <Col xs={24} xl={12}>
                    <CompanyContactsTable />
                </Col>
            </Row>
        </div>
    )
}

export default EditPage