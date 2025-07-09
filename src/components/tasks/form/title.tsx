import { useEffect } from "react"
import { HttpError, useInvalidate } from "@refinedev/core"
import { useForm } from "@refinedev/antd"
import { GetFields, GetVariables } from "@refinedev/nestjs-query"
import { Form, Skeleton } from "antd"

import { Task } from "../../../graphql/schema.types"
import { Text } from "../../text"
import { UpdateTaskMutation, UpdateTaskMutationVariables } from "../../../graphql/types"
import { UPDATE_TASK_MUTATION } from "../../../graphql/mutations"

type InputProps = {
    value?: string;
    onChange?: (value: string) => void;
}

const TitleInput = ({ value, onChange }: InputProps) => {
    const onTitleChange =(newTitle: string) => {
        onChange?.(newTitle)
    }

    return (
        <Text
            editable={{ onChange: onTitleChange }}
            style={{ width: '98%' }}
        >
            {value}
        </Text>
    )
    return (
        <div>TitleForm</div>
    )
}


type Props = {
    initialValues: {
        title?: Task["title"];
    };
    isLoading?: boolean;
};

export const TitleForm = ({ initialValues, isLoading }: Props) => {
    /**
        * useInvalidate is used to invalidate the state of a particular resource or dataProvider
        * Means, it will refetch the data from the server and update the state of the resource or dataProvider. We can also specify which part of the state we want to invalidate.
        * We typically use this hook when we want to refetch the data from the server after a mutation is successful.
        *
        * https://refine.dev/docs/data/hooks/use-invalidate/
   */
    const invalidate = useInvalidate()

    const { formProps } = useForm<
        GetFields<UpdateTaskMutation>, 
        HttpError, 
        Pick<GetVariables<UpdateTaskMutationVariables>, 'title'>
    >({
        queryOptions: {
            enabled: false
        },
        redirect: false,
        warnWhenUnsavedChanges: false,
        autoSave: {
            enabled: true
        },
        onMutationSuccess: () => {
            invalidate({ invalidates: ['list'], resource: 'tasks' })
        }, 
        meta: {
            gqlMutation: UPDATE_TASK_MUTATION
        }
    })

    useEffect(() => {
        formProps.form?.setFieldsValue(initialValues)
    }, [initialValues.title])

    if(isLoading) {
        return <Skeleton.Input 
            size="small"
            style={{ width: '95%', height: '22px' }}
            block
        />
    }
    return (
        <Form {...formProps} initialValues={initialValues}>
            <Form.Item noStyle name='title'>
                <TitleInput />
            </Form.Item>
        </Form>
    )
}

export default TitleForm