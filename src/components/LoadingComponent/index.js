import React from 'react'
import { Spin } from 'antd'

export const LoadingComponent = ({ title }) => {
  return (
    <Spin spinning={true} tip={title} size="large">
      <div style={{ width: "100vh", height: "100vh" }} />
    </Spin>
  )
}
export default LoadingComponent