"use client";
import React , {useCallBack ,useState} from "react"; 
import ReactFlow,{addEdge,Background,ConnectionLineType,Controls,MiniMap,useEdgesState,useNodesState} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes =[];
const initialEdges=[];

const [nodes,setNodes,onNodesChange]=useNodesState(initialNodes);
const [edges,setEdges,onEdgesChange]=useEdgesState(initialEdges);

const onConnect = useCallBack(
    (connection)=> setEdges((edges)=>addEdge(ConnectionLineType,edges)),
    [setEdges]
);

