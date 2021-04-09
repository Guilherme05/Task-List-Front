import styled from 'styled-components';

export const Box = styled.div`
    width: 100%;    
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;
    min-height: 100%;
`

export const Panel = styled.section`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    min-height: 250px;
    margin: 30px;
    font-family: 'Roboto', sans-serif;
    border-radius: 5px;
    background: #fff;
`

export const PanelHeader = styled.h1`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px 5px 0px 0px;
    padding: 10px;
    font-size: 26px;
    background: #049dcf;
    svg {
        cursor: pointer;
    }
`

export const TaskCard = styled.div`
    width: 98%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1px solid rgba(91, 89, 89, 0.2);
    padding: 10px;
`

export const TaskCardHeader = styled.h1`
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    color: #343333;
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const TchGroupButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #343333;
    svg {
        margin-left: 10px;
        cursor: pointer;
    }
`

export const TaskCardBody = styled.p`
    color: #343333;
    padding: 10px 0px;
    font-family: 'Roboto', sans-serif;
`

export const TaskCardFrm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    flex-grow: 1;
`

export const TaskCardFooter = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;
    align-items: center;
    color: #343333;
    padding-top: 10px;
    span {
        font-weight: 600;
        font-size: 12px;
    }
`

export const Form = styled.form`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: stretch;
    h2 {
        color: #343333;
    }
    input {
        min-height: 45px;
        padding: 5px;
        border: none;
        border-bottom: 1px solid #343333;
        margin-top: 5px;
    }
    button {
        margin-top: 10px;
        padding: 10px;
        background: #049dcf;
        border: none;
        border-radius: 3px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        font-size: 18px;
        &.cancel {
            background-color: #b30404;
        }
    }
`