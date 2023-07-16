'use client'
import Table from "@/components/table/Table";
import { useMemo } from "react";

interface LogsProps {

};

const data = [
    {
        key: '1',
        device: 'Windows Chrome',
        location: 'Kfar Saba, IL 86.54.567.655',
        lastUsage: 'Jun 01, 2023  15:53 PM',
        activity: 'Log out',
    },
    {
        key: '2',
        device: 'Windows Chrome',
        location: 'Kfar Saba, IL 86.54.567.655',
        lastUsage: 'May 13, 2023  10:25 AM',
        activity: 'Log in',
    },
];


export default function Logs({  }: LogsProps) {

    const columns = useMemo(
    () => [
      {
        Header: "Device",
        accessor: "device",
      },
      {
        Header: "Location (IP)",
        accessor: "location",
      },
      {
        Header: "Last Usage",
        accessor: "lastUsage",
      },
      {
        Header: "Activity",
        accessor: "activity",
      },
    ],
    []
  );

  return (
    <div className="flex flex-col justify-center h-full mt-6">
        <Table columns={columns} data={data} />
    </div>
  )
}
