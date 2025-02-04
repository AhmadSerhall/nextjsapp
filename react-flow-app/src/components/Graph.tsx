"use client";
import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  ConnectionLineType,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "@/components/Sidebar"; 

const initialNodes = [];
const initialEdges = [];

export default function Graph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeId, setNodeId] = useState(1);

  const onConnect = useCallback(
    (connection) =>
      setEdges((eds) => addEdge({ ...connection, type: ConnectionLineType.SmoothStep }, eds)),
    [setEdges]
  );

  const addNode = (type: "user" | "habit", label: string) => {
    const newNode = {
      id: `${nodeId}`,
      data: { label },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      type: type === "user" ? "default" : "input",
    };

    setNodes((nds) => [...nds, newNode]);
    setNodeId(nodeId + 1); 
  };

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <Sidebar onAddNode={addNode} /> 
      <div style={{ flexGrow: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <Background />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}
