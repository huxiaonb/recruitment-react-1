import React from 'react'

import { Table, TableHeader, TableRow, TableHeaderColumn, TableRowColumn, TableBody, TableFooter } from 'material-ui'

// [{}]
const Grid = ({ datas, mappings }) => {
  console.log(datas)
  console.log(mappings)
  return (
    <Table>
      <TableHeader>
      <TableRow>
          <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
            Super Header
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          {
            mappings.map( (mapping, index) =>
            (<TableHeaderColumn tooltip={ mapping.tooltip } key={index} >{ mapping.display }</TableHeaderColumn>)
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        { datas.map( (data, index) =>
          (
          <TableRow key={data.id} selected={false}>
          {
            mappings.map( (mapping, index) =>
            (<TableRowColumn key={index}>{data[mapping.field]}</TableRowColumn>)
          )}
          </TableRow>
        ))}

        </TableBody>
    </Table>
  );
}

export default Grid
