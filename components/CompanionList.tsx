import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
 interface companionsListprops{
  title?:string,
  companions?:Companion[];
  className?:string
 }
const CompanionList = ({title, companions, className}:companionsListprops) => {
  return (
   <article>
    <h2>Recent Sesions</h2>
    <Table className={undefined}>
      <TableCaption className={undefined}> A list of your recent invoices.</TableCaption>
    </Table>
   </article>
  )
}

export default CompanionList