
import Head from "next/head"
import AdminBar from "../AdminBar"



const AdminLayout: React.FC<{title: string}> = ({children, title}) => {
    return (
    <>
        <Head>
          <title>{title}</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AdminBar />
        {children}
    </>
    )
}

export default AdminLayout