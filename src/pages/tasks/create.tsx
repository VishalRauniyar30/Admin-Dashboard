import { Form, Input, Modal } from "antd"
import { useModalForm } from "@refinedev/antd"
import { useNavigation } from "@refinedev/core"
import { useSearchParams } from "react-router-dom"

import { CREATE_TASK_MUTATION } from "../../graphql/mutations"
import { Task } from "../../graphql/schema.types"

const TasksCreatePage = () => {
    const [searchParams] = useSearchParams()
    const { list } = useNavigation()
    /**
         * useNavigation is a hook by Refine that allows you to navigate to a page.
         * https://refine.dev/docs/routing/hooks/use-navigation/
         *
         * list method navigates to the list page of the specified resource.
         * https://refine.dev/docs/routing/hooks/use-navigation/#list
    */
    const { formProps, modalProps, close } = useModalForm<Task>({
        action: 'create',
        defaultVisible: true,
        meta: {
            gqlMutation: CREATE_TASK_MUTATION
        }
    })
    /*
        * useModalForm is a hook by Refine that allows you manage a form inside a modal.
        * it extends the useForm hook from the @refinedev/antd package
        * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-modal-form/
        *
        * formProps -> It's an instance of HTML form that manages form state and actions like onFinish, onValuesChange, etc.
        * Under the hood, it uses the useForm hook from the @refinedev/antd package
        * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-modal-form/#formprops
        *
        * modalProps -> It's an instance of Modal that manages modal state and actions like onOk, onCancel, etc.
        * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-modal-form/#modalprops
    */
    return (
        <Modal
            {...modalProps}
            onCancel={() => {
                close()
                list('tasks', 'replace')
            }}
            title='Add New Card'
            width={512}
        >
            <Form
                {...formProps}
                layout="vertical"
                onFinish={(values) => {
                    formProps.onFinish?.({
                        ...values,
                        stageId: searchParams.get('stageId') ? Number(searchParams.get('stageId')) : null,
                        userIds: []
                    })
                }}
            >
                <Form.Item
                    label="Title"
                    name='title'
                    rules={[{required: true}]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default TasksCreatePage