import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export default function ModelView() {
  return (
    <Canvas camera={{ position: [0, 2, 20], fov: 45 }}>
      <fog attach="fog" args={["#7400b8", 0, 550]} />
      <Model />
    </Canvas>
  );
}

function Model() {
  const group = useRef();
  const { nodes, materials } = useGLTF("/town.glb");

  // Mouse movement handler
  const mouse = { x: 0, y: 0 };
  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX / window.innerWidth - 0.5;
    mouse.y = e.clientY / window.innerHeight - 0.5;
  });

  // handel device tilt movement
  window.addEventListener("deviceorientation", (e) => {
    mouse.x = e.beta / 90;
    mouse.y = e.gamma / 90;
  });

  useFrame(() => {
    group.current.rotation.y = (mouse.x * Math.PI) / 10;
  });

  return (
    <group ref={group} scale={0.002} position={[0, -20, -100]} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 20.2]}>
        <group position={[-102253.52, -210688.86, -17050.52]}>
          <mesh geometry={nodes.mesh_0.geometry}>
            <meshBasicMaterial color="#3c096c" />
          </mesh>
          <mesh geometry={nodes.mesh_1.geometry}>
            <meshBasicMaterial color="#260468" />
          </mesh>
          <mesh geometry={nodes.mesh_2.geometry}>
            <meshBasicMaterial color="#3c096c" />
          </mesh>
          <mesh geometry={nodes.mesh_3.geometry}>
            <meshBasicMaterial color="#3c096c" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
