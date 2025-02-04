"use client";
import React, { useCallback, useState, useMemo } from "react";
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

// Memoize nodeTypes outside the component
// const nodeTypes = {
//   user: (props: any) => (
//     <div style={{ padding: "10px", border: "2px solid black", borderRadius: "5px", background: "#f8f9fa" }}>
//       {props.data.label}
//     </div>
//   ),
//   habit: (props: any) => (
//     <div style={{ padding: "10px", border: "2px solid blue", borderRadius: "10px", background: "#dff0ff" }}>
//       {props.data.label}
//     </div>
//   ),
// };

export default function Graph() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeId, setNodeId] = useState(1);
  const [selectedNode, setSelectedNode] = useState<{ id: string; label: string } | null>(null);
  const addNode = (type: "user" | "habit", label: string) => {
    const newNodeId = `node-${nodeId}`;
    const newNode = {
      id: newNodeId,
      data: { label },
      position: { x: Math.random() * 400, y: nodes.length * 100 },
      type,
    };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, newNode];
      return updatedNodes;
    });

    if (nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1];
      const newEdge = {
        id: `edge-${lastNode.id}-${newNodeId}`,
        source: lastNode.id,
        target: newNodeId,
        type: ConnectionLineType.SmoothStep,
      };

      setEdges((prevEdges) => [...prevEdges, newEdge]);
    }

    setNodeId((prevId) => prevId + 1);
  };

  const onConnect = useCallback(
    (connection) => {
      if (connection.source && connection.target) {
        setEdges((eds) => addEdge({ ...connection, type: ConnectionLineType.SmoothStep }, eds));
      }
    },
    [setEdges]
  );

  const updateNode = (id: string, label: string) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, label } } : node))
    );
    setSelectedNode(null);
  };

  const onNodeClick = (_event: any, node: any) => {
    setSelectedNode({ id: node.id, label: node.data.label });
  };

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <Sidebar onAddNode={addNode} selectedNode={selectedNode} onUpdateNode={updateNode} />
      <div style={{ flexGrow: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          //nodeTypes={nodeTypes}  
          onNodeClick={onNodeClick}
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
