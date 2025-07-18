import { useList } from '@refinedev/core'
import { Card, List, Space } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

import { DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY, DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY } from '../../graphql/queries'
import { Text } from '../text'
import LatestActivitiesSkeleton from '../skeleton/latest-activities'
import CustomAvatar from '../custom-avatar'

const LatestActivities = () => {
    const { data: auditData, isLoading: isLoadingAudit, isError, error } = useList({
        resource: 'audits',
        meta: {
            gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY
        }
    })

    const dealIds = auditData?.data?.map((audit) => audit?.targetId)

    const { data: deals, isLoading: isLoadingDeals } = useList({
        resource: 'deals',
        queryOptions: { enabled: !!dealIds?.length },
        pagination: {
            mode: 'off'
        },
        filters: [{ field: 'id', operator: 'in', value: dealIds }],
        meta: {
            gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY
        }
    })

    if(isError){
        console.log(error)
        return null
    }

    const isLoading = isLoadingAudit || isLoadingDeals

    return (
        <Card
            styles={{
                header: { padding: '16px' },
                body: { padding: '0 1rem' }
            }}
            title={(
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <UnorderedListOutlined />
                    <Text size='sm' style={{ marginLeft: '0.5rem' }}>
                        Latest Activities
                    </Text>
                </div>
            )}
        >
            {isLoading ? (
                <List 
                    itemLayout='horizontal'
                    dataSource={Array.from({ length: 5 }).map((_, i) => ({ id: i }))}
                    renderItem={(_, index) => (
                        <LatestActivitiesSkeleton key={index} />
                    )}
                />
            ) : (
                <List 
                    itemLayout='horizontal'
                    dataSource={auditData.data || []}
                    renderItem={(item) => {
                        const deal = deals?.data.find((deall) => deall.id === String(item.targetId)) || undefined

                        return (
                            <List.Item>
                                <List.Item.Meta 
                                    title={dayjs(deal?.createdAt).format('MMM DD, YYYY - HH:mm')}
                                    avatar={
                                        <CustomAvatar
                                            shape='square'
                                            size={48}
                                            src={deal?.company?.avatarUrl}
                                            name={deal?.company?.name}
                                        />
                                    }
                                    description={
                                        <Space size={4}>
                                            <Text strong>{item?.user?.name}</Text>
                                            <Text>{item.action === 'CREATE' ? 'created': 'moved'}</Text>
                                            <Text strong>{deal?.title}</Text>
                                            <Text>deal</Text>
                                            <Text>{item.action === 'CREATE' ? 'in' : 'to'}</Text>
                                            <Text strong>{deal?.stage?.title}</Text>
                                        </Space>
                                    }
                                />
                            </List.Item>
                        )
                    }}
                />
            )}
        </Card>
    )
}

export default LatestActivities