import { Outlet } from "react-router-dom"


const LayoutWebsite = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Outlet/>
    </div>
  )
}

export default LayoutWebsite