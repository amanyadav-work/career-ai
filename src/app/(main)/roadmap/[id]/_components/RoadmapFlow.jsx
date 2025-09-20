// components/RoadmapFlow.js
'use client';

import React, { useCallback } from 'react';

import '@xyflow/react/dist/style.css';
import TurboCard from './TurboCard';
import { Background, MiniMap, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState } from '@xyflow/react';

const nodeTypes = {
  turbo: TurboCard,
};

export default function RoadmapFlow({ initialNodes, initialEdges }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => [...eds, params]),
    [setEdges]
  );

  return (
    <div className="w-full h-[80vh] border border-gray-200 rounded-md overflow-hidden">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background gap={16} />
          <MiniMap />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
