import { HttpError } from "@refinedev/core"
import { SaveButton, useForm } from "@refinedev/antd"
import { Button, Card, Drawer, Form, Input, Spin } from "antd"
import { GetFields, GetVariables } from "@refinedev/nestjs-query"
import { CloseOutlined } from "@ant-design/icons"

import CustomAvatar from "../custom-avatar"
import { UPDATE_USER_MUTATION } from "../../graphql/mutations"
import { UpdateUserMutation, UpdateUserMutationVariables } from "../../graphql/types"
import { Text } from "../text"
import { getNameIntitials } from "../../utilities"

type Props = {
    opened: boolean;
    setOpened : (opened: boolean) => void;
    userId: string;
}

const AccountSettings = ({ opened, setOpened, userId }: Props) => {
     /**
     * useForm in Refine is used to manage forms. It provides us with a lot of useful props and methods that we can use to manage forms.
     * https://refine.dev/docs/data/hooks/use-form/#usage
     */

    /**
     * saveButtonProps -> contains all the props needed by the "submit" button. For example, "loading", "disabled", "onClick", etc.
     * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-form/#savebuttonprops
     *
     * formProps -> It's an instance of HTML form that manages form state and actions like onFinish, onValuesChange, etc.
     * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-form/#form
     *
     * queryResult -> contains the result of the query. For example, isLoading, data, error, etc.
     * https://refine.dev/docs/packages/react-hook-form/use-form/#queryresult
     */
    const { saveButtonProps, formProps, queryResult } = useForm<
        /**
         * GetFields is used to get the fields of the mutation i.e., in this case, fields are name, email, jobTitle, and phone
         * https://refine.dev/docs/data/packages/nestjs-query/#getfields
         */
        GetFields<UpdateUserMutation>,
        HttpError, // a type that represents an HTTP error. Used to specify the type of error mutation can throw.
        GetVariables<UpdateUserMutationVariables>
        // A third type parameter used to specify the type of variables for the UpdateUserMutation. Meaning that the variables for the UpdateUserMutation should be of type UpdateUserMutationVariables
    >({
        mutationMode: 'optimistic',
        /**
         * mutationMode is used to determine how the mutation should be performed. For example, optimistic, pessimistic, undoable etc.
         * optimistic -> redirection and UI updates are executed immediately as if the mutation is successful.
         * pessimistic -> redirection and UI updates are executed after the mutation is successful.
         * https://refine.dev/docs/advanced-tutorials/mutation-mode/#overview
         */
        resource: 'users',
        /**
         * specify on which resource the mutation should be performed
         * if not specified, Refine will determine the resource name by the current route
         */
        action: 'edit',
        /**
         * specify the action that should be performed on the resource. Behind the scenes, Refine calls useOne hook to get the data of the user for edit action.
         * https://refine.dev/docs/data/hooks/use-form/#edit
         */
        id: userId,
        meta: {
            // gqlMutation is used to specify the mutation that should be performed.
            gqlMutation: UPDATE_USER_MUTATION
        }
        /**
         * used to provide any additional information to the data provider.
         * https://refine.dev/docs/data/hooks/use-form/#meta-
         */
    })
    
    const { avatarUrl, name } = queryResult?.data?.data || {}

    const closeModal = () => setOpened(false)

    if(queryResult?.isLoading) {
        return (
            <Drawer
                open={opened}
                width={756}
                styles={{
                    body: { 
                        background: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                }}
            >
                <Spin />
            </Drawer>
        )
    }

    return (
        <Drawer
            onClose={closeModal}
            open={opened}
            width={756}
            styles={{
                body: { background: '#f5f5f5', padding: 0 },
                header: { display: 'none' }
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    backgroundColor: 'white'
                }}
            >
                <Text strong size="lg">
                    Account Settings
                </Text>
                <Button 
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => closeModal()}
                />
            </div>
            <div style={{ padding: '16px' }}>
                <Card>
                    <Form { ...formProps } layout="vertical">
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
                        <Form.Item label='Name' name='name'>
                            <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item label='Email' name='email'>
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item label='Job Title' name='jobTitle'>
                            <Input placeholder="Job Title" />
                        </Form.Item>
                        <Form.Item label='Phone' name='phone'>
                            <Input placeholder="Timezone" />
                        </Form.Item>
                    </Form>
                    <SaveButton
                        { ...saveButtonProps }
                        style={{
                            display: 'block',
                            marginLeft: 'auto'
                        }}
                    />
                </Card>
            </div>
        </Drawer>
    )
}

export default AccountSettings