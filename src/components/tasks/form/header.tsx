import { MarkdownField } from "@refinedev/antd"
import { Space, Tag, Typography } from "antd"
import dayjs from "dayjs"

import { Task } from "../../../graphql/schema.types"
import { getDateColor } from "../../../utilities"
import { Text } from "../../text"
import UserTag from "../../tags/user-tag"

type DescriptionProps = {
    description?: Task["description"];
}

type DueDateProps = {
    dueData?: Task["dueDate"];
}

type UserProps = {
    users?: Task["users"];
}

export const DescriptionHeader = ({ description }: DescriptionProps) => {
    if(description){
        return (
            <Typography.Paragraph ellipsis={{ rows: 8 }}>
                <MarkdownField value={description} />
            </Typography.Paragraph>
        )
    }
    return <Typography.Link>Add Task Description</Typography.Link>
}


export const DueDateHeader = ({ dueData }: DueDateProps) => {
    if(dueData){
        const color = getDateColor({
            date: dueData,
            defaultColor: 'processing'
        })

        const getTagText = () => {
            switch (color) {
                case "error":
                return "Overdue"

                case "warning":
                return "Due soon"

                default:
                return "Processing"
            }
        }
        return (
            <Space size={[0, 8]}>
                <Tag color={color}>{getTagText()}</Tag>
                <Text>{dayjs(dueData).format("MMMM D, YYYY - h:ma")}</Text>
            </Space>
        )
    }
    return (
        <Typography.Link>
            Add Due Date
        </Typography.Link>
    )
}

export const UsersHeader = ({ users = [] }: UserProps) => {
    if (users.length > 0) {
        return (
            <Space size={[0, 8]} wrap>
                {users.map((user) => (
                    <UserTag key={user.id} user={user} />
                ))}
            </Space>
        )
    }

    // if the task doesn't have users, display a link to add one
    return <Typography.Link>Assign to users</Typography.Link>
}