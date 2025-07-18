import { HttpError } from "@refinedev/core"
import { useForm, useSelect } from "@refinedev/antd"
import { GetFields, GetFieldsFromList, GetVariables } from "@refinedev/nestjs-query"
import { Button, Form, Select, Space } from "antd"

import { UpdateTaskMutation, UpdateTaskMutationVariables, UsersSelectQuery } from "../../../graphql/types"
import { UPDATE_TASK_MUTATION } from "../../../graphql/mutations"
import { USERS_SELECT_QUERY } from "../../../graphql/queries"

type Props = {
    initialValues: {
      userIds?: { label: string; value: string }[];
    };
    cancelForm: () => void;
}
const UsersForm = ({ initialValues, cancelForm }: Props) => {
    const { formProps, saveButtonProps } = useForm<
        GetFields<UpdateTaskMutation>,
        HttpError,
        Pick<GetVariables<UpdateTaskMutationVariables>, 'userIds'>
    >({
        queryOptions: {
            enabled: false
        },
        redirect: false,
        onMutationSuccess: () => cancelForm(),
        meta: {
            gqlMutation: UPDATE_TASK_MUTATION
        }
    })

    const { selectProps } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
        resource: 'users',
        meta: {
            gqlQuery: USERS_SELECT_QUERY
        },
        optionLabel: 'name'
    })

    return (
        <div
            style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "space-between",
                gap: "12px",
            }}
        >
            <Form {...formProps} style={{ width: '100%' }} initialValues={initialValues}>
                <Form.Item noStyle name='userIds'>
                    <Select
                        {...selectProps}
                        className="kanban-users-form-select"
                        dropdownStyle={{ padding: "0px" }}
                        style={{ width: "100%" }}
                        mode="multiple"
                    />
                </Form.Item>
            </Form>
            <Space>
                <Button type="default" onClick={cancelForm}>
                    Cancel
                </Button>
                <Button type="primary" {...saveButtonProps}>
                    Save
                </Button>
            </Space>
        </div>
    )
}

export default UsersForm