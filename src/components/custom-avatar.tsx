import { Avatar as AntdAvatar, AvatarProps } from 'antd'

import { getNameIntitials } from '../utilities'

type Props = AvatarProps & {
    name?: string;
}

const CustomAvatar = ({ name, style, ...rest }: Props) => {
    return (
        <AntdAvatar
            alt={name}
            size='small'
            style={{
                backgroundColor: '#87d068',
                display: 'flex',
                alignItems: 'center',
                border: 'none',
                ...style,
            }}
            { ...rest }
        >
            {getNameIntitials(name || '')}
        </AntdAvatar>
    )
}

export default CustomAvatar