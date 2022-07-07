import React from "react";

import PaginatedTable from "../components/PaginatedTable";

export default {
    title: 'Example/PaginatedTable',
    component: PaginatedTable
}

const Template = (args) => <PaginatedTable {...args}/>;

export const Primary = Template.bind({});

const dummyProps = {
    rows:[0,1,2],
    data:[
        {
            id: 1,
            display_name: "John Doe",
            occupation: "CEO. Team motivator.",
            is_admin: false,
            subscription: 3,
        },
        {
            id: 2,
            display_name: "Justin Case",
            occupation: "CTO",
            is_admin: true,
            subscription: 2,
        },
        {
            id: 3,
            display_name: "Ben Dover",
            occupation: "Unemployed",
            is_admin: false,
            subscription: 1,
        }
    ]
}

const dummyBtn = () => (
    <button type="button" className="btn btn-primary">Edit</button>
)

const dummyIndicator = (row) => {
    return(
    row.is_admin?
        <div>Admin</div>:
        <div>Not-Admin</div>
    )
}

Primary.args = {
    columns:[
        "id",
        "display_name",
        "occupation",
        dummyIndicator,
        dummyBtn,
    ],
    columnNames:["User Id", "Name", "Occupation", "Is Admin", ""],
    rows:dummyProps.rows,
    data:dummyProps.data
}

