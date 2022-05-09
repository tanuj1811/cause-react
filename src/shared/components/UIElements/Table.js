import React from 'react'

const Table = props => {
    const header = props.header.map(element => <th>{element}</th> )
    const rows = props.rows.map(obj => {
        return (
            <tr>
                {obj.map(ele => <td>{ele}</td>)}
            </tr>
        )
    })
    return (
        <div>
            <table className="responsive-table">
                <thead>
                    {header}
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}

export default Table
