// based on https://www.youtube.com/watch?v=4Siz4HHJYDQ
//   https://reactflow.dev/docs/examples/overview/
// TODO: reference the spacing used in this tree: https://mui-treasury.com/components/chart/

import React, { useEffect, useState, useCallback } from 'react';
//import ReactFlow, { addEdge, MiniMap, Background, Controls } from 'react-flow-renderer';

import {
  ReactFlow,
  MiniMap,
  Controls,
  Node as INode,
  Edge as IEdge,
  ConnectionLineType,
  applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const NodeLabel: React.FC = () => {
  return (
    <div
      style={{
        width: '800px',
        height: '1000px',
        textAlign: 'initial',
        overflowY: 'scroll',
      }}
      className="nowheel"
    >
      hello world
    </div>
  );
};

/*
const initialElements = [
  {
    id: '1',
    data: { label: <NodeLabel curPath="test" fullPath="/p/test" /> },
    position: { x: 0, y: 0 },
  },
  { id: '2', data: { label: 'Node' }, position: { x: 0, y: 0 + 75 } },
  { id: 'e1-2', source: '1', target: '2' }, // an edge
];
*/

interface MindMapProps {
  filterPrefix?: string; // e.g. 'tech/AI' (when desired to only display a subtree)
}

/**
 * mindmap display of a file tree
 */
const MindMap: React.FC<MindMapProps> = ({}) => {
  const [nodes, setNodes] = useState<INode[]>([]);
  const [edges, setEdges] = useState<IEdge[]>([]);

  // https://reactflow.dev/docs/getting-started/adding-interactivity/
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        style={{ width: '100%', height: '90vh' }}
        connectionLineType={ConnectionLineType.Bezier}
        connectionLineStyle={{ stroke: '#ddd', strokeWidth: 2 }}
        onNodesChange={onNodesChange}
        snapToGrid={true}
      >
        {/*
        <Background
          color="#fffff"
          gap={16}
        />
        */}
        <Controls />
      </ReactFlow>
    </>
  );
};

export default MindMap;
