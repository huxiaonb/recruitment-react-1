import React from 'react'
import {connect} from 'react-redux'
import Grid from 'components/common/Grid'

const mapStateToProps = (state) => {
  return {
    datas: state.position
  }
}


const mappings = [{
  field : 'id',
  display : 'ID',
  tooltip : 'ID'
},{
  field : 'name',
  display : 'Name',
  tooltip : 'Name'
},{
  field : 'age',
  display : 'Age',
  tooltip : 'Age'
}]
let Position = ({ datas }) => {
  return (
    <Grid mappings={mappings} datas={datas} />
  );
}

export default connect(mapStateToProps, {})(Position)
