import { Button, Grid, TextField, Typography } from '@material-ui/core'
import React, { ReactElement, useState, useRef, useEffect } from 'react'
import Note from '../components/Note'
import axios  from 'axios'
interface Props {
  
}

export default function index({}: Props): ReactElement {
  const [notes, setStateNotes] = useState([])
  const textInput = useRef("")
  const onAddNote = ()=>{
    const text = textInput.current.value
    if (text!= ""){
      axios.post("http://localhost:8080/api/v1/notes",{
        label:text,
      }).then(res=>{
            console.log(res)
            setStateNotes([...notes,{ label:text, id: res.data.InsertedID,value:false }])
            textInput.current.value = ""
      })
    }
  }
  
  const onUpdateCheck = (id :string,check :boolean,label :string)=>{
    console.log(id)
    axios.put("http://localhost:8080/api/v1/notes/"+id,{
      check:Boolean(check) ,
      label
    }).then(res=>{
    })
  }
  const onDeleteNote = (id: string)=>{
    const newNotes = notes.filter(item=>item.id != id)
    axios.delete("http://localhost:8080/api/v1/notes/"+id).then(res=>{
      setStateNotes(newNotes)
    })
  
  }
  useEffect(()=>{
    axios.get("http://localhost:8080/api/v1/notes").then(res=>{
      if(res.data)
        setStateNotes(res.data)
    })
  },[])
  return (
    <>
      <Grid container direction="column" alignContent="center" justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h4">TODO APP</Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row">
            <Grid item>
              <TextField inputRef={textInput} />
            </Grid>
            <Grid item>
              <Button style={{marginLeft:"10px"}} variant="contained"  onClick={onAddNote} color="primary" >Add</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            {notes.map(item=>{
            return  <>
            <Grid container direction="row" spacing={2}>
            <Grid item><Note id={item.id} onUpdateCheck={onUpdateCheck}  label={item.label} value={item.check}/></Grid>
              <Grid item><Button variant="contained" onClick={()=>onDeleteNote(item.id)}>Delete</Button></Grid>
            </Grid>
            </>
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
