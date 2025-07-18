import { useState } from "react"
import { useGetIdentity } from "@refinedev/core"
import { SettingOutlined } from "@ant-design/icons"
import { Button, Popover } from "antd"

import { User } from "../../graphql/schema.types"
import CustomAvatar from "../custom-avatar"
import AccountSettings from "./account-settings"
import { Text } from "../text"

const CurrentUser = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { data: user } = useGetIdentity<User>()
    
    const content = (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text
                strong
                style={{ padding: '12px 20px' }}
            >
                {user?.name}
            </Text>
            <div
                style={{
                    border: '1px solid #d9d9d9',
                    padding: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                }}
            >
                <Button
                    style={{ textAlign: 'left' }}
                    icon={<SettingOutlined />}
                    type="text"
                    block
                    onClick={() => setIsOpen(true)}
                >
                    Account Settings
                </Button>
            </div>
        </div>
    )

    return (
        <>
            <Popover
                placement="bottomRight"
                trigger='click'
                styles={{
                    body: { padding: 0 },
                    root: { zIndex: 999 }
                }}
                content={content}
            >
                <CustomAvatar
                    name={user?.name}
                    src={user?.avatarUrl}
                    size='default'
                    style={{ cursor: 'pointer' }}
                />
            </Popover>
            {user && (
                <AccountSettings
                    opened={isOpen}
                    setOpened={setIsOpen}
                    userId={user.id}
                />
            )}
        </>
    )
}

export default CurrentUser