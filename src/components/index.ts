// HOME
import DealsChart from "./home/deals-chart"
import LatestActivities from "./home/latest-activities"
import DashboardTotalCountCard from "./home/total-count-card"
import UpcomingEvents from "./home/upcoming-events"

// SKELETON
import AccordionHeaderSkeleton from "./skeleton/accordion-header"
import KanbanColumnSkeleton from "./skeleton/kanban-column"
import LatestActivitiesSkeleton from "./skeleton/latest-activities"
import ProjectCardSkeleton from "./skeleton/project-card"
import UpcomingEventsSkeleton from "./skeleton/upcoming-events"


// TAGS
import ContactStatusTag from "./tags/contact-status-tag"
import UserTag from "./tags/user-tag"

// TASKS - FORM
import DescriptionForm from "./tasks/form/description"
import DueDateForm from "./tasks/form/due-date"
import { DescriptionHeader, DueDateHeader, UsersHeader } from "./tasks/form/header"
import StageForm from "./tasks/form/stage"
import TitleForm from "./tasks/form/title"
import UsersForm from "./tasks/form/users"
import Accordion from "./accordion"

// TASKS - KANBAN
import { KanbanAddCardButton } from "./tasks/kanban/add-card-button"
import { KanbanBoard, KanbanBoardContainer } from "./tasks/kanban/board"
import ProjectCard from "./tasks/kanban/card"
import { ProjectCardMemo } from "./tasks/kanban/card"
import KanbanColumn from "./tasks/kanban/column"
import KanbanItem from "./tasks/kanban/item"

export {
    DealsChart, LatestActivities,
    DashboardTotalCountCard, UpcomingEvents,

    AccordionHeaderSkeleton, KanbanColumnSkeleton,
    LatestActivitiesSkeleton, ProjectCardSkeleton,
    UpcomingEventsSkeleton,

    ContactStatusTag, UserTag,

    DescriptionForm, DueDateForm, DescriptionHeader, DueDateHeader, UsersHeader,
    StageForm, TitleForm, UsersForm, Accordion,

    KanbanAddCardButton, KanbanBoard, KanbanBoardContainer,
    ProjectCard, ProjectCardMemo, KanbanColumn, KanbanItem
}
