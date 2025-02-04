import React, { useState, useEffect } from "react";

type SidebarProps = {
  onAddNode: (type: "user" | "habit", label: string) => void;
  selectedNode: { id: string; label: string } | null;
  onUpdateNode: (id: string, label: string) => void;
};

export default function Sidebar({ onAddNode, selectedNode, onUpdateNode }: SidebarProps) {
  const [nodeType, setNodeType] = useState<"user" | "habit">("user");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.label);
    } else {
      setLabel("");
    }
  }, [selectedNode]);

  const handleAddNode = () => {
    if (label.length < 3 || label.length > 50) {
      alert("Node name must be between 3 and 50 characters.");
      return;
    }
    onAddNode(nodeType, label);
    setLabel(""); 
  };

  const handleUpdateNode = () => {
    if (selectedNode && label.length >= 3 && label.length <= 50) {
      onUpdateNode(selectedNode.id, label);
    }
  };

  return (
    <div style={{ width: "250px", padding: "10px", background: "#f4f4f4", height: "100vh", borderRight: "1px solid #ccc" }}>
      {!selectedNode ? (
        <>
          <h3>Add Node</h3>
          <label>Node Type:</label>
          <select value={nodeType} onChange={(e) => setNodeType(e.target.value as "user" | "habit")}>
            <option value="user">User Node</option>
            <option value="habit">Habit Node</option>
          </select>
          <br />
          <label>Node Label:</label>
          <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Enter node name" />
          <br />
          <button onClick={handleAddNode}>Add Node</button>
        </>
      ) : (
        <>
          <h3>Edit Node</h3>
          <label>New Label:</label>
          <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
          <br />
          <button onClick={handleUpdateNode}>Update Node</button>
        </>
      )}
    </div>
  );
}
