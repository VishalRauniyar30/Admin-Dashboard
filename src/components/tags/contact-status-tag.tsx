import { Tag, TagProps } from "antd"
import { CheckCircleOutlined, MinusCircleOutlined, PlayCircleFilled, PlayCircleOutlined } from "@ant-design/icons"

import { ContactStatus } from "../../graphql/schema.types";

type Props = {
    status: ContactStatus;
}

const ContactStatusTag = ({ status }: Props) => {
    let icon: React.ReactNode = null
    let color: TagProps['color'] = undefined

    switch (status) {
        case "NEW":
        case "CONTACTED":
        case "INTERESTED":
        icon = <PlayCircleOutlined />;
        color = "cyan";
        break;

        case "UNQUALIFIED":
        icon = <PlayCircleOutlined />;
        color = "red";
        break;

        case "QUALIFIED":
        case "NEGOTIATION":
        icon = <PlayCircleFilled />;
        color = "green";
        break;

        case "LOST":
        icon = <PlayCircleFilled />;
        color = "red";
        break;

        case "WON":
        icon = <CheckCircleOutlined />;
        color = "green";
        break;

        case "CHURNED":
        icon = <MinusCircleOutlined />;
        color = "red";
        break;

        default:
        break;
    }
    return (
        <Tag color={color} style={{ textTransform: "capitalize" }}>
            {icon} {status.toLowerCase()}
        </Tag>
    )
}

export default ContactStatusTag