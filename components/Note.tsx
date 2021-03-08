import React, { ReactElement } from 'react'
import {Grid, Checkbox,FormControlLabel} from '@material-ui/core'
interface Props {
    label: string
    value: boolean
    id:string
    onUpdateCheck: (id :string,check :boolean, label: string)=>void
}

export default function Note({label,value,onUpdateCheck, id}: Props): ReactElement {
    return (
        <>
             <FormControlLabel
        control={<Checkbox onChange={(e)=>onUpdateCheck(id,e.target.checked,label )}  defaultChecked={value}  name="checkedA" />}
        label={label}
      />
        </>
    )
}
