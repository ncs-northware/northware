import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@northware/ui/components/ui-registry/table";
import Link from "next/link";

export default function TailwindStackedTable() {
  return (
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead
            className="py-3.5 pr-3 pl-4 text-left font-semibold text-sm sm:pl-0"
            scope="col"
          >
            Name
          </TableHead>
          <TableHead
            className="hidden px-3 py-3.5 text-left font-semibold text-sm lg:table-cell"
            scope="col"
          >
            Title
          </TableHead>
          <TableHead
            className="hidden px-3 py-3.5 text-left font-semibold text-sm sm:table-cell"
            scope="col"
          >
            Email
          </TableHead>
          <TableHead
            className="px-3 py-3.5 text-left font-semibold text-sm"
            scope="col"
          >
            Role
          </TableHead>
          <TableHead className="relative py-3.5 pr-4 pl-3 sm:pr-0" scope="col">
            <span className="sr-only">Edit</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="w-full max-w-0 py-4 pr-3.5 pl-4 font-medium text-sm sm:w-auto sm:max-w-none sm:pl-0">
            Lindsay Walton
            <dl className="font-normal lg:hidden">
              <dt className="sr-only">Title</dt>
              <dd className="mt-1">Front-end Developer</dd>
              <dt className="sr-only">Email</dt>
              <dd className="mt-1 sm:hidden">lindsay.walton@example.com</dd>
            </dl>
          </TableCell>
          <TableCell className="hidden px-4 py-4 text-sm lg:table-cell">
            Front-end Developer
          </TableCell>
          <TableCell className="hidden text-wrap px-4 py-4 text-sm sm:table-cell">
            lindsay.walton@example.com
          </TableCell>
          <TableCell className="px-4 py-4 text-sm">Member</TableCell>
          <TableCell className="py-4 pr-4 pl-3 text-right font-semibold text-sm sm:pr-0">
            <Link href="#">Edit</Link>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
