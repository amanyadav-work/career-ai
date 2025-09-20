// components/TurboCard.js
import React from 'react';
import { Handle } from '@xyflow/react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TurboCard({ data }) {
  return (
    <Card className="w-72 gap-0 shadow-lg relative">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold truncate">{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-2">
        <p className="text-sm  mb-2 line-clamp-3">{data.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 pb-1">
        {data.link && (
          <Button
           
          >
            <Link  href={data.link}
            target="_blank"
            rel="noopener noreferrer">
            Learn more →
            </Link>
          </Button>
        )}
      </CardFooter>
      <Handle type="target" position="top" className=" w-2 h-2 absolute left-1/2 -translate-x-1/2 -top-1" />
      <Handle type="source" position="bottom" className="w-2 h-2 absolute left-1/2 -translate-x-1/2 -bottom-1" />
    </Card>
  );
}
