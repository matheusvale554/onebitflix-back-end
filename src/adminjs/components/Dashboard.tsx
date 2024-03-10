import React ,{useEffect,useState} from 'react'
import { H1,H2,Table,TableHead,TableBody,TableRow,TableCell } from '@adminjs/design-system'
import { ApiClient,useCurrentAdmin } from 'adminjs'

export default function Dashboard() {
const [resources,setResouces] = useState<{[key:string]:number}>()
const [currentAdmin]= useCurrentAdmin()
const api = new ApiClient()

useEffect(()=>{
fecthDashboardData()
},[])

async function fecthDashboardData(){
    const res = await api.getDashboard()
   setResouces (res.data)
}
  return (
    <section style={{ padding: '1.5rem' }}>
      <H1>Seja bem-vindo(a),{currentAdmin?.firstName} </H1>
      <section style={{ backgroundColor: '#FFF', padding: '1.5rem' }}>
        <H2>Resumo</H2>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#FF0043' }}>
              <TableCell style={{ color: "#FFF" }}>Recurso</TableCell>
              <TableCell style={{ color: "#FFF" }}>Registros</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              resources ?
                Object.entries(resources).map(([resource, count]) => (
                  <TableRow key={resource}>
                    <TableCell>{resource}</TableCell>
                    <TableCell>{count}</TableCell>
                  </TableRow>
                ))
                :
                <></>
            }
          </TableBody>
        </Table>
      </section>

    </section>
  )
}