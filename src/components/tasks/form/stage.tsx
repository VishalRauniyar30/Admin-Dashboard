import { HttpError } from "@refinedev/core"
import { GetFields, GetFieldsFromList, GetVariables } from "@refinedev/nestjs-query"
import { Checkbox, Form, Select, Space } from "antd"
import { useForm, useSelect } from "@refinedev/antd"
import { FlagOutlined } from "@ant-design/icons"

import AccordionHeaderSkeleton from "../../skeleton/accordion-header"
import { TaskStagesSelectQuery, UpdateTaskMutation, UpdateTaskMutationVariables } from "../../../graphql/types"
import { UPDATE_TASK_MUTATION } from "../../../graphql/mutations"
import { TASK_STAGES_SELECT_QUERY } from "../../../graphql/queries"

type Props = {
    isLoading?: boolean;
}
const StageForm = ({ isLoading }: Props) => {
    const { formProps } = useForm<
        GetFields<UpdateTaskMutation>,
        HttpError,
        Pick<GetVariables<UpdateTaskMutationVariables>, 'stageId' | 'completed'>
    >({
        queryOptions: {
            enabled: false
        },
        autoSave: {
            enabled: true,
            debounce: 0
        },
        meta: {
            gqlMutation: UPDATE_TASK_MUTATION
        }
    })

    const { selectProps } = useSelect<GetFieldsFromList<TaskStagesSelectQuery>>({
        resource: 'taskStages',
        filters: [{
            field: 'title',
            operator: 'in',
            value: ["TODO", "IN PROGRESS", "IN REVIEW", "DONE"] 
        }],
        sorters: [{
            field: 'createdAt',
            order: 'asc'
        }],
        meta: {
            gqlQuery: TASK_STAGES_SELECT_QUERY
        }
    })

    if(isLoading) {
        return <AccordionHeaderSkeleton />
    }

    return (
        <div style={{ padding: "12px 24px", borderBottom: "1px solid #d9d9d9" }}>
            <Form
                layout="inline"
                style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                {...formProps}
            >
                <Space size={5}>
                    <FlagOutlined />
                    <Form.Item noStyle name={['stageId']} initialValue={formProps?.initialValues?.stage?.id}>
                        <Select
                            {...selectProps}
                            popupMatchSelectWidth={false}
                            options={selectProps.options?.concat([{
                                label: 'Unassigned',
                                value: null
                            }])}
                            bordered={false}
                            showSearch={false}
                            placeholder='Select a Stage'
                            onSearch={undefined}
                            size="small"
                        />
                    </Form.Item>
                </Space>
                <Form.Item noStyle name='completed' valuePropName="checked">
                    <Checkbox>
                        Mark As Complete
                    </Checkbox>
                </Form.Item>
            </Form>
        </div>
    )
}

export default StageForm