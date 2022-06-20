import { NextPage } from "next"
import TableService  from "../src/component/TableService"
import AdminLayout from "../src/component/admin/AdminLayout"
import TableTradeIn from "../src/component/TableTradeIn"
import { Admin, getSession, RedirectError, useSession } from "../src/services/apiClient"
import { useRouter } from "next/router"
import { CircularProgress } from "@mui/material"

const  AdminTable: NextPage = () => {
  const router = useRouter()
  const { isLoading, error, data, isSuccess } = useSession()
    if (isLoading) return <CircularProgress />
    return (
      <>
       {data && <div> Добрый день, {data.login}</div>}
      {isSuccess &&
        <AdminLayout title="APKOHT STATISTIC">
          <TableService />
          {/* <TableTradeIn /> */}
        </AdminLayout>
      }
      {isLoading && <p>Loading..</p>}
      {error && <p>Error occurred!</p>}
      </>
    )
  }
  
  export default AdminTable
  