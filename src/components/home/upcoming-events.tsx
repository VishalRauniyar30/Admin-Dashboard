import { useList } from '@refinedev/core'
import { CalendarOutlined } from '@ant-design/icons'
import { Badge, Card, List } from 'antd'
import dayjs from 'dayjs'

import { Text } from '../text'
import UpcomingEventsSkeleton from '../skeleton/upcoming-events'
import { DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY } from '../../graphql/queries'
import { getDate } from '../../utilities'

const UpcomingEvents = () => {
    const { data, isLoading: eventsLoading } = useList({
        resource: 'events',
        pagination: { pageSize: 5 },
        sorters: [{
            field: 'startDate',
            order: 'asc'
        }],
        meta: {
            gqlQuery: DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY,
            filter: {
                startDate: {
                    gte: dayjs().format("YYYY-MM-DD"),
                }
            }
        }
    })


    return (
        <Card
            style={{ height: '100%' }}
            styles={{
                header: { padding: '8px 16px' },
                body: { padding: '0 1rem' }
            }}
            title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CalendarOutlined />
                    <Text size='sm' style={{ marginLeft: '0.7rem' }}>
                        Upcoming Events
                    </Text>
                </div>
            }
        >
            {eventsLoading ? (
                <List 
                    itemLayout='horizontal'
                    dataSource={Array.from({ length: 5 }).map((_, index) => ({
                        id: index
                    }))}
                    renderItem={() => <UpcomingEventsSkeleton />}
                />
            ) : (
                <List 
                    itemLayout='horizontal'
                    dataSource={data?.data || []}
                    renderItem={(item) => {
                        const renderDate = getDate(item.startDate, item.endDate)
                        return (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Badge color={item.color} />}
                                    title={<Text size='xs'>{renderDate}</Text>}
                                    description={
                                        <Text ellipsis={{ tooltip: true }} strong>
                                            {item.title}
                                        </Text>
                                    }
                                />
                            </List.Item>
                        ) 
                    }}
                />
            )}
            {!eventsLoading && data?.data.length === 0 && (
                <span
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '220px'
                    }}
                >
                    No Upcoming Events
                </span>
            )}        
        </Card>
    )
}

export default UpcomingEvents