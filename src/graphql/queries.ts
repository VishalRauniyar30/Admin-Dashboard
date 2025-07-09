import gql from "graphql-tag";

export const DASHBOARD_TOTAL_COUNTS_QUERY = gql`
    query DashboardTotalCounts {
        companies {
            totalCount
        }
        contacts {
            totalCount
        }
        deals {
            totalCount
        }
    }
`

export const DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY = gql`
    query DashboardCalendarUpcomingEvents(
        $filter: EventFilter!
        $sorting: [EventSort!]
        $paging: OffsetPaging!
    ) {
        events(filter: $filter, sorting: $sorting, paging: $paging) {
            totalCount
            nodes {
                id
                title
                color
                startDate
                endDate
            }
        }
    }
`

export const DASHBOARD_DEALS_CHART_QUERY = gql`
    query DashboardDealsChart(
        $filter: DealStageFilter!,
        $sorting: [DealStageSort!],
        $paging: OffsetPaging
    ) {
        dealStages(filter: $filter, sorting: $sorting, paging: $paging) {
            #Get All deal stages
            nodes {
                id
                title
                # Get the sum of all deals in this stage and group by closeDateMonth and closeDateYear
                dealsAggregate {
                    groupBy {
                        closeDateMonth,
                        closeDateYear
                    }
                    sum {
                        value
                    }
                }
            }
            # Get the total count of all deals in this stage
            totalCount
        }
    }
`

export const DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY = gql`
    query DashboardLatestActivitiesDeals(
        $filter: DealFilter!
        $sorting: [DealSort!]
        $paging: OffsetPaging
    ) {
        deals(filter: $filter, sorting: $sorting, paging: $paging) {
            totalCount
            nodes{
                id
                title
                stage {
                    id
                    title
                }
                company {
                    id
                    name
                    avatarUrl
                }
                createdAt
            }
        }
    }
`
export const DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY = gql`
    query DashboardLatestActivitiesAudits(
        $filter: AuditFilter!
        $sorting: [AuditSort!]
        $paging: OffsetPaging
    ) {
        audits(filter: $filter, sorting: $sorting, paging: $paging) {
            totalCount
            nodes{
                id
                action
                targetEntity
                targetId
                changes {
                    field
                    from
                    to
                }
                createdAt
                user{
                    id
                    name
                    avatarUrl
                }
            }
        }
    }
`

export const COMPANIES_LIST_QUERY = gql`
    query CompaniesList(
        $filter: CompanyFilter!
        $sorting: [CompanySort!]
        $paging: OffsetPaging!
    ){
        companies(filter: $filter, sorting: $sorting, paging: $paging) {
            totalCount
            nodes {
                id
                name
                avatarUrl
                # Get the sum of all deals in this company
                dealsAggregate {
                    sum {
                        value
                    }
                }
            }
        }
    }
`

export const USERS_SELECT_QUERY = gql`
    query UsersSelect(
        $filter: UserFilter!
        $sorting: [UserSort!]
        $paging: OffsetPaging!
    ) {
        # Get all users
        users(filter: $filter, sorting: $sorting, paging: $paging) {
            totalCount # Get the total count of users
            # Get specific fields for each user
            nodes {
                id
                name
                avatarUrl
            }
        }
    }
`

export const COMPANY_CONTACTS_TABLE_QUERY = gql`
    query CompanyContactsTable(
        $filter: ContactFilter!
        $sorting: [ContactSort!]
        $paging: OffsetPaging!
    ) {
        contacts(filter: $filter, sorting: $sorting, paging: $paging) {
            totalCount
            nodes {
                id
                name
                avatarUrl
                jobTitle
                email
                phone
                status
            }
        }
    }
`

// Query to get task stages list
export const TASK_STAGES_QUERY = gql`
    query TaskStages(
        $filter: TaskStageFilter!
        $sorting: [TaskStageSort!]
        $paging: OffsetPaging!
    ) {
        taskStages(filter: $filter, sorting: $sorting, paging: $paging) {
            totalCount # Get the total count of task stages
            nodes {
                id
                title
            }
        }
    }
`

// Query to get tasks list
export const TASKS_QUERY = gql`
    query Tasks(
        $filter: TaskFilter!
        $sorting: [TaskSort!]
        $paging: OffsetPaging!
    ) {
        tasks(filter: $filter, sorting: $sorting, paging: $paging) {
            totalCount # Get the total count of tasks
            nodes {
                id
                title
                description
                dueDate
                completed
                stageId
                # Get user details associated with this task
                users {
                    id
                    name
                    avatarUrl
                }
                createdAt
                updatedAt
            }
        }
    }
`

// Query to get task stages for select
export const TASK_STAGES_SELECT_QUERY = gql`
    query TaskStagesSelect(
        $filter: TaskStageFilter!
        $sorting: [TaskStageSort!]
        $paging: OffsetPaging!
    ) {
        taskStages(filter: $filter, sorting: $sorting, paging: $paging) {
            totalCount
            nodes {
                id
                title
            }
        }
    }
`