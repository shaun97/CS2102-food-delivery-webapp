import React from 'react'
import { Grid } from 'semantic-ui-react'

import RiderTable from "./RiderTable";

const monthOptions = [
    { key: 'Ja', value: 'Ja', flag: 'Ja', text: 'January' },
    { key: 'Fe', value: 'Fe', flag: 'Fe', text: 'February' },
    { key: 'Mr', value: 'Mr', flag: 'Mr', text: 'March' },
    { key: 'Ap', value: 'Ap', flag: 'Ap', text: 'April' },
    { key: 'Ma', value: 'Ma', flag: 'Ma', text: 'May' },
    { key: 'Jn', value: 'Jn', flag: 'Jn', text: 'June' },
    { key: 'Jl', value: 'Jl', flag: 'Jl', text: 'July' },
    { key: 'Au', value: 'Au', flag: 'Au', text: 'August' },
    { key: 'Se', value: 'Se', flag: 'Se', text: 'September' },
    { key: 'Oc', value: 'Oc', flag: 'Oc', text: 'October' },
    { key: 'No', value: 'No', flag: 'No', text: 'November' },
    { key: 'De', value: 'De', flag: 'De', text: 'December' },
]

function RiderInfo(props) {
        return(
            <Grid columns={2} divided>
                <Grid.Row stretched>
                <RiderTable riderType="FT" monthOptions={monthOptions} />
                <RiderTable riderType="PT" monthOptions={monthOptions} />
                </Grid.Row>
            </Grid>
        )
}

export default RiderInfo;