import { Button } from "antd"
import { PlusSquareOutlined } from "@ant-design/icons"

import { Text } from "../../text"

interface Props {
    onClick: () => void;
}
/** Render a button that allows you to add a new card to a column.
 *
 * @param onClick - a function that is called when the button is clicked.
 * @returns a button that allows you to add a new card to a column.
 */
export const KanbanAddCardButton = ({ children, onClick }: React.PropsWithChildren<Props>) => {
    return (
        <Button
            size="large"
            icon={<PlusSquareOutlined className="md" />}
            style={{ margin: '16px', backgroundColor: 'white' }}
            onClick={onClick}
        >
            {children ?? (
                <Text size="md" type="secondary">
                    Add New Card
                </Text>
            )}
        </Button>
    )
}
