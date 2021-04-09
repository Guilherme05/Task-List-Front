import React, { useState, useEffect } from 'react'
import { 
            Box, 
            Panel, 
            PanelHeader, 
            TaskCard, 
            TaskCardFrm, 
            TaskCardBody, 
            TaskCardFooter, 
            TaskCardHeader, 
            TchGroupButton,
            Form 
        } from './styled'
import { AddCircle, Edit, Delete, CheckCircle, Replay } from '@material-ui/icons'
import Api from '../../services/api'

const Main = () => {

    const [listTask, setListTask] = useState([]);
    const [listTaskConcluded, setListTaskConcluded] = useState([])
    const [frmShow, setFrmShow] = useState(false)
    const [id, setId] = useState()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const fetchListTask = async () => {
        await Api.get('/task')
            .then(response => { 
                let listTaskTmp = listTask
                listTaskTmp = response.data
                setListTask(listTaskTmp)
            })
            .catch(err => console.log('Error list task loading. ' + err))
    }

    const fetchListTaskConcluded = async () => {
        await Api.get('/task/list/concluded')
            .then(response => { 
                let listTaskTmp = listTaskConcluded
                listTaskTmp = response.data
                setListTaskConcluded(listTaskTmp)
            })
            .catch(err => console.log('Error list task concluded loading. ' + err))
    }

    const fetchTask = async id => {
        await Api.get(`/task/${id}`)
            .then(response => { 
                setId(response.data.id)
                setTitle(response.data.title)
                setDescription(response.data.description)
                setFrmShow(true)
            })
            .catch(err => console.log('Error list task concluded loading. ' + err))
    }

    const concludedTask = async id => {
        const res = await Api.put(`/task/concluded/${id}`)
        if(res.status === 200) {
            fetchListTask()
            fetchListTaskConcluded()
        } else {
            console.log(res)
        }
    }

    const concludedReverseTask = async id => {
        const res = await Api.put(`/task/reverse/${id}`)
        if(res.status === 200) {
            fetchListTask()
            fetchListTaskConcluded()
        } else {
            console.log(res)
        }
    }

    const deleteTask = async id => {
        const res = await Api.delete(`/task/${id}`)
        if(res.status === 200) {
            fetchListTask()
            fetchListTaskConcluded()
        } else {
            console.log(res)
        }
    }

    const frmSubmit = async e => {
        e.preventDefault()

        const status = false
        const created_at = newDate()
        const updated_at = newDate()
        const remove_at = null
        const concluded = null
        const position = (listTask.length+listTaskConcluded.length)+1

        let res

        if(!id) {
            res = await Api.post(`/task`, {title, description, status, created_at, updated_at, remove_at, concluded, position})
        } else {
            res = await Api.put(`/task/${id}`, {title, description})
        }

        if(res.status >= 200 && res.status < 300) {
            cancelFrm()
            fetchListTask()
            fetchListTaskConcluded()
            setId()
        } else {
            console.log(res)
        }

    }

    const cancelFrm = () => {
        setTitle('')
        setDescription('')
        setFrmShow(false)
    }

    const newDate = () => {
        const dateNew = new Date()
        let month = ((dateNew.getMonth() + 1))
        let day = (dateNew.getDate())
        
        if(month < 10){
            month = '0'+month
        }

        if(day < 10){
            day = '0'+day
        }
        return (dateNew.getFullYear() + "-" + month + "-" + day + " " + (dateNew.getHours()) + ":" +(dateNew.getMinutes())+ ":" + (dateNew.getSeconds()))
    }


    useEffect(() => {
        fetchListTask()
        fetchListTaskConcluded()
    }, false)

    return (
        <Box>
            <Panel>
                <PanelHeader>
                    To Do
                    {!frmShow ?
                        <AddCircle onClick={e => setFrmShow(true)}/>
                    : null }
                </PanelHeader>
                {frmShow ? 
                <TaskCard>
                    <TaskCardFrm>
                        <Form onSubmit={event => frmSubmit(event)} method="POST">
                            <h2>Tarefa</h2>
                            <input name="title" onChange={e => setTitle(e.target.value)} value={title} type="text" placeholder="Titulo"/>
                            <input name="description" onChange={e => setDescription(e.target.value)} value={description} type="text" placeholder="Descrição da tarefa"/>
                            <button type="submit">Salvar</button>
                            <button class="cancel" onClick={e => cancelFrm()}>Cancelar</button>
                        </Form>
                    </TaskCardFrm>       
                </TaskCard>
                : null}
                { listTask.length ? listTask.map( task => 
                <TaskCard key={task.id}>
                    <TaskCardHeader>
                        {task.title}
                        <TchGroupButton>
                            <CheckCircle onClick={e => concludedTask(task.id)}/>
                            <Edit onClick={e => fetchTask(task.id)}/>
                            <Delete onClick={e => deleteTask(task.id)}/>
                        </TchGroupButton>
                    </TaskCardHeader>
                    <TaskCardBody>
                        {task.description}
                    </TaskCardBody>
                    <TaskCardFooter>
                        <span>Atualizado: {task.updated_at}</span>
                        <span>Status: {task.status ? 'Concluido' : 'A Fazer'}</span>
                    </TaskCardFooter>
                </TaskCard>
                ): null
                }
            </Panel>

            <Panel>
                <PanelHeader>
                    Tarefas Concluidas
                </PanelHeader>
                { listTaskConcluded.length ? listTaskConcluded.map( task => 
                <TaskCard key={task.id}>
                    <TaskCardHeader>
                        {task.title} 
                        <TchGroupButton>
                            <Replay onClick={e => concludedReverseTask(task.id)}/>
                            <Delete onClick={e => deleteTask(task.id)}/>
                        </TchGroupButton>
                    </TaskCardHeader>
                    <TaskCardBody>
                        {task.description}
                    </TaskCardBody>
                    <TaskCardFooter>
                        <span>Atualizado: {task.updated_at}</span>
                        <span>Status: {task.status ? 'Concluido' : 'A Fazer'}</span>
                    </TaskCardFooter>
                </TaskCard>
                ): null
                }
            </Panel>
        </Box>
    )
}

export default Main